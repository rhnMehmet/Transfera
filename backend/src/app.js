require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB bağlandı");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server çalışıyor: http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err.message);
  });