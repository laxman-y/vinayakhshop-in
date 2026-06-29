import { useEffect, useMemo, useState } from "react";
import { getPurchaseReport } from "../../services/reportService";
import "./PurchaseReport.css";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

function PurchaseReport() {

    const [purchases, setPurchases] = useState([]);

    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    useEffect(() => {

        loadPurchases();

    }, []);

    const loadPurchases = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await getPurchaseReport(token);

            setPurchases(data.purchases);

        } catch (err) {

            console.log(err);

        }

    };

    const filtered = useMemo(() => {

        return purchases.filter((purchase) => {

            const keyword =
                search.toLowerCase();

            const product =
                purchase.product?.name?.toLowerCase() || "";

            const supplier =
                purchase.supplier?.name?.toLowerCase() || "";

            const invoice =
                purchase.invoiceNumber?.toLowerCase() || "";

            const purchaseDate =
                new Date(purchase.createdAt);

            const from =
                fromDate ? new Date(fromDate) : null;

            const to =
                toDate ? new Date(toDate) : null;

            const dateMatch =
                (!from || purchaseDate >= from) &&
                (!to || purchaseDate <= to);

            return (

                dateMatch &&

                (

                    product.includes(keyword) ||

                    supplier.includes(keyword) ||

                    invoice.includes(keyword)

                )

            );

        });

    }, [purchases, search, fromDate, toDate]);

    const totalAmount =
        filtered.reduce(

            (sum, item) =>
                sum + item.totalAmount,

            0

        );

    return (

        <div className="purchase-report">

            <div className="sales-toolbar">

                <input

                    type="text"

                    placeholder="Search Product / Supplier / Invoice..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) =>
                        setFromDate(e.target.value)
                    }
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) =>
                        setToDate(e.target.value)
                    }
                />

                <button
                    className="refresh-btn"
                    onClick={loadPurchases}
                >
                    🔄 Refresh
                </button>

                <button
                    className="excel-btn"
                    onClick={() => {

                        const rows = filtered.map((purchase) => ({

                            Invoice: purchase.invoiceNumber,

                            Product: purchase.product?.name,

                            Supplier: purchase.supplier?.name || "-",

                            Qty: purchase.quantity,

                            Rate: `₹${purchase.purchasePrice}`,

                            Total: `₹${purchase.totalAmount}`,

                            Date: new Date(purchase.createdAt).toLocaleDateString("en-IN", {

                                day: "2-digit",

                                month: "short",

                                year: "numeric"

                            })

                        }));

                        exportToExcel(rows, "Purchase_Report");

                    }}
                >
                    📊 Excel
                </button>

                <button

                    className="pdf-btn"

                    onClick={() => {

                        const columns = [

                            "Invoice",

                            "Product",

                            "Supplier",

                            "Qty",

                            "Rate",

                            "Total",

                            "Date"

                        ];

                        const rows =

                            filtered.map((purchase) => [

                                purchase.invoiceNumber,

                                purchase.product?.name,

                                purchase.supplier?.name || "-",

                                purchase.quantity,

                                `₹${purchase.purchasePrice}`,

                                `₹${purchase.totalAmount}`,

                                new Date(
                                    purchase.createdAt
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })

                            ]);

                        exportToPDF(

                            "Purchase Report",

                            columns,

                            rows,

                            "Sales_Report"

                        );

                    }}

                >

                    📄 PDF

                </button>

                <button
                    className="print-btn"
                    onClick={() => window.print()}
                >
                    🖨 Print
                </button>

            </div>

            <div className="sales-summary">

                <div>

                    <h4>📦 Purchases</h4>

                    <h2>

                        {filtered.length}

                    </h2>

                </div>

                <div>

                    <h4>💰 Total Cost</h4>

                    <h2>

                        ₹{totalAmount.toLocaleString()}

                    </h2>

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Invoice</th>

                            <th>Product</th>

                            <th>Supplier</th>

                            <th>Qty</th>

                            <th>Rate</th>

                            <th>Total</th>

                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length > 0 ?

                                filtered.map((purchase) => (

                                    <tr key={purchase._id}>

                                        <td>

                                            {purchase.invoiceNumber}

                                        </td>

                                        <td>

                                            {purchase.product?.name}

                                        </td>

                                        <td>

                                            {purchase.supplier?.name || "-"}

                                        </td>

                                        <td>

                                            {purchase.quantity}

                                        </td>

                                        <td>

                                            ₹{purchase.purchasePrice}

                                        </td>

                                        <td>

                                            ₹{purchase.totalAmount}

                                        </td>

                                        <td>

                                            {

                                                new Date(
                                                    purchase.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty-table"
                                    >

                                        No Purchase Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PurchaseReport;