import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const securityQuestion = location.state?.securityQuestion || "";

  const [form, setForm] = useState({
    securityAnswer: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !securityQuestion) {
      alert("Please start from the Forgot Password page.");
      navigate("/forgot-password");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await API.put("/auth/reset-password-security", {
        email,
        securityAnswer: form.securityAnswer,
        newPassword: form.newPassword
      });

      alert("Password reset successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to reset password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>A&S Industrial</h1>

        <h2>Create New Password</h2>

        <p>
          <strong>Security Question:</strong>
        </p>

        <p>{securityQuestion || "No security question loaded."}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Security Answer"
            value={form.securityAnswer}
            onChange={(e) =>
              setForm({
                ...form,
                securityAnswer: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({
                ...form,
                newPassword: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value
              })
            }
            required
          />

          <button type="submit">Reset Password</button>
        </form>

        <p className="auth-switch">
          <Link to="/forgot-password">Back to Account Recovery</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
