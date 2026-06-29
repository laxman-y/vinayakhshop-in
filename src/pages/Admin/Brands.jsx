import {
  useEffect,
  useState
} from "react";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from "../../services/brandService";

import "./Brands.css";

function Brands() {

  const [brands, setBrands] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [editingId,
    setEditingId] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const token =
    localStorage.getItem("token");

  const loadBrands =
    async () => {

      try {

        const data =
          await getBrands();

        setBrands(
          data.brands || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadBrands();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await updateBrand(
            editingId,
            {
              name,
              description
            },
            token
          );

        } else {

          await createBrand(
            {
              name,
              description
            },
            token
          );

        }

        setName("");
        setDescription("");
        setEditingId(null);

        loadBrands();

      } catch (error) {

        console.log(error);

      }

    };

  const handleEdit =
    (brand) => {

      setName(
        brand.name
      );

      setDescription(
        brand.description
      );

      setEditingId(
        brand._id
      );

    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Brand?"
        )
      )
        return;

      try {

        await deleteBrand(
          id,
          token
        );

        loadBrands();

      } catch (error) {

        console.log(error);

      }

    };

  const filteredBrands =
    brands.filter(
      (brand) =>
        brand.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="brands-page">

      <div className="brands-top">

        <h1>Brands</h1>

        <input
          type="text"
          placeholder="Search Brand..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <form
        className="brand-form"
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          placeholder="Brand Name"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e)=>
            setDescription(
              e.target.value
            )
          }
        />

        <button
          type="submit"
        >
          {
            editingId
              ? "Update Brand"
              : "Add Brand"
          }
        </button>

      </form>

      <div className="table-container">

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Description</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            filteredBrands.map(
              (brand) => (

              <tr
                key={
                  brand._id
                }
              >

                <td>
                  {brand.name}
                </td>

                <td>
                  {
                    brand.description
                  }
                </td>

                <td>
                  {
                    brand.status
                      ? "Active"
                      : "Inactive"
                  }
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        brand
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        brand._id
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

    </div>

  );

}

export default Brands;