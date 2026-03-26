const router = require("express").Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.listTeams);
router.get("/:teamId", teamController.getTeamDetail);
router.get("/:teamId/squad", teamController.getTeamSquad);

module.exports = router;