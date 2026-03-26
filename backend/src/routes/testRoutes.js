const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Test route çalışıyor",
  });
});

module.exports = router;