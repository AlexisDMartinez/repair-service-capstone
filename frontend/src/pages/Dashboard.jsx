import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");
      setBookings(res.data);
    } catch (error) {
      alert("Please log in to view your dashboard.");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    await API.put(`/bookings/cancel/${id}`);
    loadBookings();
  };

  return (
    <div className="page">
      <h1>My Dashboard</h1>

      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((booking) => (
        <div className="card" key={booking._id}>
          <h3>{booking.service?.name}</h3>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Notes:</strong> {booking.notes}</p>

          {booking.status !== "Cancelled" && (
            <button onClick={() => cancelBooking(booking._id)}>
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;



