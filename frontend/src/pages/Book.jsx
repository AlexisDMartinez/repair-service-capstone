import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

function Book() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const [services, setServices] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    API.get("/services")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          setServices([]);
        }
      })
      .catch((error) => {
        console.log("Could not load services:", error);
        setServices([]);
      });

    API.get("/bookings/fully-booked/dates")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFullyBookedDates(res.data);
        }
      })
      .catch((error) => {
        console.log("Unable to load fully booked dates:", error);
      });
  }, []);

  const handleDateChange = (selectedDate) => {
    if (fullyBookedDates.includes(selectedDate)) {
      alert("This date is fully booked. Please select another date.");

      setForm({
        ...form,
        date: ""
      });

      return;
    }

    setForm({
      ...form,
      date: selectedDate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.service || !form.date || !form.time) {
      alert("Please select a service, date, and time.");
      return;
    }

    if (form.date < today) {
      alert("Please select today or a future date.");
      return;
    }

    if (fullyBookedDates.includes(form.date)) {
      alert("This date is fully booked. Please select another date.");
      return;
    }

    try {
      await API.post("/bookings", form);

      alert("Booking created successfully.");

      setForm({
        service: "",
        date: "",
        time: "",
        notes: ""
      });
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
            setForm({
              ...form,
              service: e.target.value
            })
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
          min={today}
          value={form.date}
          onChange={(e) => handleDateChange(e.target.value)}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value
            })
          }
        />

        <textarea
          placeholder="Describe the repair issue"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value
            })
          }
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Book;

