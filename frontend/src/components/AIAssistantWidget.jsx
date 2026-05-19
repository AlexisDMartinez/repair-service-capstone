import { useState } from "react";
import API from "../services/api";

function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(null);

  const handleAskAI = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/ai/recommend", { issue });

      setResult(res.data);
    } catch (error) {
      console.log(error);
      alert("AI recommendation failed.");
    }
  };

  return (
    <>
      <button
        className="ai-floating-button"
        onClick={() => setOpen(!open)}
      >
        AI Service Assistant
      </button>

      {open && (
        <div className="ai-widget">
          <div className="ai-widget-header">
            <h3>AI Repair Assistant</h3>

            <button
              className="ai-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <p>
            Describe your issue and receive a repair service recommendation.
          </p>

          <form onSubmit={handleAskAI}>
            <textarea
              placeholder="Example: My laptop is overheating and shutting off."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <button type="submit">
              Get Recommendation
            </button>
          </form>

          {result && (
            <div className="ai-result">
              <strong>{result.recommendation}</strong>

              <p>{result.summary}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AIAssistantWidget;

