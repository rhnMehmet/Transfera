const router = require("express").Router();
const transferController = require("../controllers/transferController");

router.get("/", transferController.listTransfers);

module.exports = router;