const getRepairRecommendation = async (req, res) => {
  const { issue } = req.body;

  let recommendation = "General Repair Diagnostic";

  if (issue.toLowerCase().includes("phone")) {
    recommendation = "Phone Repair Service";
  } else if (issue.toLowerCase().includes("laptop") || issue.toLowerCase().includes("computer")) {
    recommendation = "Computer Repair Service";
  } else if (issue.toLowerCase().includes("sink") || issue.toLowerCase().includes("pipe")) {
    recommendation = "Plumbing Repair Service";
  } else if (issue.toLowerCase().includes("outlet") || issue.toLowerCase().includes("light")) {
    recommendation = "Electrical Repair Service";
  } else if (issue.toLowerCase().includes("washer") || issue.toLowerCase().includes("dryer")) {
    recommendation = "Appliance Repair Service";
  }

  res.json({
    recommendation,
    summary: `Based on your issue, we recommend: ${recommendation}. A technician can inspect the problem and provide next steps.`
  });
};

module.exports = { getRepairRecommendation };
