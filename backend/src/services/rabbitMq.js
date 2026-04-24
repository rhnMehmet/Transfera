const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
const DOMAIN_EVENTS_EXCHANGE =
  process.env.RABBITMQ_DOMAIN_EVENTS_EXCHANGE || "transfera.domain.events";
const DOMAIN_EVENTS_QUEUE =
  process.env.RABBITMQ_DOMAIN_EVENTS_QUEUE || "transfera.domain.event-log";
const DOMAIN_EVENTS_PATTERNS = [
  "user.registered",
  "favorite.player.added",
  "favorite.team.added",
  "favorite.team.removed",
];

let connection = null;
let publisherChannel = null;
let consumerChannel = null;
let connectionPromise = null;
let consumersStarted = false;

function isRabbitAvailable() {
  return Boolean(connection && publisherChannel && consumerChannel);
}

function resetConnectionState() {
  connection = null;
  publisherChannel = null;
  consumerChannel = null;
  connectionPromise = null;
  consumersStarted = false;
}

async function setupTopology(channel) {
  await channel.assertExchange(DOMAIN_EVENTS_EXCHANGE, "topic", { durable: true });
  await channel.assertQueue(DOMAIN_EVENTS_QUEUE, { durable: true });

  for (const pattern of DOMAIN_EVENTS_PATTERNS) {
    await channel.bindQueue(DOMAIN_EVENTS_QUEUE, DOMAIN_EVENTS_EXCHANGE, pattern);
  }
}

async function ensureRabbitConnection() {
  if (isRabbitAvailable()) {
    return {
      connection,
      publisherChannel,
      consumerChannel,
    };
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = amqp
    .connect(RABBITMQ_URL)
    .then(async (nextConnection) => {
      connection = nextConnection;
      connection.on("error", (error) => {
        console.error("RabbitMQ baglanti hatasi:", error.message);
      });
      connection.on("close", () => {
        console.warn("RabbitMQ baglantisi kapandi.");
        resetConnectionState();
      });

      publisherChannel = await connection.createChannel();
      consumerChannel = await connection.createChannel();
      await consumerChannel.prefetch(10);
      await setupTopology(publisherChannel);
      await setupTopology(consumerChannel);

      console.log("RabbitMQ baglantisi aktif.");

      return {
        connection,
        publisherChannel,
        consumerChannel,
      };
    })
    .catch((error) => {
      console.error("RabbitMQ baglantisi kurulamadi:", error.message);
      resetConnectionState();
      return null;
    });

  return connectionPromise;
}

async function publishDomainEvent(routingKey, payload, options = {}) {
  try {
    const rabbit = await ensureRabbitConnection();
    if (!rabbit?.publisherChannel) {
      return false;
    }

    const eventPayload = {
      ...payload,
      eventType: routingKey,
      source: options.source || "backend",
      occurredAt: payload?.occurredAt || new Date().toISOString(),
    };

    const buffer = Buffer.from(JSON.stringify(eventPayload));

    return rabbit.publisherChannel.publish(
      DOMAIN_EVENTS_EXCHANGE,
      routingKey,
      buffer,
      {
        contentType: "application/json",
        persistent: true,
        messageId: options.messageId,
        timestamp: Date.now(),
        type: routingKey,
      }
    );
  } catch (error) {
    console.error(`RabbitMQ event yayinlanamadi (${routingKey}):`, error.message);
    return false;
  }
}

async function startDomainEventConsumers(handler) {
  if (consumersStarted) {
    return true;
  }

  const rabbit = await ensureRabbitConnection();
  if (!rabbit?.consumerChannel) {
    return false;
  }

  await rabbit.consumerChannel.consume(DOMAIN_EVENTS_QUEUE, async (message) => {
    if (!message) {
      return;
    }

    try {
      const parsedMessage = JSON.parse(message.content.toString("utf8"));

      await handler(parsedMessage, {
        routingKey: message.fields.routingKey,
        eventType: message.properties.type || parsedMessage.eventType,
        source: parsedMessage.source || "backend",
      });

      rabbit.consumerChannel.ack(message);
    } catch (error) {
      console.error("RabbitMQ event islenemedi:", error.message);
      rabbit.consumerChannel.nack(message, false, false);
    }
  });

  consumersStarted = true;
  return true;
}

module.exports = {
  DOMAIN_EVENTS_EXCHANGE,
  DOMAIN_EVENTS_QUEUE,
  ensureRabbitConnection,
  isRabbitAvailable,
  publishDomainEvent,
  startDomainEventConsumers,
};
