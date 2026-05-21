import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    notes: ""
  });

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");

      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log("Dashboard error:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const startEditing = (booking) => {
    setEditingId(booking._id);

    setEditForm({
      date: booking.date || "",
      time: booking.time || "",
      notes: booking.notes || ""
    });
  };

  const updateBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}`, editForm);

      setEditingId(null);

      loadBookings();

      alert("Booking updated successfully.");
    } catch (error) {
      console.log("Update booking error:", error);
      alert("Unable to update booking.");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/cancel/${id}`);

      loadBookings();

      alert("Booking cancelled successfully.");
    } catch (error) {
      console.log("Cancel booking error:", error);
      alert("Unable to cancel booking.");
    }
  };

  return (
    <div className="page">
      <h1>My Dashboard</h1>

      {bookings.length === 0 && (
        <p>Please log in to view your bookings.</p>
      )}

      {bookings.map((booking) => (
        <div className="card" key={booking._id}>
          <h3>{booking.service?.name || "Service"}</h3>

          {editingId === booking._id ? (
            <>
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    date: e.target.value
                  })
                }
              />

              <input
                type="time"
                value={editForm.time}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    time: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Update notes"
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    notes: e.target.value
                  })
                }
              />

              <button onClick={() => updateBooking(booking._id)}>
                Save Changes
              </button>

              <button onClick={() => setEditingId(null)}>
                Cancel Edit
              </button>
            </>
          ) : (
            <>
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
                <>
                  <button onClick={() => startEditing(booking)}>
                    Update Booking
                  </button>

                  <button onClick={() => cancelBooking(booking._id)}>
                    Cancel Booking
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;




