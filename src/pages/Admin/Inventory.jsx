import {
  useEffect,
  useMemo,
  useState
} from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Package,
  AlertTriangle,
  Archive,
  IndianRupee,
  Pencil
} from "lucide-react";

import { getInventory } from "../../services/inventoryService";

import "./Inventory.css";

function Inventory() {

  const [loading, setLoading] = useState(true);

  const [inventory, setInventory] = useState([]);

  const [stats, setStats] = useState({});

  const [search, setSearch] = useState("");

  const [stockFilter, setStockFilter] = useState("All");

  useEffect(() => {

    loadInventory();

  }, []);

  const loadInventory = async () => {

    try {

      const res = await getInventory();

      setInventory(res.products);

      setStats(res.stats);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };
  const filteredInventory = useMemo(() => {

    return inventory.filter((item) => {

      const keyword = search.toLowerCase();

      const matchesSearch =

        item.name.toLowerCase().includes(keyword)

        ||

        item.sku.toLowerCase().includes(keyword)

        ||

        item.category?.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        item.brand?.name
          ?.toLowerCase()
          .includes(keyword);

      let matchesStatus = true;

      if (stockFilter === "In Stock") {

        matchesStatus =
          item.stock >
          item.lowStockAlert;

      }

      if (stockFilter === "Low Stock") {

        matchesStatus =
          item.stock > 0 &&

          item.stock <=
          item.lowStockAlert;

      }

      if (stockFilter === "Out Of Stock") {

        matchesStatus =
          item.stock === 0;

      }

      return matchesSearch && matchesStatus;

    });

  }, [

    inventory,

    search,

    stockFilter

  ]);
  if (loading) {

    return (

      <div className="inventory-page">

        <h2>

          Loading Inventory...

        </h2>

      </div>

    );

  }
  return (

    <div className="inventory-page">

      <div className="inventory-header">

        <div>

          <span className="page-tag">

            INVENTORY MANAGEMENT

          </span>

          <h1>

            Inventory Management

          </h1>

          <p>

            Monitor stock levels, inventory value, low stock products and warehouse status.

          </p>

        </div>

      </div>

      <div className="inventory-stats">

        <div className="inventory-card">

          <Package size={32} />

          <h2>

            {stats.totalProducts || 0}

          </h2>

          <span>

            Total Products

          </span>

        </div>

        <div className="inventory-card">

          <Archive size={32} />

          <h2>

            {stats.totalStock || 0}

          </h2>

          <span>

            Total Stock

          </span>

        </div>

        <div className="inventory-card">

          <IndianRupee size={32} />

          <h2>

            ₹{Number(stats.totalInventoryValue || 0).toLocaleString()}

          </h2>

          <span>

            Inventory Value

          </span>

        </div>

        <div className="inventory-card">

          <AlertTriangle size={32} />

          <h2>

            {stats.lowStock || 0}

          </h2>

          <span>

            Low Stock

          </span>

        </div>

      </div>
      <div className="inventory-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search Product, SKU, Brand or Category..."

            value={search}

            onChange={(e) =>

              setSearch(

                e.target.value

              )

            }

          />

        </div>

        <div className="filter-box">

          <select

            value={stockFilter}

            onChange={(e) =>

              setStockFilter(

                e.target.value

              )

            }

          >

            <option>

              All

            </option>

            <option>

              In Stock

            </option>

            <option>

              Low Stock

            </option>

            <option>

              Out Of Stock

            </option>

          </select>

        </div>

      </div>
      <div className="inventory-table-card">

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Image</th>

                <th>Product</th>

                <th>SKU</th>

                <th>Category</th>

                <th>Brand</th>

                <th>Purchase</th>

                <th>Selling</th>

                <th>Stock</th>

                <th>Value</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredInventory.length === 0 ?

                  (

                    <tr>

                      <td

                       colSpan="11"

                        className="empty-row"

                      >

                        No Products Found

                      </td>

                    </tr>

                  )

                  :

                  filteredInventory.map(

                    (product) => {

                      const stockValue =

                        product.purchasePrice *

                        product.stock;

                      let status = "In Stock";

                      let statusClass = "in-stock";

                      if (product.stock === 0) {

                        status = "Out Of Stock";

                        statusClass = "out-stock";

                      }

                      else if (

                        product.stock <=

                        product.lowStockAlert

                      ) {

                        status = "Low Stock";

                        statusClass = "low-stock";

                      }

                      return (

                        <tr key={product._id}>

                          <td>

                            {

                              product.images?.length > 0 ?

                                (

                                  <img

                                    src={product.images[0].url}

                                    alt={product.name}

                                    className="inventory-image"

                                  />

                                )

                                :

                                (

                                  <div className="no-image">

                                    No Image

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

                            {product.sku}

                          </td>

                          <td>

                            {product.category?.name || "-"}

                          </td>

                          <td>

                            {product.brand?.name || "-"}

                          </td>

                          <td>

                            ₹{Number(product.purchasePrice).toLocaleString()}

                          </td>

                          <td>

                            ₹{Number(product.sellingPrice).toLocaleString()}

                          </td>

                          <td>

                            {product.stock}

                          </td>

                          <td>

                            ₹{Number(stockValue).toLocaleString()}

                          </td>

                          <td>

                            <span className={`status-badge ${statusClass}`}>

                              {status}

                            </span>

                          </td>
                          <td>

                            <Link

                              to={`/admin/products/edit/${product._id}`}

                            >

                              <button className="edit-btn">

                                <Pencil size={16} />

                              </button>

                            </Link>

                          </td>

                        </tr>

                      );

                    }

                  )

              }

            </tbody>

          </table>

        </div>

      </div>
      <div className="inventory-card">

        <Package size={32} />

        <h2>

          {stats.inStock || 0}

        </h2>

        <span>

          In Stock

        </span>

      </div>

      <div className="inventory-card">

        <AlertTriangle size={32} />

        <h2>

          {stats.outOfStock || 0}

        </h2>

        <span>

          Out Of Stock

        </span>

      </div>

    </div>
  );
}

export default Inventory;

