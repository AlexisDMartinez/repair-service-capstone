import { useEffect, useState } from "react";
import API from "../services/api";

function Book() {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    API.get("/services").then((res) => setServices(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", form);
      alert("Booking created successfully.");
    } catch (error) {
      alert("Booking failed. Make sure you are logged in.");
    }
  };

  return (
    <div className="page form-page">
      <h1>Book a Repair Appointment</h1>

      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setForm({ ...form, service: e.target.value })}>
          <option value="">Select Service</option>

          {services.map((service) => (
            <option value={service._id} key={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <textarea
          placeholder="Describe the repair issue"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button>Book Appointment</button>
      </form>
    </div>
  );
}

export default Book;

