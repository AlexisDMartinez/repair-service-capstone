import { useEffect, useState } from "react";
import axios from "axios";

function AdminCalendar() {
  const [bookings, setBookings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        status,
      });

      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Unable to update booking status.");
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getBookingsForDay = (day) => {
    const dateString = new Date(year, month, day).toDateString();

    return bookings.filter((booking) => {
      const bookingDate = new Date(
        booking.date || booking.appointmentDate || booking.bookingDate
      );

      return bookingDate.toDateString() === dateString;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleYearChange = (e) => {
    const selectedYear = Number(e.target.value);
    setCurrentDate(new Date(selectedYear, month, 1));
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const years = [];
  for (let y = 2024; y <= 2035; y++) {
    years.push(y);
  }

  return (
    <div className="calendar-container">
      <h1>Admin Schedule Calendar</h1>

      <div className="calendar-header">
        <button onClick={previousMonth}>Back</button>

        <div className="calendar-title-area">
          <h2>
            {monthName} {year}
          </h2>

          <select value={year} onChange={handleYearChange}>
            {years.map((calendarYear) => (
              <option key={calendarYear} value={calendarYear}>
                {calendarYear}
              </option>
            ))}
          </select>
        </div>

        <button onClick={nextMonth}>Forward</button>
      </div>

      <div className="calendar-grid calendar-weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dayBookings = day ? getBookingsForDay(day) : [];

          return (
            <div
              key={index}
              className={`calendar-day ${
                dayBookings.length > 0 ? "booked-day" : ""
              }`}
            >
              {day && (
                <>
                  <div className="calendar-date-number">{day}</div>

                  {dayBookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                      <p className="booking-name">
                        {booking.name || booking.customerName || "Customer"}
                      </p>

                      <p>{booking.service || "Service not listed"}</p>

                      <p>
                        <strong>Time:</strong>{" "}
                        {booking.time ||
                          booking.appointmentTime ||
                          booking.bookingTime ||
                          "No time listed"}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {booking.status || "Pending"}
                      </p>

                      <div className="booking-actions">
                        <button
                          className="yes-button"
                          onClick={() =>
                            updateBookingStatus(booking._id, "Confirmed")
                          }
                        >
                          Yes
                        </button>

                        <button
                          className="no-button"
                          onClick={() =>
                            updateBookingStatus(booking._id, "Not Confirmed")
                          }
                        >
                          No
                        </button>

                        <button
                          className="contact-button"
                          onClick={() =>
                            updateBookingStatus(
                              booking._id,
                              "Contact Customer"
                            )
                          }
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminCalendar;

