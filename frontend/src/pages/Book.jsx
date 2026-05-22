import { Navigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function Book() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page form-page">
      <h1>Book a Service Appointment</h1>

      <BookingForm />
    </div>
  );
}

export default Book;



