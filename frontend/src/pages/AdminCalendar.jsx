import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCalendar() {
  const [bookings, setBookings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [adminForm, setAdminForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceName: "",
    date: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/admin/all");

      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    }
  };

  const createAdminBooking = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings/admin/create", adminForm);

      setAdminForm({
        customerName: "",
        email: "",
        phone: "",
        serviceName: "",
        date: "",
        time: "",
        notes: ""
      });

      fetchBookings();

      alert("Appointment scheduled successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to schedule appointment.");
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await API.put(`/bookings/admin/status/${bookingId}`, {
        status
      });

      fetchBookings();
    } catch (error) {
      alert("Unable to update booking status.");
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getBookingsForDay = (day) => {
    const selectedDate = new Date(year, month, day).toDateString();

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date).toDateString();
      return bookingDate === selectedDate;
    });
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const years = [];

  for (let y = 2024; y <= 2035; y++) {
    years.push(y);
  }

  return (
    <div className="calendar-container">
      <h1>Admin Schedule Calendar</h1>

      <form className="admin-booking-form" onSubmit={createAdminBooking}>
        <h2>Schedule Appointment for Customer</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={adminForm.customerName}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              customerName: e.target.value
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Customer Email"
          value={adminForm.email}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              email: e.target.value
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={adminForm.phone}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              phone: e.target.value
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Service"
          value={adminForm.serviceName}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              serviceName: e.target.value
            })
          }
          required
        />

        <input
          type="date"
          value={adminForm.date}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              date: e.target.value
            })
          }
          required
        />

        <input
          type="time"
          value={adminForm.time}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              time: e.target.value
            })
          }
          required
        />

        <textarea
          placeholder="Notes"
          value={adminForm.notes}
          onChange={(e) =>
            setAdminForm({
              ...adminForm,
              notes: e.target.value
            })
          }
        />

        <button type="submit">Schedule Appointment</button>
      </form>

      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          Back
        </button>

        <div className="calendar-title-area">
          <select
            value={month}
            onChange={(e) =>
              setCurrentDate(new Date(year, Number(e.target.value), 1))
            }
          >
            {months.map((monthName, index) => (
              <option key={monthName} value={index}>
                {monthName}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) =>
              setCurrentDate(new Date(Number(e.target.value), month, 1))
            }
          >
            {years.map((calendarYear) => (
              <option key={calendarYear} value={calendarYear}>
                {calendarYear}
              </option>
            ))}
          </select>
        </div>

        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          Forward
        </button>
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
                        {booking.user?.name ||
                          booking.customerName ||
                          "Customer"}
                      </p>

                      <p>
                        {booking.service?.name ||
                          booking.serviceName ||
                          "Service not listed"}
                      </p>

                      <p>
                        <strong>Email:</strong> {booking.email}
                      </p>

                      <p>
                        <strong>Phone:</strong> {booking.phone}
                      </p>

                      <p>
                        <strong>Time:</strong> {booking.time || "No time listed"}
                      </p>

                      <p>
                        <strong>Status:</strong> {booking.status || "Scheduled"}
                      </p>

                      {booking.notes && (
                        <p>
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      )}

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

