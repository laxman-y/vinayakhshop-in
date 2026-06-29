import {
  useEffect,
  useState
} from "react";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../../services/supplierService";

import "./Suppliers.css";

function Suppliers() {

  const [suppliers,
    setSuppliers] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [editingId,
    setEditingId] =
    useState(null);

  const [formData,
    setFormData] =
    useState({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      gstNumber: ""
    });

  const token =
    localStorage.getItem("token");

  const loadSuppliers =
    async () => {

      try {

        const data =
          await getSuppliers();

        setSuppliers(
          data.suppliers || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadSuppliers();

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await updateSupplier(
            editingId,
            formData,
            token
          );

        } else {

          await createSupplier(
            formData,
            token
          );

        }

        setFormData({
          name: "",
          contactPerson: "",
          phone: "",
          email: "",
          address: "",
          gstNumber: ""
        });

        setEditingId(null);

        loadSuppliers();

      } catch (error) {

        console.log(error);

      }

    };

  const handleEdit =
    (supplier) => {

      setFormData({
        name:
          supplier.name,
        contactPerson:
          supplier.contactPerson,
        phone:
          supplier.phone,
        email:
          supplier.email,
        address:
          supplier.address,
        gstNumber:
          supplier.gstNumber
      });

      setEditingId(
        supplier._id
      );

    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Supplier?"
        )
      )
        return;

      try {

        await deleteSupplier(
          id,
          token
        );

        loadSuppliers();

      } catch (error) {

        console.log(error);

      }

    };

  const filtered =
    suppliers.filter(
      (supplier) =>
        supplier.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="suppliers-page">

      <div className="suppliers-top">

        <h1>Suppliers</h1>

        <input
          type="text"
          placeholder="Search Supplier..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <form
        className="supplier-form"
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
        />

        <button type="submit">

          {
            editingId
              ? "Update Supplier"
              : "Add Supplier"
          }

        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>GST</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {
            filtered.map(
              (supplier) => (

              <tr
                key={
                  supplier._id
                }
              >

                <td>
                  {supplier.name}
                </td>

                <td>
                  {supplier.contactPerson}
                </td>

                <td>
                  {supplier.phone}
                </td>

                <td>
                  {supplier.email}
                </td>

                <td>
                  {supplier.gstNumber}
                </td>

                <td>
                  {
                    supplier.status
                      ? "Active"
                      : "Inactive"
                  }
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        supplier
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        supplier._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Suppliers;