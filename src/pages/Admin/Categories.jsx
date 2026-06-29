import {
  useEffect,
  useState
} from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
from "../../services/categoryService";

import "./Categories.css";

function Categories() {

  const [categories, setCategories] =
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

  const loadCategories =
    async () => {

      try {

        const data =
          await getCategories(token);

        setCategories(
          data.categories || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadCategories();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await updateCategory(
            editingId,
            {
              name,
              description
            },
            token
          );

          alert(
            "Category Updated"
          );

        } else {

          await createCategory(
            {
              name,
              description
            },
            token
          );

          alert(
            "Category Added"
          );

        }

        setName("");
        setDescription("");
        setEditingId(null);

        loadCategories();

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      }

    };

  const handleEdit =
    (category) => {

      setName(category.name);

      setDescription(
        category.description
      );

      setEditingId(
        category._id
      );

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete category?"
        );

      if (!confirmDelete)
        return;

      await deleteCategory(
        id,
        token
      );

      loadCategories();

    };

  const filteredCategories =
    categories.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="categories-page">

      <div className="category-top">

        <h1>
          Categories
        </h1>

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <form
        className="category-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Category Name"
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

        <button type="submit">

          {editingId
            ? "Update"
            : "Add Category"}

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

          {filteredCategories.map(
            (category) => (

            <tr
              key={category._id}
            >

              <td>
                {category.name}
              </td>

              <td>
                {category.description}
              </td>

              <td>

                {category.status
                  ? "Active"
                  : "Inactive"}

              </td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(
                      category
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      category._id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
      </div>

    </div>

  );

}

export default Categories;