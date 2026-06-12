import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCalendar() {
  const today = new Date().toISOString().split("T")[0];

  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);

  const [adminForm, setAdminForm] = useState({
    customerId: "",
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
    fetchCustomers();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/admin/all");
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch {
      setBookings([]);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCustomers([]);
    }
  };

  const openScheduleModal = (date = today) => {
    setAdminForm({
      customerId: "",
      customerName: "",
      email: "",
      phone: "",
      serviceName: "",
      date,
      time: "",
      notes: ""
    });

    setShowScheduleModal(true);
  };

  const openDayScheduleModal = (date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const handleCustomerSelect = (customerId) => {
    const customer = customers.find((item) => item._id === customerId);

    if (!customer) {
      setAdminForm({
        ...adminForm,
        customerId: "",
        customerName: "",
        email: "",
        phone: ""
      });
      return;
    }

    setAdminForm({
      ...adminForm,
      customerId: customer._id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone
    });
  };

  const createAdminBooking = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings/admin/create", adminForm);
      setShowScheduleModal(false);
      fetchBookings();
      alert("Appointment scheduled successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to schedule appointment.");
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await API.put(`/bookings/admin/status/${bookingId}`, { status });
      fetchBookings();
    } catch {
      alert("Unable to update booking status.");
    }
  };

  const statusIsFinal = (status) => {
    return ["Confirmed", "Declined", "Contact Customer"].includes(status);
  };

  const renderStatusActions = (booking, actionClassName) => {
    if (statusIsFinal(booking.status)) {
      return (
        <div className="status-selected-box">
          <p className="status-selected-message">{booking.status}</p>

          <button
            className="change-status-link"
            onClick={() => updateBookingStatus(booking._id, "Scheduled")}
          >
            Change Status
          </button>
        </div>
      );
    }

    return (
      <div className={actionClassName}>
        <button
          onClick={() => updateBookingStatus(booking._id, "Confirmed")}
        >
          Confirm
        </button>

        <button
          onClick={() => updateBookingStatus(booking._id, "Declined")}
        >
          Decline
        </button>

        <button
          onClick={() =>
            updateBookingStatus(booking._id, "Contact Customer")
          }
        >
          Contact
        </button>
      </div>
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (day) => {
    const monthValue = String(month + 1).padStart(2, "0");
    const dayValue = String(day).padStart(2, "0");
    return `${year}-${monthValue}-${dayValue}`;
  };

  const getBookingsForDate = (date) => {
    return bookings.filter((booking) => booking.date === date);
  };

  const getBookingsForDay = (day) => {
    return getBookingsForDate(formatDate(day));
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

  const selectedDateBookings = selectedDate
    ? getBookingsForDate(selectedDate)
    : [];

  const todayBookings = getBookingsForDate(today);

  return (
    <div className="calendar-container admin-calendar-page">
      <h1>Admin Schedule Calendar</h1>

      <button
        className="open-schedule-button"
        onClick={() => openScheduleModal(today)}
      >
        Schedule Customer Appointment
      </button>

      <div className="calendar-layout">
        <div className="calendar-main">
          <div className="calendar-header">
            <button
              className="calendar-nav-button"
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            >
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

            <button
              className="calendar-nav-button"
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            >
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

          <div className="calendar-grid calendar-body">
            {calendarDays.map((day, index) => {
              const dayDate = day ? formatDate(day) : "";
              const dayBookings = day ? getBookingsForDay(day) : [];
              const isToday = dayDate === today;

              return (
                <div
                  key={index}
                  className={`calendar-day ${
                    dayBookings.length > 0 ? "booked-day" : ""
                  } ${isToday ? "today-calendar-day" : ""}`}
                  onClick={() => {
                    if (day) {
                      openDayScheduleModal(dayDate);
                    }
                  }}
                  onDoubleClick={() => {
                    if (day) {
                      setSelectedDate(dayDate);
                      openScheduleModal(dayDate);
                    }
                  }}
                >
                  {day && (
                    <>
                      <div className="calendar-date-row">
                        <span className="calendar-date-number">{day}</span>
                      </div>

                      <div className="calendar-booking-stack">
                        {dayBookings.map((booking) => (
                          <div key={booking._id} className="booking-card">
                            <p className="booking-name">
                              {booking.user?.name ||
                                booking.customerName ||
                                "Customer"}
                            </p>

                            <p>
                              {booking.time || "No time"} |{" "}
                              {booking.status || "Scheduled"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="today-schedule-panel">
          <h2>Today&apos;s Schedule</h2>

          <p className="selected-date-label">{today}</p>

          <button
            className="today-add-button"
            onClick={() => openScheduleModal(today)}
          >
            Add Appointment
          </button>

          {todayBookings.length === 0 && (
            <p>No appointments scheduled for today.</p>
          )}

          {todayBookings.map((booking) => (
            <div key={booking._id} className="today-booking-tab">
              <strong>
                {booking.user?.name || booking.customerName || "Customer"}
              </strong>

              <p>
                {booking.date} at {booking.time}
              </p>

              <p>{booking.status || "Scheduled"}</p>

              {renderStatusActions(booking, "today-tab-actions")}
            </div>
          ))}
        </aside>
      </div>

      {showDayModal && (
        <div className="modal-overlay">
          <div className="day-schedule-modal">
            <button
              className="modal-close-button day-modal-close"
              onClick={() => setShowDayModal(false)}
            >
              ×
            </button>

            <h2>Day Schedule</h2>

            <p className="selected-date-label">
              {selectedDate || "No date selected"}
            </p>

            <button
              className="day-modal-add-button"
              onClick={() => {
                setShowDayModal(false);
                openScheduleModal(selectedDate);
              }}
            >
              Add Appointment
            </button>

            {selectedDateBookings.length === 0 && (
              <p>No appointments scheduled.</p>
            )}

            {selectedDateBookings.map((booking) => (
              <div key={booking._id} className="day-booking-tab">
                <div>
                  <strong>
                    {booking.user?.name || booking.customerName || "Customer"}
                  </strong>

                  <p>
                    {booking.date} at {booking.time}
                  </p>

                  <p>{booking.status || "Scheduled"}</p>
                </div>

                {renderStatusActions(booking, "day-tab-actions")}
              </div>
            ))}
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="schedule-modal">
            <button
              className="modal-close-button"
              onClick={() => setShowScheduleModal(false)}
            >
              ×
            </button>

            <h2>Schedule Customer Appointment</h2>

            <form className="admin-booking-form" onSubmit={createAdminBooking}>
              <select
                value={adminForm.customerId}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                required
              >
                <option value="">Select Customer</option>

                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.firstName} {customer.lastName} - {customer.email}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Customer Name"
                value={adminForm.customerName}
                readOnly
              />

              <input
                type="email"
                placeholder="Customer Email"
                value={adminForm.email}
                readOnly
              />

              <input
                type="text"
                placeholder="Phone"
                value={adminForm.phone}
                readOnly
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCalendar;