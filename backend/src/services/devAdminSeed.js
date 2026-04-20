const bcrypt = require("bcryptjs");

const User = require("../models/User");

async function ensureDevAdmin() {
  const shouldSeed =
    process.env.ENABLE_DEV_ADMIN_SEED === "true" ||
    (process.env.NODE_ENV || "development") !== "production";

  if (!shouldSeed) {
    return;
  }

  const email = String(
    process.env.DEV_ADMIN_EMAIL || "admin@test.com"
  ).trim().toLowerCase();
  const password = String(process.env.DEV_ADMIN_PASSWORD || "123456");
  const name = String(process.env.DEV_ADMIN_NAME || "Transfera").trim();
  const surname = String(process.env.DEV_ADMIN_SURNAME || "Admin").trim();

  if (!email || !password) {
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(
    `Varsayilan gelistirme admin hesabi olusturuldu: ${email}`
  );
}

module.exports = {
  ensureDevAdmin,
};
