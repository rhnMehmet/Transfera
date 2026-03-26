const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", authMiddleware, userController.getProfile);

router.put("/:id", authMiddleware, userController.updateProfile);
router.put("/:id/password", authMiddleware, userController.changePassword);
router.post("/logout", authMiddleware, userController.logout);
router.delete("/:id", authMiddleware, userController.deleteAccount);

router.post("/:id/favorites/teams", authMiddleware, userController.addFavoriteTeam);
router.delete("/:id/favorites/teams/:teamId", authMiddleware, userController.removeFavoriteTeam);

router.post("/:id/favorites/players", authMiddleware, userController.addFavoritePlayer);
router.delete("/:id/favorites/players/:playerId", authMiddleware, userController.removeFavoritePlayer);

router.put("/:id/notifications", authMiddleware, userController.updateNotificationPreferences);

module.exports = router;