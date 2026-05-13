const EventLog = require("../models/EventLog");
const { isDatabaseAvailable } = require("../utils/database");

async function processDomainEvent(message, metadata = {}) {
  const status = isDatabaseAvailable() ? "processed" : "skipped";

  if (status === "skipped") {
    console.warn(
      `RabbitMQ eventi alindi ancak MongoDB hazir degil: ${metadata.routingKey || "unknown"}`
    );
    return { status };
  }

  await EventLog.create({
    eventType: metadata.eventType || metadata.routingKey || "unknown",
    routingKey: metadata.routingKey || "unknown",
    source: metadata.source || "backend",
    payload: message,
    status,
    processedAt: new Date(),
  });

  return { status };
}

module.exports = {
  processDomainEvent,
};
