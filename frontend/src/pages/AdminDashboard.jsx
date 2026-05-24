import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings/admin/all");

      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log("Admin dashboard error:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelCustomerBooking = async (id) => {
    try {
      await API.put(`/bookings/admin/cancel/${id}`);

      alert("Customer booking cancelled.");

      loadBookings();
    } catch (error) {
      console.log("Admin cancel booking error:", error);
      alert("Unable to cancel customer booking.");
    }
  };

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
            {booking.email || booking.user?.email || "No email"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {booking.phone || "No phone"}
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

          {booking.status !== "Cancelled" && (
            <div className="admin-actions">
              <button
                onClick={() => cancelCustomerBooking(booking._id)}
              >
                Cancel Customer Booking
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
