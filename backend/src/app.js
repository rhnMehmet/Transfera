require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 1. Rotaları İçeri Al (Import)
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes"); // Gerçek teamRoutes'u bağladık

const transferRoutes = require("./routes/transferRoutes");
// ...

const app = express();

// 2. Middleware Sıralaması (Çok Önemli!)
app.use(cors()); 
app.use(express.json()); 

// 3. Rota Kullanımları (app.use)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);     
app.use("/api/transfers", transferRoutes); 

// 4. Veritabanı ve Sunucu Başlatma
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB bağlandı");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err.message);
  });