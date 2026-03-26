const router = require("express").Router();
const playerController = require("../controllers/playerController");

router.get("/", playerController.listPlayers);
router.get("/:playerId", playerController.getPlayerDetail);
router.get("/:playerId/transfers", playerController.getPlayerTransfers);

module.exports = router;