import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">A&S Industrial</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/book">Book</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
        <Link to="/login">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;
