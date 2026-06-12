import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");

  const navigate = useNavigate();

  const handleGetQuestion = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/security-question", {
        email: email.toLowerCase().trim()
      });

      setSecurityQuestion(res.data.securityQuestion);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to find security question for this account."
      );
    }
  };

  const goToResetPassword = () => {
    navigate("/reset-password", {
      state: {
        email: email.toLowerCase().trim(),
        securityQuestion
      }
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>A&S Industrial</h1>

        <h2>Account Recovery</h2>

        <p>Enter your email address to find your security question.</p>

        <form onSubmit={handleGetQuestion}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Find Security Question</button>
        </form>

        {securityQuestion && (
          <div className="security-question-box">
            <p>
              <strong>Security Question:</strong>
            </p>

            <p>{securityQuestion}</p>

            <button onClick={goToResetPassword}>Answer Question</button>
          </div>
        )}

        <p className="auth-switch">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
