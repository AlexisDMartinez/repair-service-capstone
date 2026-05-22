const express = require("express");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { issue } = req.body;

  const text = issue.toLowerCase();

  let recommendation = "Custom Metal Fabrication";

  if (
    text.includes("gate") ||
    text.includes("railing") ||
    text.includes("weld") ||
    text.includes("welding")
  ) {
    recommendation = "Railing & Gate Welding";
  } else if (
    text.includes("fence") ||
    text.includes("pipe fence") ||
    text.includes("pipe fencing")
  ) {
    recommendation = "Pipe Fencing Services";
  } else if (
    text.includes("iron") ||
    text.includes("steel") ||
    text.includes("erection") ||
    text.includes("structure") ||
    text.includes("structural")
  ) {
    recommendation = "Structural Iron Erection";
  } else if (
    text.includes("fabrication") ||
    text.includes("custom") ||
    text.includes("metal") ||
    text.includes("fabricate")
  ) {
    recommendation = "Custom Metal Fabrication";
  } else if (
    text.includes("pipe") ||
    text.includes("piping") ||
    text.includes("process") ||
    text.includes("system")
  ) {
    recommendation = "Process Piping Systems";
  }

  res.json({
    recommendation,
    summary:
      "The submitted project requirements were evaluated and aligned with the most appropriate A&S Industrial service solution."
  });
});

module.exports = router;


