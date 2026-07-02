import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Wallet,
  Package,
  Truck,
  Plus,
  Filter
} from "lucide-react";

import DeleteModal from "../../components/DeleteModal/DeleteModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

import {

  Link

} from "react-router-dom";

import axios from "axios";

import {
  deletePurchase,
  createPurchase,
  getPurchases
} from "../../services/purchaseService";

import "./Purchases.css";

function Purchases() {

  const token =
    localStorage.getItem("token");

  const today = new Date().toISOString().split("T")[0];

  const [products, setProducts] =
    useState([]);

  const [suppliers, setSuppliers] =
    useState([]);

  const [purchases, setPurchases] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [supplierFilter,
    setSupplierFilter] =
    useState("");

  const [

    deleteOpen,

    setDeleteOpen

  ] = useState(false);

  const [

    deleteLoading,

    setDeleteLoading

  ] = useState(false);

  const [

    selectedPurchase,

    setSelectedPurchase

  ] = useState(null);

  const [productFilter,
    setProductFilter] =
    useState("");

  const [formData,
    setFormData] =
    useState({

      product: "",

      supplier: "",

      quantity: "",

      purchasePrice: "",

      purchaseDate: today,

      invoiceNumber: "",

      remarks: ""

    });

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const [

        productRes,

        supplierRes,

        purchaseRes

      ] = await Promise.all([

        axios.get(
          `${BASE_URL}/api/products?page=1&limit=500`
        ),

        axios.get(
          `${BASE_URL}/api/suppliers`
        ),

        getPurchases()

      ]);

      setProducts(

        productRes.data.products || []

      );

      setSuppliers(

        supplierRes.data.suppliers || []

      );

      setPurchases(

        purchaseRes.purchases || []

      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:

        e.target.value

    });

  };

  const totalAmount =

    Number(formData.quantity || 0)

    *

    Number(formData.purchasePrice || 0);

  const dashboard = useMemo(() => {

    const today = new Date();

    let todayCount = 0;

    let monthlyAmount = 0;

    purchases.forEach((purchase) => {

      const date =
        new Date(
          purchase.purchaseDate
        );

      if (

        date.toDateString()

        ===

        today.toDateString()

      ) {

        todayCount++;

      }

      if (

        date.getMonth()

        ===

        today.getMonth()

        &&

        date.getFullYear()

        ===

        today.getFullYear()

      ) {

        monthlyAmount +=

          purchase.totalAmount;

      }

    });

    return {

      totalPurchases:

        purchases.length,

      todayPurchases:

        todayCount,

      monthlySpend:

        monthlyAmount,

      suppliers:

        suppliers.length

    };

  }, [

    purchases,

    suppliers

  ]);

  const filteredPurchases = purchases.filter(

    (purchase) => {

      const matchesSearch =

        purchase.product?.name

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

        ||

        purchase.invoiceNumber

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          );

      const matchesSupplier =

        supplierFilter

          ?

          purchase.supplier?._id

          ===

          supplierFilter

          :

          true;

      const matchesProduct =

        productFilter

          ?

          purchase.product?._id

          ===

          productFilter

          :

          true;

      return (

        matchesSearch

        &&

        matchesSupplier

        &&

        matchesProduct

      );

    }

  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createPurchase(

        formData,

        token

      );

      alert(

        "Purchase Added Successfully"

      );

      setFormData({

        product: "",

        supplier: "",

        quantity: "",

        purchasePrice: "",

        purchaseDate: today,

        invoiceNumber: "",

        remarks: ""

      });

      loadData();

    }

    catch (error) {

      console.log(error);

    }

  };


  const openDeleteModal = (

    purchase

  ) => {

    setSelectedPurchase(

      purchase

    );

    setDeleteOpen(true);

  };

  const closeDeleteModal = () => {

    setDeleteOpen(false);

    setSelectedPurchase(null);

  };

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await deletePurchase(

        selectedPurchase._id,

        token

      );

      setPurchases(

        prev =>

          prev.filter(

            item =>

              item._id

              !==

              selectedPurchase._id

          )

      );

      closeDeleteModal();

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setDeleteLoading(false);

    }

  };




  return (

    <div className="purchase-page">

      <div className="purchase-header">

        <div>

          <span className="page-tag">

            PURCHASE MANAGEMENT

          </span>

          <h1>

            Purchases

          </h1>

          <p>

            Manage supplier purchases,
            increase inventory automatically
            and monitor purchase history.

          </p>

        </div>

      </div>

      <div className="purchase-stats">

        <div className="purchase-card">

          <ShoppingCart size={34} />

          <h2>

            {dashboard.todayPurchases}

          </h2>

          <span>

            Today's Purchases

          </span>

        </div>

        <div className="purchase-card">

          <Wallet size={34} />

          <h2>

            ₹{dashboard.monthlySpend}

          </h2>

          <span>

            Monthly Spend

          </span>

        </div>

        <div className="purchase-card">

          <Package size={34} />

          <h2>

            {dashboard.totalPurchases}

          </h2>

          <span>

            Total Purchases

          </span>

        </div>

        <div className="purchase-card">

          <Truck size={34} />

          <h2>

            {dashboard.suppliers}

          </h2>

          <span>

            Suppliers

          </span>

        </div>

      </div>

      <div className="purchase-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search purchase..."

            value={search}

            onChange={(e) =>

              setSearch(

                e.target.value

              )

            }

          />

        </div>

        <div className="filter-box">

          <Filter size={18} />

          <select

            value={supplierFilter}

            onChange={(e) =>

              setSupplierFilter(

                e.target.value

              )

            }

          >

            <option value="">

              All Suppliers

            </option>

            {

              suppliers.map((supplier) => (

                <option

                  key={supplier._id}

                  value={supplier._id}

                >

                  {supplier.name}

                </option>

              ))

            }

          </select>

          <select

            value={productFilter}

            onChange={(e) =>

              setProductFilter(

                e.target.value

              )

            }

          >

            <option value="">

              All Products

            </option>

            {

              products.map((product) => (

                <option

                  key={product._id}

                  value={product._id}

                >

                  {product.name}

                </option>

              ))

            }

          </select>

        </div>

      </div>

      <div className="purchase-form-card">

        <div className="section-header">

          <Plus size={22} />

          <h2>

            Add New Purchase

          </h2>

        </div>

        <form

          className="purchase-form"

          onSubmit={handleSubmit}

        >

          <div className="form-grid">

            <div className="form-group">

              <label>

                Purchase Date

              </label>

              <input

                type="date"

                name="purchaseDate"

                value={formData.purchaseDate}

                onChange={handleChange}

                required

              />

            </div>

            <div className="form-group">

              <label>

                Product

              </label>

              <select

                name="product"

                value={formData.product}

                onChange={handleChange}

                required

              >

                <option value="">

                  Select Product

                </option>

                {

                  products.map((product) => (

                    <option

                      key={product._id}

                      value={product._id}

                    >

                      {product.name}

                    </option>

                  ))

                }

              </select>

            </div>

            <div className="form-group">

              <label>

                Supplier

              </label>

              <select

                name="supplier"

                value={formData.supplier}

                onChange={handleChange}

                required

              >

                <option value="">

                  Select Supplier

                </option>

                {

                  suppliers.map((supplier) => (

                    <option

                      key={supplier._id}

                      value={supplier._id}

                    >

                      {supplier.name}

                    </option>

                  ))

                }

              </select>

            </div>

            <div className="form-group">

              <label>

                Quantity

              </label>

              <input

                type="number"

                min="1"

                name="quantity"

                value={formData.quantity}

                onChange={handleChange}

                placeholder="Enter Quantity"

                required

              />

            </div>

            <div className="form-group">

              <label>

                Purchase Price

              </label>

              <input

                type="number"

                min="1"

                name="purchasePrice"

                value={formData.purchasePrice}

                onChange={handleChange}

                placeholder="Purchase Price"

                required

              />

            </div>

            <div className="form-group">

              <label>

                Invoice Number

              </label>

              <input

                type="text"

                name="invoiceNumber"

                value={formData.invoiceNumber}

                onChange={handleChange}

                placeholder="INV-0001"

              />

            </div>

            <div className="form-group">

              <label>

                Total Amount

              </label>

              <div className="total-card">

                ₹{totalAmount.toLocaleString()}

              </div>

            </div>

          </div>

          <div className="remarks-section">

            <label>

              Remarks

            </label>

            <textarea

              rows="5"

              name="remarks"

              value={formData.remarks}

              onChange={handleChange}

              placeholder="Write purchase remarks..."

            />

          </div>

          <div className="purchase-actions">

            <button

              type="submit"

              className="purchase-save-btn"

            >

              Save Purchase

            </button>

          </div>

        </form>

      </div>

      <div className="purchase-table-card">

        <div className="section-header">

          <Package size={22} />

          <h2>

            Recent Purchases

          </h2>

        </div>

        {

          loading ?

            (

              <div className="table-loading">

                Loading Purchases...

              </div>

            )

            :

            filteredPurchases.length === 0 ?

              (

                <div className="empty-state">

                  <Package size={65} />

                  <h3>

                    No Purchases Found

                  </h3>

                  <p>

                    No purchase records match your search.

                  </p>

                </div>

              )

              :

              (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>

                        <th>Product</th>

                        <th>Supplier</th>

                        <th>Qty</th>

                        <th>Rate</th>

                        <th>Total</th>

                        <th>Invoice</th>

                        <th>Date</th>

                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredPurchases.map(

                          (purchase) => (

                            <tr

                              key={purchase._id}

                            >

                              <td>

                                {

                                  purchase.product

                                    ?.name

                                }

                              </td>

                              <td>

                                {

                                  purchase.supplier

                                    ?.name

                                }

                              </td>

                              <td>

                                {

                                  purchase.quantity

                                }

                              </td>

                              <td>

                                ₹

                                {

                                  purchase.purchasePrice

                                }

                              </td>

                              <td>

                                ₹

                                {

                                  purchase.totalAmount

                                }

                              </td>

                              <td>

                                {

                                  purchase.invoiceNumber ||

                                  "-"

                                }

                              </td>

                              <td>

                                {

                                  new Date(
                                    purchase.purchaseDate
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )

                                }

                              </td>

                              <td>

                                <div className="action-buttons">

                                  <Link
                                    to={`/admin/purchases/edit/${purchase._id}`}
                                  >

                                    <button
                                      className="edit-btn"
                                    >

                                      Edit

                                    </button>

                                  </Link>

                                  <button

                                    className="delete-btn"

                                    onClick={() =>

                                      openDeleteModal(

                                        purchase

                                      )

                                    }

                                  >

                                    Delete

                                  </button>

                                </div>

                              </td>

                            </tr>

                          )

                        )

                      }

                    </tbody>

                  </table>

                </div>

              )

        }

      </div>

      <DeleteModal

        open={deleteOpen}

        title="Delete Purchase"

        message={`Delete invoice "${selectedPurchase?.invoiceNumber || "Purchase"}" ? This action cannot be undone.`}

        loading={deleteLoading}

        onCancel={closeDeleteModal}

        onConfirm={handleDelete}

      />

    </div>

  );

}

export default Purchases;
