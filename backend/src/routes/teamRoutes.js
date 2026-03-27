const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

// /api/teams adresine gelen istekleri controller'a yönlendir
router.get("/", teamController.listTeams);

module.exports = router;

router.get("/:id", teamController.getTeamDetail); 

module.exports = router;