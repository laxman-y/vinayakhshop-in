import {

  useEffect,

  useMemo,

  useState

} from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

import {

  Link

} from "react-router-dom";

import axios from "axios";

import {

  Search,

  ShoppingCart,

  DollarSign,

  Package,

  TrendingUp,

  Trash2,

  Pencil,

  Filter

} from "lucide-react";

import {

  getSales,

  createSale,

  deleteSale

} from "../../services/saleService";

import DeleteModal from "../../components/DeleteModal/DeleteModal";

import "./Sales.css";

function Sales() {

  const token =

    localStorage.getItem("token");

  const [

    products,

    setProducts

  ] = useState([]);

  const [

    customers,

    setCustomers

  ] = useState([]);

  const [

    sales,

    setSales

  ] = useState([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  const [

    search,

    setSearch

  ] = useState("");

  const [

    selectedProduct,

    setSelectedProduct

  ] = useState("");

  const [

    deleteOpen,

    setDeleteOpen

  ] = useState(false);

  const [

    deleteLoading,

    setDeleteLoading

  ] = useState(false);

  const [

    selectedSale,

    setSelectedSale

  ] = useState(null);

  const [

    formData,

    setFormData

  ] = useState({

    product: "",

    customer: "",

    customerName: "",

    quantity: 1,

    discount: 0,

    gst: 18,

    paymentMethod: "Cash",

    paymentStatus: "Paid",

    invoiceNumber: "",

    remarks: ""

  });
  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const [
        salesRes,
        productsRes,
        customersRes
      ] = await Promise.all([

        getSales(),

        axios.get(
          `${BASE_URL}/api/products?page=1&limit=500`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ),

        axios.get(
          `${BASE_URL}/api/customers`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

      ]);

      setSales(

        salesRes.sales

      );

      setProducts(

        productsRes.data.products

      );

      setCustomers(

        customersRes.data.customers

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
  const selectedProductData =

    products.find(

      item =>

        item._id ===

        formData.product

    );

  const qty =

    Number(

      formData.quantity || 0

    );

  const price =

    selectedProductData

      ?.sellingPrice || 0;

  const subtotal =

    qty * price;

  const discount =

    Number(

      formData.discount || 0

    );

  const taxable =

    subtotal - discount;

  const tax =

    taxable *

    Number(

      formData.gst || 0

    ) / 100;

  const total =

    taxable + tax;

  const stats = useMemo(() => {

    let revenue = 0;

    let profit = 0;

    let qty = 0;

    sales.forEach((sale) => {

      revenue += sale.totalAmount;

      profit += sale.profit;

      qty += sale.quantity;

    });

    return {

      totalOrders: sales.length,

      revenue,

      profit,

      qty

    };

  }, [sales]);

  const filteredSales = sales.filter((sale) => {

    const keyword = search.toLowerCase();

    const matchSearch =

      sale.customerName
        ?.toLowerCase()
        .includes(keyword)

      ||

      sale.product?.name
        ?.toLowerCase()
        .includes(keyword)

      ||

      sale.invoiceNumber
        ?.toLowerCase()
        .includes(keyword);

    const matchProduct =

      selectedProduct === ""

      ||

      sale.product?._id ===

      selectedProduct;

    return matchSearch && matchProduct;

  });
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createSale(

        formData,

        token

      );

      await loadData();

      setFormData({

        product: "",

        customer: "",

        customerName: "",

        quantity: 1,

        discount: 0,

        gst: 18,

        paymentMethod: "Cash",

        paymentStatus: "Paid",

        invoiceNumber: "",

        remarks: ""

      });

    }

    catch (error) {

      console.log(error);

    }

  };
  const openDeleteModal = (sale) => {

    setSelectedSale(sale);

    setDeleteOpen(true);

  };

  const closeDeleteModal = () => {

    setDeleteOpen(false);

    setSelectedSale(null);

  };

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await deleteSale(

        selectedSale._id,

        token

      );

      await loadData();

      closeDeleteModal();

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="sales-page">

        <h2>

          Loading...

        </h2>

      </div>

    );

  }

  return (

    <div className="sales-page">

      <div className="sales-header">

        <div>

          <span className="page-tag">

            SALES MANAGEMENT

          </span>

          <h1>

            Sales Management

          </h1>

          <p>

            Manage customer sales,
            profit,
            inventory
            and invoices.

          </p>

        </div>

      </div>

      <div className="sales-stats">

        <div className="sales-card">

          <ShoppingCart size={32} />

          <h2>

            {stats.totalOrders}

          </h2>

          <span>

            Orders

          </span>

        </div>

        <div className="sales-card">

          <DollarSign size={32} />

          <h2>

            ₹{stats.revenue.toLocaleString()}

          </h2>

          <span>

            Revenue

          </span>

        </div>

        <div className="sales-card">

          <TrendingUp size={32} />

          <h2>

            ₹{stats.profit.toLocaleString()}

          </h2>

          <span>

            Profit

          </span>

        </div>

        <div className="sales-card">

          <Package size={32} />

          <h2>

            {stats.qty}

          </h2>

          <span>

            Items Sold

          </span>

        </div>

      </div>

      <div className="sales-form-card">

        <h2>

          Create Sale

        </h2>

        <form

          className="sales-form"

          onSubmit={handleSubmit}

        >

          <div className="form-grid">

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

                  products.map(

                    (product) => (

                      <option

                        key={product._id}

                        value={product._id}

                      >

                        {product.name}

                        {" "}

                        (Stock :

                        {product.stock})

                      </option>

                    )

                  )

                }

              </select>

            </div>

            <div className="form-group">

              <label>

                Customer

              </label>

              <select

                name="customer"

                value={formData.customer}

                onChange={handleChange}

              >

                <option value="">

                  Walk-in Customer

                </option>

                {

                  customers.map(

                    (customer) => (

                      <option

                        key={customer._id}

                        value={customer._id}

                      >

                        {customer.name}

                      </option>

                    )

                  )

                }

              </select>

            </div>

            <div className="form-group">

              <label>

                Customer Name

              </label>

              <input

                type="text"

                name="customerName"

                value={formData.customerName}

                onChange={handleChange}

                placeholder="Customer Name"

              />

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

                required

              />

            </div>

            <div className="form-group">

              <label>

                Discount

              </label>

              <input

                type="number"

                name="discount"

                value={formData.discount}

                onChange={handleChange}

              />

            </div>

            <div className="form-group">

              <label>

                GST %

              </label>

              <input

                type="number"

                name="gst"

                value={formData.gst}

                onChange={handleChange}

              />

            </div>

            <div className="form-group">

              <label>

                Payment Method

              </label>

              <select

                name="paymentMethod"

                value={formData.paymentMethod}

                onChange={handleChange}

              >

                <option>

                  Cash

                </option>

                <option>

                  UPI

                </option>

                <option>

                  Card

                </option>

                <option>

                  Bank

                </option>

              </select>

            </div>

            <div className="form-group">

              <label>

                Payment Status

              </label>

              <select

                name="paymentStatus"

                value={formData.paymentStatus}

                onChange={handleChange}

              >

                <option>

                  Paid

                </option>

                <option>

                  Pending

                </option>

              </select>

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

              />

            </div>

            <div className="form-group">

              <label>

                Total Amount

              </label>

              <div className="total-card">

                ₹

                {total.toLocaleString()}

              </div>

            </div>

          </div>

          <div className="remarks-section">

            <label>

              Remarks

            </label>

            <textarea

              rows="4"

              name="remarks"

              value={formData.remarks}

              onChange={handleChange}

            />

          </div>

          <div className="sales-actions">

            <button

              type="submit"

              className="sales-save-btn"

            >

              Save Sale

            </button>

          </div>

        </form>

      </div>
      <div className="sales-table-card">

        <div className="sales-toolbar">

          <div className="search-box">

            <Search size={18} />

            <input

              type="text"

              placeholder="Search customer, invoice or product..."

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

              value={selectedProduct}

              onChange={(e) =>

                setSelectedProduct(

                  e.target.value

                )

              }

            >

              <option value="">

                All Products

              </option>

              {

                products.map(

                  (product) => (

                    <option

                      key={product._id}

                      value={product._id}

                    >

                      {product.name}

                    </option>

                  )

                )

              }

            </select>

          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Invoice</th>

                <th>Customer</th>

                <th>Product</th>

                <th>Qty</th>

                <th>Total</th>

                <th>Profit</th>

                <th>Status</th>

                <th>Date</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredSales.length === 0 ?

                  (

                    <tr>

                      <td

                        colSpan="9"

                        className="empty-row"

                      >

                        No Sales Found

                      </td>

                    </tr>

                  )

                  :

                  filteredSales.map(

                    (sale) => (

                      <tr

                        key={sale._id}

                      >

                        <td>

                          {

                            sale.invoiceNumber ||

                            "-"

                          }

                        </td>

                        <td>

                          {

                            sale.customerName

                          }

                        </td>

                        <td>

                          {

                            sale.product?.name

                          }

                        </td>

                        <td>

                          {

                            sale.quantity

                          }

                        </td>

                        <td>
                          ₹{Number(sale.totalAmount || 0).toLocaleString()}
                        </td>
                        <td>
                          ₹{Number(sale.profit || 0).toLocaleString()}
                        </td>

                        <td>

                          <span

                            className={

                              sale.paymentStatus === "Paid"

                                ?

                                "badge paid"

                                :

                                "badge pending"

                            }

                          >

                            {

                              sale.paymentStatus

                            }

                          </span>

                        </td>

                        <td>

                          {

                            new Date(

                              sale.createdAt

                            ).toLocaleDateString()

                          }

                        </td>

                        <td>
                          <div className="action-buttons">

                            <Link to={`/admin/invoice/${sale._id}`}>
                              <button className="invoice-btn">
                                📄
                              </button>
                            </Link>
                            </div>

                            <div className="action-buttons">

                              <Link

                                to={`/admin/sales/edit/${sale._id}`}

                              >

                                <button

                                  className="edit-btn"

                                >

                                  <Pencil

                                    size={16}

                                  />

                                </button>

                              </Link>

                              <button

                                className="delete-btn"

                                onClick={() =>

                                  openDeleteModal(

                                    sale

                                  )

                                }

                              >

                                <Trash2

                                  size={16}

                                />

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

      </div>
      <DeleteModal

        open={deleteOpen}

        title="Delete Sale"

        message={`Delete Invoice "${selectedSale?.invoiceNumber || "Sale"}" ? This action cannot be undone.`}

        loading={deleteLoading}

        onCancel={closeDeleteModal}

        onConfirm={handleDelete}

      />

    </div>

  );

}

export default Sales;
