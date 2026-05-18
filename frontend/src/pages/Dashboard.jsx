import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my-bookings")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          setBookings([]);
        }
      })
      .catch((error) => {
        console.log("Dashboard error:", error);
        setBookings([]);
      });
  }, []);

  return (
    <div className="page">
      <h1>My Dashboard</h1>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {(bookings || []).map((booking) => (
        <div className="card" key={booking._id}>
          <h3>{booking.service?.name || "Service"}</h3>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;



