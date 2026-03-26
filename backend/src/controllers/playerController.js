const footballService = require("../services/footballService");

// GET /api/players
exports.listPlayers = async (req, res) => {
  try {
    const { team, league, season, search, page } = req.query;

    const data = await footballService.getPlayers({
      team,
      league,
      season,
      search,
      page,
    });

    console.log("PLAYERS RESPONSE:", JSON.stringify(data, null, 2));

    res.status(200).json({
      success: true,
      message: "Oyuncular başarıyla getirildi",
      results: data.results,
      paging: data.paging,
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oyuncular alınamadı",
      error: error.message,
    });
  }
};

// GET /api/players/:playerId
exports.getPlayerDetail = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { season } = req.query;

    const data = await footballService.getPlayers({
      id: playerId,
      season,
    });

    res.status(200).json({
      success: true,
      message: "Oyuncu detayı getirildi",
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oyuncu detayı alınamadı",
      error: error.message,
    });
  }
};

// GET /api/players/:playerId/transfers
exports.getPlayerTransfers = async (req, res) => {
  try {
    const { playerId } = req.params;

    const data = await footballService.getPlayerTransfers({
      player: playerId,
    });

    res.status(200).json({
      success: true,
      message: "Oyuncu transfer geçmişi getirildi",
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oyuncu transfer geçmişi alınamadı",
      error: error.response?.data || error.message,
    });
  }
};