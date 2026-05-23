function EditBookingForm({
  editForm,
  setEditForm,
  onSave,
  onCancel
}) {
  return (
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

      <div className="edit-booking-buttons">
        <button onClick={onSave}>
          Save Changes
        </button>

        <button onClick={onCancel}>
          Cancel Edit
        </button>
      </div>
    </>
  );
}

export default EditBookingForm;