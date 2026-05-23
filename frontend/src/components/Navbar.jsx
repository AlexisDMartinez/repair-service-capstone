import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <h2 className="logo">A&S Industrial</h2>

      <div className="nav-links">
        {!token && (
          <>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Account</Link>
          </>
        )}

        {token && !isAdmin && (
          <>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/book">Book</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}

        {token && isAdmin && (
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        )}

        {token && (
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




