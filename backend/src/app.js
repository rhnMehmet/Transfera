require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const transferRoutes = require("./routes/transferRoutes");
const aiRoutes = require("./routes/aiRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { isDatabaseAvailable } = require("./utils/database");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/transfera";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const MONGODB_SERVER_SELECTION_TIMEOUT_MS = Number(
  process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 5000
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !ALLOWED_ORIGINS.length || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin denied"));
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "TRANSFERA API",
    status: isDatabaseAvailable() ? "ok" : "degraded",
    version: "1.0.0",
    database: isDatabaseAvailable() ? "connected" : "disconnected",
  });
});

app.use("/users", userRoutes);
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/transfers", transferRoutes);
app.use("/ai", aiRoutes);
app.use("/admin", adminRoutes);
app.use("/api/players", commentRoutes);
app.use("/api/teams", commentRoutes);
app.use("/api/comments", commentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint bulunamadı." });
});

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: MONGODB_SERVER_SELECTION_TIMEOUT_MS,
    });
    console.log("MongoDB bağlandı.");
  } catch (error) {
    console.error(
      "MongoDB bağlantısı kurulamadı, sunucu sınırlı modda çalışıyor:",
      error.message
    );
  }
}

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
  });

  await connectToDatabase();
}

mongoose.connection.on("connected", () => {
  console.log("MongoDB bağlantısı aktif.");
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB bağlantısı kesildi. API sınırlı modda devam ediyor.");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB hatası:", error.message);
});

startServer();
