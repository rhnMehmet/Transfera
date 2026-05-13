const { createClient } = require("redis");

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
const REDIS_SESSION_TTL_SECONDS = Number(
  process.env.REDIS_SESSION_TTL_SECONDS || 60 * 60 * 24
);

let client = null;
let connectPromise = null;

function buildClient() {
  const redisClient = createClient({
    url: REDIS_URL,
    socket: {
      reconnectStrategy(retries) {
        return retries > 5 ? false : Math.min(retries * 250, 2000);
      },
    },
  });

  redisClient.on("error", (error) => {
    console.error("Redis hatasi:", error.message);
  });

  redisClient.on("ready", () => {
    console.log("Redis baglantisi aktif.");
  });

  redisClient.on("end", () => {
    console.warn("Redis baglantisi kapandi.");
  });

  return redisClient;
}

function getRedisClient() {
  if (!client) {
    client = buildClient();
  }

  return client;
}

function isRedisAvailable() {
  return Boolean(client?.isReady);
}

async function ensureRedisConnection() {
  const redisClient = getRedisClient();

  if (redisClient.isReady) {
    return redisClient;
  }

  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = redisClient
    .connect()
    .then(() => redisClient)
    .catch((error) => {
      connectPromise = null;
      console.error("Redis baglantisi kurulamadi:", error.message);
      return null;
    });

  return connectPromise;
}

async function getJson(key) {
  try {
    const redisClient = await ensureRedisConnection();
    if (!redisClient?.isReady) {
      return null;
    }

    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Redis JSON okunamadi (${key}):`, error.message);
    return null;
  }
}

async function setJson(key, value, ttlSeconds) {
  try {
    const redisClient = await ensureRedisConnection();
    if (!redisClient?.isReady) {
      return false;
    }

    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await redisClient.set(key, serialized, { EX: ttlSeconds });
    } else {
      await redisClient.set(key, serialized);
    }

    return true;
  } catch (error) {
    console.error(`Redis JSON yazilamadi (${key}):`, error.message);
    return false;
  }
}

async function setValue(key, value, ttlSeconds) {
  try {
    const redisClient = await ensureRedisConnection();
    if (!redisClient?.isReady) {
      return false;
    }

    if (ttlSeconds) {
      await redisClient.set(key, value, { EX: ttlSeconds });
    } else {
      await redisClient.set(key, value);
    }

    return true;
  } catch (error) {
    console.error(`Redis degeri yazilamadi (${key}):`, error.message);
    return false;
  }
}

async function getValue(key) {
  try {
    const redisClient = await ensureRedisConnection();
    if (!redisClient?.isReady) {
      return null;
    }

    return await redisClient.get(key);
  } catch (error) {
    console.error(`Redis degeri okunamadi (${key}):`, error.message);
    return null;
  }
}

async function deleteKeys(keys) {
  try {
    const redisClient = await ensureRedisConnection();
    if (!redisClient?.isReady || !Array.isArray(keys) || !keys.length) {
      return 0;
    }

    return await redisClient.del(keys);
  } catch (error) {
    console.error("Redis key silme hatasi:", error.message);
    return 0;
  }
}

function getSessionKey(userId, sessionId) {
  return `session:user:${userId}:${sessionId}`;
}

function getBlacklistKey(tokenId) {
  return `blacklist:token:${tokenId}`;
}

function getDefaultSessionTtlSeconds() {
  return REDIS_SESSION_TTL_SECONDS;
}

module.exports = {
  ensureRedisConnection,
  isRedisAvailable,
  getRedisClient,
  getJson,
  setJson,
  getValue,
  setValue,
  deleteKeys,
  getSessionKey,
  getBlacklistKey,
  getDefaultSessionTtlSeconds,
};
