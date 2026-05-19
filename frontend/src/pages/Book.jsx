import { useEffect, useState } from "react";
import API from "../services/api";
import { Navigate } from "react-router-dom";

function Book() {
    const token = localStorage.getItem("token");

if (!token) {
  return <Navigate to="/login" />;
}
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    notes: ""
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.service || !form.date || !form.time) {
      alert("Please select a service, date, and time.");
      return;
    }

    try {
      await API.post("/bookings", form);
      alert("Booking created successfully.");
    } catch (error) {
      console.log("Booking error:", error);
      alert("Booking failed. Make sure you are logged in.");
    }
  };

  return (
    <div className="page form-page">
      <h1>Book a Repair Appointment</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.service}
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
        >
          <option value="">Select Service</option>

          {services.map((service) => (
            <option value={service._id} key={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) =>
            setForm({ ...form, time: e.target.value })
          }
        />

        <textarea
          placeholder="Describe the repair issue"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Book;

