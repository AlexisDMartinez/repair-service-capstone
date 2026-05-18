import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>A&S Industrial</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;
