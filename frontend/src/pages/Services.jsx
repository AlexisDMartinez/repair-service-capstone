import { useEffect, useState } from "react";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch(() => alert("Could not load services."));
  }, []);

  return (
    <div className="page">
      <h1>Repair Services</h1>

      <div className="grid">
        {services.map((service) => (
          <div className="card" key={service._id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Duration:</strong> {service.duration}</p>
            <p><strong>Estimate:</strong> {service.priceEstimate}</p>
            <a className="button" href="/book">Book Service</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
