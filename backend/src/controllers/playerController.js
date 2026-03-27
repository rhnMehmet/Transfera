const footballService = require("../services/footballService");

// GET /api/players
exports.listPlayers = async (req, res) => {
  try {
    // req ve res sadece bu fonksiyonun İÇİNDE tanımlıdır
    const { team, league, season, search, page } = req.query;

    const data = await footballService.getPlayers({
      team,
      league,
      season,
      search,
      page,
    });

    // Sportmonks'tan gelen veriyi kontrol ediyoruz
    // Eğer veri 'data' veya 'veri' anahtarıyla geliyorsa onu döndür
    const finalData = data.data || data.veri || data;

    res.status(200).json({
      success: true,
      message: "Oyuncular başariyla getirildi",
      data: finalData,
    });
  } catch (error) {
    console.error("Controller Hatasi:", error.message);
    res.status(500).json({
      success: false,
      message: "Oyuncular alinamadi",
      error: error.message,
    });
  }
};

// GET /api/players/:playerId
exports.getPlayerDetail = async (req, res) => {
  try {
    const { playerId } = req.params;
    const data = await footballService.getPlayers({ id: playerId });

    res.status(200).json({
      success: true,
      data: data.data || data.veri || data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/players/:playerId/transfers
exports.getPlayerTransfers = async (req, res) => {
  try {
    const { playerId } = req.params;
    const data = await footballService.getPlayerTransfers(playerId);

    res.status(200).json({
      success: true,
      data: data.data || data.veri || data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};