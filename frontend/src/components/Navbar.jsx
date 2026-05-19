import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

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

        <Link to="/login">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;

