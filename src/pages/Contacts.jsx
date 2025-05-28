// src/components/Contacts.jsx
import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contacts = () => {
  const { store } = useGlobalReducer();
  // base now points to the /contacts collection
  const base = `${store.BASE_URL}/${store.SLUG}/contacts`;

  const [contacts, setContacts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const empty = { name: "", email: "", phone: "", address: "" };
  const [form, setForm] = useState(empty);

  const fetchContacts = async () => {
    try {
      const res = await fetch(base);          // GET /mariana/contacts
      const body = await res.json();
      if (!res.ok) throw new Error(body);
      setContacts(body.contacts);
    } catch (err) {
      console.error("Fetch contacts failed:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const showAddForm = () => {
    setEditing(null);
    setForm(empty);
    setFormVisible(true);
  };

  const showEditForm = (c) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, address: c.address });
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
    setEditing(null);
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSave = async () => {
    const { name, email, phone, address } = form;
    if (!name || !email || !phone || !address) {
      return alert("All fields are required 😐");
    }

    // POST to /contacts when adding, PUT to /contacts/:id when editing
    const url = editing
      ? `${base}/${editing.id}`   
      : base;                     
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      await fetchContacts();
      hideForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert(`Save failed: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      const res = await fetch(`${base}/${id}`, { method: "DELETE" });  // DELETE /mariana/contacts/:id
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      await fetchContacts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contacts</h2>
        <button className="btn btn-success" onClick={showAddForm}>
          + Add New Contact
        </button>
      </div>

      {/* Inline Add/Edit Form */}
      {formVisible && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header">
            {editing ? "Edit Contact" : "Add a New Contact"}
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={hideForm}
            />
          </div>
          <div className="card-body">
            {["name", "email", "phone", "address"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  className="form-control"
                  value={form[field]}
                  onChange={handleChange(field)}
                />
              </div>
            ))}
            <button className="btn btn-primary w-100" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* Contacts Grid */}
      <div className="row g-4">
        {contacts.map((c) => (
          <div className="col-md-4" key={c.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <p className="mb-1">
                  <i className="fas fa-envelope me-2 text-secondary" />
                  {c.email}
                </p>
                <p className="mb-1">
                  <i className="fas fa-phone me-2 text-secondary" />
                  {c.phone}
                </p>
                <p className="mb-0">
                  <i className="fas fa-map-marker-alt me-2 text-secondary" />
                  {c.address}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => showEditForm(c)}
                >
                  <i className="fas fa-pencil-alt" />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
