import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Precision Welding & Industrial Fabrication Solutions</h1>

          <p>
            Veteran-Owned Industrial Welding and Fabrication Focused on
            Precision, Durability, and Professional Service Excellence.
          </p>

          <Link to="/services" className="button">
            Browse Services
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
