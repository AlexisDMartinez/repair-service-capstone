function EditBookingForm({
  editForm,
  setEditForm,
  onSave,
  onCancel
}) {
  const safeForm = editForm || {
    date: "",
    time: "",
    notes: ""
  };

  return (
    <>
      <input
        type="date"
        value={safeForm.date || ""}
        onChange={(e) =>
          setEditForm({
            ...safeForm,
            date: e.target.value
          })
        }
      />

      <input
        type="time"
        value={safeForm.time || ""}
        onChange={(e) =>
          setEditForm({
            ...safeForm,
            time: e.target.value
          })
        }
      />

      <textarea
        placeholder="Update notes"
        value={safeForm.notes || ""}
        onChange={(e) =>
          setEditForm({
            ...safeForm,
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