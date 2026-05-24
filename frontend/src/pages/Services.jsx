import { useEffect, useState } from "react";
import API from "../services/api";
import AIAssistantWidget from "../components/AIAssistantWidget";

function Services() {
  const [services, setServices] = useState([]);

  const isDesktop = window.innerWidth > 768;

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    API.get("/services")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          setServices([]);
          console.log("Unexpected services response:", res.data);
        }
      })
      .catch((error) => {
        console.log("Could not load services:", error);
        setServices([]);
      });
  }, []);

  return (
    <div className="page">

      {!isAdmin && (
        <AIAssistantWidget
          autoOpen={isDesktop}
          autoOpenDelay={3000}
          autoCloseDelay={5000}
        />
      )}

      <h1>Repair Services</h1>

      {services.length === 0 && (
        <p>No services are available right now.</p>
      )}

      <div className="grid">
        {services.map((service) => (
          <div className="card" key={service._id}>
            <h3>{service.name}</h3>

            <p>{service.description}</p>

            <div className="service-details">
              <p>
                <strong>Category:</strong> {service.category}
              </p>

              <p>
                <strong>Duration:</strong> {service.duration}
              </p>

              <p>
                <strong>Estimate:</strong> {service.priceEstimate}
              </p>
            </div>

            <a className="button" href="/book">
              Book Service
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;