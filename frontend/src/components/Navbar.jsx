import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">A&S Industrial</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/services">Services</Link>

        {token && (
          <Link to="/book">Book</Link>
        )}

        {token && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {!token ? (
          <Link to="/login">Account</Link>
        ) : (
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;



