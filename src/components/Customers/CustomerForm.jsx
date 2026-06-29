import { useState, useEffect } from "react";

function CustomerForm({ initialData = {}, onSubmit }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    openingBalance: 0,
    creditLimit: 0,
    notes: "",
    status: true
  });

  useEffect(() => {
    if (Object.keys(initialData).length) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (

    <form className="customer-form" onSubmit={handleSubmit}>

      <div className="form-grid">

        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="gstNumber"
          placeholder="GST Number"
          value={form.gstNumber}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <input
          type="number"
          name="openingBalance"
          placeholder="Opening Balance"
          value={form.openingBalance}
          onChange={handleChange}
        />

        <input
          type="number"
          name="creditLimit"
          placeholder="Credit Limit"
          value={form.creditLimit}
          onChange={handleChange}
        />

      </div>

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <label>

        <input
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={handleChange}
        />

        Active Customer

      </label>

      <button
        type="submit"
        className="add-btn"
      >
        Save Customer
      </button>

    </form>

  );

}

export default CustomerForm;