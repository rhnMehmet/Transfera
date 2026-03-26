const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

// Favori takım ekle
router.post("/:id/favorites/teams", authMiddleware, favoriteController.addFavoriteTeam);

// Favori takım sil
router.delete(
  "/:id/favorites/teams/:teamId",
  authMiddleware,
  favoriteController.removeFavoriteTeam
);

// Favori oyuncu ekle
router.post(
  "/:id/favorites/players",
  authMiddleware,
  favoriteController.addFavoritePlayer
);

// Favori oyuncu sil
router.delete(
  "/:id/favorites/players/:playerId",
  authMiddleware,
  favoriteController.removeFavoritePlayer
);

// Bildirim tercihleri güncelle
router.put(
  "/:id/notifications",
  authMiddleware,
  favoriteController.updateNotificationPreferences
);

module.exports = router;