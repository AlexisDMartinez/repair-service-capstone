import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/admin/all")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          setBookings([]);
        }
      })
      .catch((error) => {
        console.log("Admin dashboard error:", error);
        setBookings([]);
      });
  }, []);

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {bookings.map((booking) => (
        <div className="card" key={booking._id}>
          <h3>{booking.service?.name || "Service"}</h3>

          <p>
            <strong>Customer:</strong>{" "}
            {booking.user?.name || "Unknown"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {booking.user?.email || "No email"}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Status:</strong> {booking.status}
          </p>

          <p>
            <strong>Notes:</strong> {booking.notes}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
