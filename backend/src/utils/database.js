const mongoose = require("mongoose");

function isDatabaseAvailable() {
  return mongoose.connection.readyState === 1;
}

function createDatabaseUnavailableError(
  message = "Veritabanı şu anda  kullanılamıyor."
) {
  const error = new Error(message);
  error.statusCode = 503;
  return error;
}

function buildDatabaseUnavailablePayload(message) {
  return {
    message: message || "Veritabanı bağlantısı şu anda kullanılamıyor.",
    code: "DATABASE_UNAVAILABLE",
  };
}

module.exports = {
  isDatabaseAvailable,
  createDatabaseUnavailableError,
  buildDatabaseUnavailablePayload,
};
