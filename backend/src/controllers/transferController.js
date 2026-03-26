const footballService = require("../services/footballService");

// GET /api/transfers
exports.listTransfers = async (req, res) => {
  try {
    const { player, team } = req.query;

    const data = await footballService.getTransfers({
      player,
      team,
    });

    res.status(200).json({
      success: true,
      message: "Transferler başarıyla getirildi",
      results: data.results,
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transferler alınamadı",
      error: error.message,
    });
  }
};