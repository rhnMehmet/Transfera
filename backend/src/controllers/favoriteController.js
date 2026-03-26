const User = require("../models/User");

// POST /api/users/:id/favorites/teams
exports.addFavoriteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamId } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: "teamId zorunlu",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    if (user.favoriteTeams.includes(teamId)) {
      return res.status(400).json({
        success: false,
        message: "Takım zaten favorilerde",
      });
    }

    user.favoriteTeams.push(teamId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Favori takım eklendi",
      favoriteTeams: user.favoriteTeams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Favori takım eklenemedi",
      error: error.message,
    });
  }
};

// DELETE /api/users/:id/favorites/teams/:teamId
exports.removeFavoriteTeam = async (req, res) => {
  try {
    const { id, teamId } = req.params;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    user.favoriteTeams = user.favoriteTeams.filter(
      (favTeamId) => favTeamId !== Number(teamId)
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Favori takım silindi",
      favoriteTeams: user.favoriteTeams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Favori takım silinemedi",
      error: error.message,
    });
  }
};

// POST /api/users/:id/favorites/players
exports.addFavoritePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    if (!playerId) {
      return res.status(400).json({
        success: false,
        message: "playerId zorunlu",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    if (user.favoritePlayers.includes(playerId)) {
      return res.status(400).json({
        success: false,
        message: "Oyuncu zaten favorilerde",
      });
    }

    user.favoritePlayers.push(playerId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Favori oyuncu eklendi",
      favoritePlayers: user.favoritePlayers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Favori oyuncu eklenemedi",
      error: error.message,
    });
  }
};

// DELETE /api/users/:id/favorites/players/:playerId
exports.removeFavoritePlayer = async (req, res) => {
  try {
    const { id, playerId } = req.params;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    user.favoritePlayers = user.favoritePlayers.filter(
      (favPlayerId) => favPlayerId !== Number(playerId)
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Favori oyuncu silindi",
      favoritePlayers: user.favoritePlayers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Favori oyuncu silinemedi",
      error: error.message,
    });
  }
};

// PUT /api/users/:id/notifications
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      transferNotifications,
      matchNotifications,
      emailNotifications,
    } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    user.notificationPreferences = {
      transferNotifications:
        transferNotifications ?? user.notificationPreferences.transferNotifications,
      matchNotifications:
        matchNotifications ?? user.notificationPreferences.matchNotifications,
      emailNotifications:
        emailNotifications ?? user.notificationPreferences.emailNotifications,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Bildirim tercihleri güncellendi",
      notificationPreferences: user.notificationPreferences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bildirim tercihleri güncellenemedi",
      error: error.message,
    });
  }
};