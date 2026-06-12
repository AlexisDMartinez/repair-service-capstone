import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BookingForm() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const today = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM"
  ];

  useEffect(() => {
    API.get("/services")
      .then((res) => {
        setServices(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        setServices([]);
      });

    API.get("/bookings/fully-booked/dates")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFullyBookedDates(res.data);
        }
      })
      .catch(() => {});
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

    try {
      await API.post("/bookings", form);

      alert("Booking created successfully.");

      setForm({
        service: "",
        date: "",
        time: "",
        notes: ""
      });

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="customer-prefill-box">
        <h3>Customer Information</h3>

        <p>
          <strong>Name:</strong>{" "}
          {user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Phone:</strong> {user?.phone || "Phone not listed"}
        </p>
      </div>

      <label>Service</label>

      <select
        value={form.service}
        onChange={(e) =>
          setForm({
            ...form,
            service: e.target.value
          })
        }
        required
      >
        <option value="">Select Service</option>

        {services.map((service) => (
          <option value={service._id} key={service._id}>
            {service.name}
          </option>
        ))}
      </select>

      <label>Appointment Date</label>

      <input
        type="date"
        min={today}
        value={form.date}
        onChange={(e) => handleDateChange(e.target.value)}
        required
      />

      <label>Appointment Time</label>

      <select
        value={form.time}
        onChange={(e) =>
          setForm({
            ...form,
            time: e.target.value
          })
        }
        required
      >
        <option value="">Select Time Slot</option>

        {timeSlots.map((slot) => (
          <option value={slot} key={slot}>
            {slot}
          </option>
        ))}
      </select>

      <label>Project Notes</label>

      <textarea
        placeholder="Describe the service needed"
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
  );
}

export default BookingForm;