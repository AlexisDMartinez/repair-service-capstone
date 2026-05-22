import { useEffect, useState } from "react";
import API from "../services/api";

function AIAssistantWidget({ autoOpen = false }) {
  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const handleAskAI = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/ai/recommend", { issue });
      setResult(res.data);
    } catch (error) {
      console.log(error);
      alert("Recommendation failed.");
    }
  };

  return (
    <>
      {!open && (
        <button
          className="ai-floating-button"
          onClick={() => setOpen(true)}
        >
          Service Match Assistant
        </button>
      )}

      {open && (
        <div className="ai-widget">
          <div className="ai-widget-header">
            <h3>Service Match Assistant</h3>

            <button
              className="ai-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <p>
            Not sure which service to book? Describe your project and we will recommend the best match.
          </p>

          <form onSubmit={handleAskAI}>
            <textarea
              placeholder="Example: I need a gate welded at my property."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />

            <button type="submit">Get Recommendation</button>
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

