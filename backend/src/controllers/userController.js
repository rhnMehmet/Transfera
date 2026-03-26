const User = require("../models/User");

const bcrypt = require("bcryptjs");

// GET /api/users/:id
exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu profile erişim yetkiniz yok",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profil alınırken hata oluştu",
      error: error.message,
    });
  }
};

// POST /api/users/:id/favorites/teams
exports.addFavoriteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamId, teamName } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    if (!teamId || !teamName) {
      return res.status(400).json({
        success: false,
        message: "teamId ve teamName zorunludur",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const alreadyExists = user.favoriteTeams.some(
      (team) => team.teamId === Number(teamId)
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Takım zaten favorilere eklenmiş",
      });
    }

    user.favoriteTeams.push({
      teamId: Number(teamId),
      teamName: teamName.trim(),
    });

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
      (team) => team.teamId !== Number(teamId)
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
    const { playerId, playerName } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    if (!playerId || !playerName) {
      return res.status(400).json({
        success: false,
        message: "playerId ve playerName zorunludur",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const alreadyExists = user.favoritePlayers.some(
      (player) => player.playerId === Number(playerId)
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Oyuncu zaten favorilere eklenmiş",
      });
    }

    user.favoritePlayers.push({
      playerId: Number(playerId),
      playerName: playerName.trim(),
    });

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
      (player) => player.playerId !== Number(playerId)
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
    const { transferNotifications, matchNotifications, emailNotifications } = req.body;

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


// PUT /api/users/:id
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email } = req.body;

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

    if (email && email.trim().toLowerCase() !== user.email) {
      const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
        _id: { $ne: id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Bu email başka bir kullanıcı tarafından kullanılıyor",
        });
      }
    }

    user.name = name ? name.trim() : user.name;
    user.surname = surname ? surname.trim() : user.surname;
    user.email = email ? email.trim().toLowerCase() : user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profil güncellendi",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        favoriteTeams: user.favoriteTeams,
        favoritePlayers: user.favoritePlayers,
        notificationPreferences: user.notificationPreferences,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profil güncellenemedi",
      error: error.message,
    });
  }
};

// PUT /api/users/:id/password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Mevcut şifre ve yeni şifre zorunludur",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Yeni şifre en az 6 karakter olmalıdır",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Mevcut şifre yanlış",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Şifre başarıyla değiştirildi",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Şifre değiştirilemedi",
      error: error.message,
    });
  }
};

// POST /api/users/logout
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Çıkış başarılı",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Çıkış yapılamadı",
      error: error.message,
    });
  }
};

// DELETE /api/users/:id
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

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

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Hesap başarıyla silindi",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hesap silinemedi",
      error: error.message,
    });
  }
};