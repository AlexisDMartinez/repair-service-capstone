import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const registerData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        securityQuestion: form.securityQuestion,
        securityAnswer: form.securityAnswer.trim()
      };

      await API.post("/auth/register", registerData);

      alert("Account created successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to register.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>A&S Industrial</h1>

        <h2>Create Account</h2>

        <p>Create your account to book and manage repair services.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <select
            value={form.securityQuestion}
            onChange={(e) =>
              setForm({ ...form, securityQuestion: e.target.value })
            }
            required
          >
            <option value="">Select a security question</option>
            <option value="What was the name of your first pet?">
              What was the name of your first pet?
            </option>
            <option value="What city were you born in?">
              What city were you born in?
            </option>
            <option value="What was your first car?">
              What was your first car?
            </option>
            <option value="What is your favorite color?">
              What is your favorite color?
            </option>
          </select>

          <input
            type="text"
            placeholder="Security Answer"
            value={form.securityAnswer}
            onChange={(e) =>
              setForm({ ...form, securityAnswer: e.target.value })
            }
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;



