import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  Pencil,
  Trash2
} from "lucide-react";

import {
  getProducts,
  deleteProduct
} from "../../services/productService";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [brandFilter, setBrandFilter] = useState("all");

  const [stockFilter, setStockFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const token = localStorage.getItem("token");

      const data = await getProducts(token);

      setProducts(data.products || []);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };


  const openDeleteModal = (product) => {

    setSelectedProduct(product);

    setDeleteOpen(true);

  };

  const closeDeleteModal = () => {

    setDeleteOpen(false);

    setSelectedProduct(null);

  };

  const handleDelete = async () => {

    if (!selectedProduct) return;

    try {

      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await deleteProduct(

        selectedProduct._id,

        token

      );

      setProducts((prev) =>

        prev.filter(

          (item) =>

            item._id !== selectedProduct._id

        )

      );

      closeDeleteModal();

    }

    catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

    finally {

      setDeleteLoading(false);

    }

  };

  const categories = [

    ...new Set(

      products

        .map(product => product.category?.name)

        .filter(Boolean)

    )

  ];

  const brands = [

    ...new Set(

      products

        .map(product => product.brand?.name)

        .filter(Boolean)

    )

  ];


  const filteredProducts = useMemo(() => {

    return products.filter(product => {

      const searchMatch =

        product.name

          ?.toLowerCase()

          .includes(search.toLowerCase());

      const categoryMatch =

        categoryFilter === "all"

        ||

        product.category?.name === categoryFilter;

      const brandMatch =

        brandFilter === "all"

        ||

        product.brand?.name === brandFilter;

      const stockMatch =

        stockFilter === "all"

        ||

        (

          stockFilter === "instock"

          &&

          product.stock > 5

        )

        ||

        (

          stockFilter === "low"

          &&

          product.stock > 0

          &&

          product.stock <= 5

        )

        ||

        (

          stockFilter === "out"

          &&

          product.stock === 0

        );

      return (

        searchMatch

        &&

        categoryMatch

        &&

        brandMatch

        &&

        stockMatch

      );

    });

  }, [

    products,

    search,

    categoryFilter,

    brandFilter,

    stockFilter

  ]);

  const lowStock = products.filter(

    product => product.stock > 0 && product.stock <= 5

  ).length;

  const outOfStock = products.filter(

    product => product.stock === 0

  ).length;

  return (

    <div className="products-page">

      {/* Header */}

      <div className="products-header">

        <div>

          <span className="page-tag">

            INVENTORY

          </span>

          <h1>

            Products Management

          </h1>

          <p>

            Manage all products available in your hardware inventory.

          </p>

        </div>

        <Link to="/admin/products/add">

          <button className="add-btn">

            <Plus size={20} />

            Add Product

          </button>

        </Link>

      </div>

      {/* Statistics */}

      <div className="product-stats">

        <div className="stat-card">

          <Package size={30} />

          <div>

            <h2>

              {products.length}

            </h2>

            <span>

              Total Products

            </span>

          </div>

        </div>

        <div className="stat-card">

          <Boxes size={30} />

          <div>

            <h2>

              {lowStock}

            </h2>

            <span>

              Low Stock

            </span>

          </div>

        </div>

        <div className="stat-card danger">

          <AlertTriangle size={30} />

          <div>

            <h2>

              {outOfStock}

            </h2>

            <span>

              Out of Stock

            </span>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="search-bar">

        <Search size={20} />

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />

      </div>

      <div className="filter-bar">

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >

          <option value="all">

            All Categories

          </option>

          {

            categories.map(category => (

              <option

                key={category}

                value={category}

              >

                {category}

              </option>

            ))

          }

        </select>

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >

          <option value="all">

            All Brands

          </option>

          {

            brands.map(brand => (

              <option

                key={brand}

                value={brand}

              >

                {brand}

              </option>

            ))

          }

        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >

          <option value="all">

            All Stock

          </option>

          <option value="instock">

            In Stock

          </option>

          <option value="low">

            Low Stock

          </option>

          <option value="out">

            Out of Stock

          </option>

        </select>

      </div>





      {/* Table */}

      <div className="table-card">

        {

          loading ?

            (

              <div className="loading">

                Loading Products...

              </div>

            )

            :

            filteredProducts.length === 0 ?

              (

                <div className="empty-state">

                  <XCircle size={55} />

                  <h3>

                    No Products Found

                  </h3>

                  <p>

                    Try another search or add a new product.

                  </p>

                </div>

              )

              :

              (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>

                        <th>Image</th>

                        <th>Product</th>

                        <th>Category</th>

                        <th>Brand</th>

                        <th>Stock</th>

                        <th>Price</th>

                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredProducts.map(product => (

                          <tr key={product._id}>

                            <td>

                              {

                                product.images?.length > 0 ?

                                  (

                                    <img

                                      src={product.images[0].url}

                                      alt={product.name}

                                      className="product-image"

                                    />

                                  )

                                  :

                                  (

                                    <div className="no-image">

                                      N/A

                                    </div>

                                  )

                              }

                            </td>

                            <td>

                              <strong>

                                {product.name}

                              </strong>

                            </td>

                            <td>

                              {product.category?.name}

                            </td>

                            <td>

                              {product.brand?.name || "-"}

                            </td>

                            <td>

                              <span

                                className={

                                  product.stock === 0

                                    ?

                                    "stock-badge danger"

                                    :

                                    product.stock <= 5

                                      ?

                                      "stock-badge warning"

                                      :

                                      "stock-badge success"

                                }

                              >

                                {product.stock}

                              </span>

                            </td>

                            <td className="price">

                              ₹{product.sellingPrice}

                            </td>

                            <td>

                              <div className="action-buttons">

                                <Link to={`/admin/products/edit/${product._id}`}>

                                  <button className="edit-btn">

                                    <Pencil size={18} />

                                  </button>

                                </Link>

                                <button

                                  className="delete-btn"

                                  onClick={() =>

                                    openDeleteModal(product)

                                  }

                                >

                                  <Trash2 size={18} />

                                </button>

                              </div>

                            </td>

                          </tr>

                        ))

                      }

                    </tbody>

                  </table>

                </div>

              )

        }

      </div>

      <DeleteModal

        open={deleteOpen}

        title="Delete Product"

        message={`Are you sure you want to delete "${selectedProduct?.name}" ? This action cannot be undone.`}

        loading={deleteLoading}

        onCancel={closeDeleteModal}

        onConfirm={handleDelete}

      />

    </div>

  );

}

export default Products;