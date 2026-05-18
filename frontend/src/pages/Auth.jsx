import { useState } from "react";
        });

        localStorage.setItem("token", res.data.token);

        alert("Login successful");
        navigate("/dashboard");
      } else {
        await API.post("/auth/register", form);

        alert("Registration successful. Please log in.");

        setIsLogin(true);

        setForm({
          name: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.log(error);
      alert("Authentication failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

        <p>
          {isLogin
            ? "Sign in to manage your repair bookings"
            : "Create your account to begin booking services"}
        </p>

        <div className="auth-toggle">
          <button
            className={isLogin ? "active-auth" : "inactive-auth"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active-auth" : "inactive-auth"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
