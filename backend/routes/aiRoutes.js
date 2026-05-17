const express = require("express");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { issue } = req.body;

  let recommendation = "General Repair Service";

  if (
    issue.toLowerCase().includes("laptop") ||
    issue.toLowerCase().includes("computer")
  ) {
    recommendation = "Computer Repair Service";
  }

  if (
    issue.toLowerCase().includes("phone") ||
    issue.toLowerCase().includes("screen")
  ) {
    recommendation = "Phone Screen Replacement";
  }

  res.json({
    recommendation,
    summary:
      "AI analyzed the repair issue and generated a recommended service."
  });
});

module.exports = router;

