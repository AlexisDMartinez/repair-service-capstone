import { useState } from "react";
import API from "../services/api";

function AIAssistant() {
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(null);

  const handleAskAI = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/ai/recommend", { issue });
      setResult(res.data);
    } catch (error) {
      alert("AI recommendation failed.");
    }
  };

  return (
    <div className="page form-page">
      <h1>AI Repair Assistant</h1>

      <p>
        Describe your repair issue and the AI assistant
        will recommend the best service.
      </p>

      <form onSubmit={handleAskAI}>
        <textarea
          placeholder="Example: My laptop keeps overheating."
          onChange={(e) => setIssue(e.target.value)}
        />

        <button>Get Recommendation</button>
      </form>

      {result && (
        <div className="card">
          <h3>Recommended Service</h3>

          <p>{result.recommendation}</p>

          <p>{result.summary}</p>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;

