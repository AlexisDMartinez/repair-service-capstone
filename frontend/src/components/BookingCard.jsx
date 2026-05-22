import EditBookingForm from "./EditBookingForm";

function BookingCard({
  booking,
  editingId,
  editForm,
  setEditForm,
  onStartEditing,
  onUpdateBooking,
  onCancelBooking,
  onCancelEdit
}) {
  const isEditing = editingId === booking._id;

  return (
    <div className="card">
      <h3>{booking.service?.name || "Service"}</h3>

      {isEditing ? (
        <EditBookingForm
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={() => onUpdateBooking(booking._id)}
          onCancel={onCancelEdit}
        />
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
              <button onClick={() => onStartEditing(booking)}>
                Update Booking
              </button>

              <button onClick={() => onCancelBooking(booking._id)}>
                Cancel Booking
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BookingCard;
