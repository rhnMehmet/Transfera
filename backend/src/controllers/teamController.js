const footballService = require("../services/footballService");

// GET /api/teams
exports.listTeams = async (req, res) => {
  try {
    const { league, season, country, search } = req.query;

    const data = await footballService.getTeams({
      league,
      season,
      country,
      search,
    });

    res.status(200).json({
      success: true,
      message: "Takımlar başarıyla getirildi",
      results: data.results,
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Takımlar alınamadı",
      error: error.message,
    });
  }
};

// GET /api/teams/:teamId
exports.getTeamDetail = async (req, res) => {
  try {
    const { teamId } = req.params;

    const data = await footballService.getTeams({
      id: teamId,
    });

    res.status(200).json({
      success: true,
      message: "Takım detayı getirildi",
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Takım detayı alınamadı",
      error: error.message,
    });
  }
};

// GET /api/teams/:teamId/squad
exports.getTeamSquad = async (req, res) => {
  try {
    const { teamId } = req.params;

    const data = await footballService.getTeamSquad({
      team: teamId,
    });

    res.status(200).json({
      success: true,
      message: "Takım kadrosu getirildi",
      data: data.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Takım kadrosu alınamadı",
      error: error.message,
    });
  }
};