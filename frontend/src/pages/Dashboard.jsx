import { useEffect, useState } from "react";
import API from "../services/api";
import BookingCard from "../components/BookingCard";

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
        <p>No bookings found.</p>
      )}

      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          onStartEditing={startEditing}
          onUpdateBooking={updateBooking}
          onCancelBooking={cancelBooking}
          onCancelEdit={() => setEditingId(null)}
        />
      ))}
    </div>
  );
}

export default Dashboard;



