require("dotenv").config();

const fs = require("fs");
const path = require("path");
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
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const hasFrontendBuild = fs.existsSync(frontendDistPath);

let databaseConnectionPromise = null;

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

function buildHealthPayload() {
  return {
    name: "TRANSFERA API",
    status: isDatabaseAvailable() ? "ok" : "degraded",
    version: "1.0.0",
    database: isDatabaseAvailable() ? "connected" : "disconnected",
  };
}

app.get("/api/health", (req, res) => {
  res.json(buildHealthPayload());
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

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));

  app.get(/^\/(?!users|players|teams|transfers|ai|admin|api)(.*)$/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.get("/", (req, res) => {
  if (hasFrontendBuild) {
    return res.sendFile(path.join(frontendDistPath, "index.html"));
  }

  return res.json(buildHealthPayload());
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint bulunamadi." });
});

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (databaseConnectionPromise) {
    return databaseConnectionPromise;
  }

  try {
    databaseConnectionPromise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: MONGODB_SERVER_SELECTION_TIMEOUT_MS,
    });

    await databaseConnectionPromise;
    console.log("MongoDB baglandi.");
  } catch (error) {
    databaseConnectionPromise = null;
    console.error(
      "MongoDB baglantisi kurulamadi, sunucu sinirli modda calisiyor:",
      error.message
    );
  }
}

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server calisiyor: http://localhost:${PORT}`);
  });

  await connectToDatabase();
}

mongoose.connection.on("connected", () => {
  console.log("MongoDB baglantisi aktif.");
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB baglantisi kesildi. API sinirli modda devam ediyor.");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB hatasi:", error.message);
});

connectToDatabase();

if (require.main === module) {
  startServer();
}

module.exports = app;
