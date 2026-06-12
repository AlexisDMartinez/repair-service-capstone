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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getBookingsForDay = (day) => {
    const dateString = new Date(year, month, day).toDateString();

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date || booking.appointmentDate);
      return bookingDate.toDateString() === dateString;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="calendar-container">
      <h1>Admin Schedule Calendar</h1>

      <div className="calendar-header">
        <button onClick={previousMonth}>Previous</button>
        <h2>{monthName} {year}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>

      <div className="calendar-grid calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dayBookings = day ? getBookingsForDay(day) : [];

          return (
            <div key={index} className={`calendar-day ${dayBookings.length > 0 ? "booked-day" : ""}`}>
              {day && (
                <>
                  <strong>{day}</strong>

                  {dayBookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                      <p>{booking.name || booking.customerName}</p>
                      <small>{booking.service}</small>
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
