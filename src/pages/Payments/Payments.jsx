import { useEffect, useMemo, useState } from "react";
import {
    getPayments,
    deletePayment,
    createPayment,
    getCustomers,
    getSales
} from "../../services/paymentService";

import "./Payments.css";

function Payments() {

    const token =
        localStorage.getItem("token");

    const [payments, setPayments] =
        useState([]);
    const [customers, setCustomers] = useState([]);

    const [sales, setSales] = useState([]);

    const [selectedSale, setSelectedSale] = useState(null);

    const [formData, setFormData] = useState({

        customer: "",

        sale: "",

        paidAmount: "",

        paymentMethod: "Cash",

        remarks: ""

    });

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            const [

                paymentRes,

                customerRes,

                salesRes

            ] = await Promise.all([

                getPayments(token),

                getCustomers(token),

                getSales(token)

            ]);

            setPayments(
                paymentRes.payments || []
            );

            setCustomers(
                customerRes.customers || []
            );

            setSales(
                salesRes.sales || []
            );

        } catch (err) {

            console.log(err);

        }

    };


    const handleInput = (e) => {

        const {

            name,

            value

        } = e.target;

        if (name === "customer") {

            setFormData({

                ...formData,

                customer: value,

                sale: ""

            });

            setSelectedSale(null);

            return;

        }

        if (name === "sale") {

            const sale = sales.find(

                s => s._id === value

            );

            setSelectedSale(sale);

        }

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSavePayment = async (e) => {

        e.preventDefault();

        try {

            await createPayment(

                formData,

                token

            );

            alert("Payment Saved");

            setFormData({

                customer: "",

                sale: "",

                paidAmount: "",

                paymentMethod: "Cash",

                remarks: ""

            });

            setSelectedSale(null);

            loadPayments();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to Save"

            );

        }

    };

    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this payment?"
                )
            ) return;

            try {

                await deletePayment(
                    id,
                    token
                );

                loadPayments();

            } catch (err) {

                console.log(err);

            }

        };

    const filteredPayments =
        useMemo(() => {

            return payments.filter((item) => {

                const customer =
                    item.customer?.name || "";

                const invoice =
                    item.invoiceNumber || "";

                const searchMatch =

                    customer
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    invoice
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const statusMatch =

                    statusFilter === "All"

                    ||

                    item.status ===
                    statusFilter;

                return (
                    searchMatch &&
                    statusMatch
                );

            });

        }, [
            payments,
            search,
            statusFilter
        ]);

    const stats =
        useMemo(() => {

            let total = 0;

            let paid = 0;

            let due = 0;

            let partial = 0;

            filteredPayments.forEach(p => {

                total +=
                    p.paidAmount;

                due +=
                    p.dueAmount;

                if (
                    p.status === "Paid"
                )
                    paid++;

                if (
                    p.status === "Partial"
                )
                    partial++;

            });

            return {

                total,

                due,

                paid,

                partial

            };

        }, [filteredPayments]);

    return (

        <div className="payments-page">

            <h1>Payment Management</h1>



            <div className="payment-form-card">

                <h2>Add New Payment</h2>

                <form
                    className="payment-form"
                    onSubmit={handleSavePayment}
                >

                    <div className="form-grid">

                        <div className="form-group">

                            <label>

                                Customer

                            </label>

                            <select
                                name="customer"
                                value={formData.customer}
                                onChange={handleInput}
                                required
                            >

                                <option value="">

                                    Select Customer

                                </option>

                                {

                                    customers.map(customer => (

                                        <option
                                            key={customer._id}
                                            value={customer._id}
                                        >

                                            {customer.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Invoice

                            </label>

                            <select
                                name="sale"
                                value={formData.sale}
                                onChange={handleInput}
                                required
                            >

                                <option value="">

                                    Select Invoice

                                </option>

                                {

                                    sales

                                        .filter(

                                            sale =>

                                                sale.customer?._id === formData.customer

                                        )

                                        .map(sale => (

                                            <option
                                                key={sale._id}
                                                value={sale._id}
                                            >

                                                {sale.invoiceNumber}

                                            </option>

                                        ))

                                }

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Paid Amount

                            </label>

                            <input
                                type="number"
                                name="paidAmount"
                                value={formData.paidAmount}
                                onChange={handleInput}
                                placeholder="Enter Amount"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Payment Method

                            </label>

                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInput}
                            >

                                <option>Cash</option>

                                <option>UPI</option>

                                <option>Card</option>

                                <option>Bank Transfer</option>

                                <option>Cheque</option>

                            </select>

                        </div>

                    </div>

                    {

                        selectedSale && (

                            <div className="invoice-summary">

                                <h3>

                                    Invoice Summary

                                </h3>

                                <div className="summary-grid">

                                    <div>

                                        <span>Invoice</span>

                                        <strong>

                                            {selectedSale.invoiceNumber}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>Customer</span>

                                        <strong>

                                            {selectedSale.customerName}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>Total</span>

                                        <strong>

                                            ₹{selectedSale.totalAmount.toLocaleString()}

                                        </strong>

                                    </div>

                                    <div>

                                        <span>Profit</span>

                                        <strong className="profit">

                                            ₹{selectedSale.profit.toLocaleString()}

                                        </strong>

                                    </div>

                                </div>

                            </div>

                        )

                    }

                    <div className="form-group full-width">

                        <label>

                            Remarks

                        </label>

                        <textarea

                            rows="3"

                            name="remarks"

                            value={formData.remarks}

                            onChange={handleInput}

                            placeholder="Payment Notes"

                        ></textarea>

                    </div>

                    <button
                        className="save-payment-btn"
                        type="submit"
                    >

                        💰 Save Payment

                    </button>

                </form>

            </div>








            {/* ==========================
          DASHBOARD CARDS
      =========================== */}

            <div className="payment-cards">

                <div className="payment-card">

                    <h3>Total Collection</h3>

                    <h2>
                        Rs. {stats.total.toLocaleString()}
                    </h2>

                </div>

                <div className="payment-card">

                    <h3>Total Due</h3>

                    <h2>
                        Rs. {stats.due.toLocaleString()}
                    </h2>

                </div>

                <div className="payment-card">

                    <h3>Paid Invoices</h3>

                    <h2>{stats.paid}</h2>

                </div>

                <div className="payment-card">

                    <h3>Partial Payments</h3>

                    <h2>{stats.partial}</h2>

                </div>

            </div>

            {/* ==========================
          SEARCH & FILTER
      =========================== */}

            <div className="payment-toolbar">

                <input

                    type="text"

                    placeholder="Search Customer / Invoice"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

                <select

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }

                >

                    <option>All</option>

                    <option>Paid</option>

                    <option>Partial</option>

                    <option>Due</option>

                </select>

            </div>

            {/* ==========================
          TABLE
      =========================== */}

            <div className="payment-table-container">

                <table className="payment-table">

                    <thead>

                        <tr>

                            <th>Invoice</th>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Paid</th>

                            <th>Due</th>

                            <th>Method</th>

                            <th>Status</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredPayments.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px"
                                            }}
                                        >

                                            No Payments Found

                                        </td>

                                    </tr>

                                )

                                :

                                filteredPayments.map(payment => (

                                    <tr
                                        key={payment._id}
                                    >

                                        <td>

                                            {payment.invoiceNumber}

                                        </td>

                                        <td>

                                            {payment.customer?.name}

                                        </td>

                                        <td>

                                            Rs. {payment.totalAmount.toLocaleString()}

                                        </td>

                                        <td>

                                            Rs. {payment.paidAmount.toLocaleString()}

                                        </td>

                                        <td>

                                            Rs. {payment.dueAmount.toLocaleString()}

                                        </td>

                                        <td>

                                            {payment.paymentMethod}

                                        </td>

                                        <td>

                                            <span
                                                className={`status ${payment.status.toLowerCase()}`}
                                            >

                                                {payment.status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                new Date(
                                                    payment.paymentDate
                                                ).toLocaleDateString()

                                            }

                                        </td>

                                        <td>

                                            <button

                                                className="delete-btn"

                                                onClick={() =>

                                                    handleDelete(
                                                        payment._id
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

export default Payments;