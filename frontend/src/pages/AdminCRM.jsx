import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

function AdminCRM() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const loadCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert("Unable to load customer CRM.");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = search.toLowerCase();

      const fullName = `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();

      const matchesSearch =
        fullName.includes(searchValue) ||
        customer.email?.toLowerCase().includes(searchValue) ||
        customer.phone?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || customer.customerStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const startEdit = (customer) => {
    setSelectedCustomer(customer);

    setEditForm({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phone: customer.phone || "",
      email: customer.email || "",
      customerStatus: customer.customerStatus || "Active",
      customerNotes: customer.customerNotes || ""
    });
  };

  const saveCustomer = async () => {
    try {
      await API.put(`/customers/${selectedCustomer._id}`, editForm);

      alert("Customer updated successfully.");

      setEditForm(null);
      setSelectedCustomer(null);
      loadCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update customer.");
    }
  };

  return (
    <div className="page">
      <h1>Customer CRM</h1>

      <div className="crm-toolbar">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Customers</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Needs Follow Up">Needs Follow Up</option>
        </select>
      </div>

      <div className="crm-summary-grid">
        <div className="crm-summary-card">
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>

        <div className="crm-summary-card">
          <h3>Active</h3>
          <p>{customers.filter((c) => c.customerStatus === "Active").length}</p>
        </div>

        <div className="crm-summary-card">
          <h3>Needs Follow Up</h3>
          <p>
            {
              customers.filter((c) => c.customerStatus === "Needs Follow Up")
                .length
            }
          </p>
        </div>
      </div>

      <div className="crm-grid">
        {filteredCustomers.map((customer) => (
          <div className="crm-card" key={customer._id}>
            <h2>
              {customer.firstName} {customer.lastName}
            </h2>

            <p>
              <strong>Email:</strong> {customer.email}
            </p>

            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>

            <p>
              <strong>Status:</strong> {customer.customerStatus}
            </p>

            <p>
              <strong>Total Bookings:</strong> {customer.bookingCount}
            </p>

            <p>
              <strong>Last Appointment:</strong>{" "}
              {customer.lastBooking
                ? `${customer.lastBooking.date} at ${customer.lastBooking.time}`
                : "No appointments"}
            </p>

            {customer.customerNotes && (
              <p>
                <strong>CRM Notes:</strong> {customer.customerNotes}
              </p>
            )}

            <button onClick={() => startEdit(customer)}>
              View / Edit Customer
            </button>
          </div>
        ))}
      </div>

      {selectedCustomer && editForm && (
        <div className="modal-overlay">
          <div className="crm-modal">
            <button
              className="modal-close-button"
              onClick={() => {
                setSelectedCustomer(null);
                setEditForm(null);
              }}
            >
              ×
            </button>

            <h2>Customer Record</h2>

            <input
              type="text"
              placeholder="First Name"
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm({ ...editForm, firstName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm({ ...editForm, lastName: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />

            <select
              value={editForm.customerStatus}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  customerStatus: e.target.value
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Needs Follow Up">Needs Follow Up</option>
            </select>

            <textarea
              placeholder="CRM Notes"
              value={editForm.customerNotes}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  customerNotes: e.target.value
                })
              }
            />

            <button className="crm-save-button" onClick={saveCustomer}>
              Save Customer
            </button>

            <h3>Booking History</h3>

            {selectedCustomer.bookings?.length === 0 && (
              <p>No booking history.</p>
            )}

            {selectedCustomer.bookings?.map((booking) => (
              <div className="crm-history-card" key={booking._id}>
                <p>
                  <strong>Service:</strong>{" "}
                  {booking.service?.name ||
                    booking.serviceName ||
                    "Service not listed"}
                </p>

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
                  <strong>Notes:</strong> {booking.notes || "No notes"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCRM;