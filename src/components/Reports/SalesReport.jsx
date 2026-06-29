import { useEffect, useMemo, useState } from "react";
import { getSalesReport } from "../../services/reportService";
import "./SalesReport.css";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

function SalesReport() {

    const [sales, setSales] = useState([]);

    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    useEffect(() => {

        loadSales();

    }, []);

    const loadSales = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await getSalesReport(token);

            setSales(data.sales);

        } catch (err) {

            console.log(err);

        }

    };

    const filteredSales = useMemo(() => {

        return sales.filter((sale) => {

            const keyword =
                search.toLowerCase();

            const product =
                sale.product?.name?.toLowerCase() || "";

            const customer =
                sale.customerName?.toLowerCase() || "";

            const invoice =
                sale.invoiceNumber?.toLowerCase() || "";

            const saleDate =
                new Date(sale.createdAt);

            const from =
                fromDate
                    ? new Date(fromDate)
                    : null;

            const to =
                toDate
                    ? new Date(toDate)
                    : null;

            const dateMatch =
                (!from || saleDate >= from) &&
                (!to || saleDate <= to);

            return (

                dateMatch &&

                (

                    product.includes(keyword) ||

                    customer.includes(keyword) ||

                    invoice.includes(keyword)

                )

            );

        });

    }, [sales, search, fromDate, toDate]);

    const totalRevenue =
        filteredSales.reduce(

            (sum, sale) =>
                sum + sale.totalAmount,

            0

        );

    const totalProfit =
        filteredSales.reduce(

            (sum, sale) =>
                sum + (sale.profit || 0),

            0

        );

    return (

        <div className="sales-report">

            <div className="sales-toolbar">

                <input
                    type="text"
                    placeholder="Search Product / Customer / Invoice..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <input
                    type="date"
                    title="From Date"
                    value={fromDate}
                    onChange={(e) =>
                        setFromDate(e.target.value)
                    }
                />

                <input
                    type="date"
                    title="To Date"
                    value={toDate}
                    onChange={(e) =>
                        setToDate(e.target.value)
                    }
                />

                <button
                    className="refresh-btn"
                    onClick={loadSales}
                >

                    🔄 Refresh

                </button>

                <button

                    className="excel-btn"

                    onClick={() => {

                        const rows =

                            filteredSales.map(

                                sale => ({

                                    Invoice:

                                        sale.invoiceNumber,

                                    Product:

                                        sale.product?.name,

                                    Customer:

                                        sale.customerName,

                                    Quantity:

                                        sale.quantity,

                                    Price:

                                        sale.sellingPrice,

                                    Total:

                                        sale.totalAmount,

                                    Profit:

                                        sale.profit,

                                    Date:

                                        new Date(

                                            sale.createdAt

                                        ).toLocaleDateString()

                                })

                            );

                        exportToExcel(

                            rows,

                            "Sales_Report"

                        );

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

                            "Customer",

                            "Qty",

                            "Price",

                            "Total",

                            "Profit",

                            "Date"

                        ];

                        const rows =

                            filteredSales.map((sale) => [

                                sale.invoiceNumber,

                                sale.product?.name,

                                sale.customerName,

                                sale.quantity,

                                sale.sellingPrice,

                                sale.totalAmount,

                                sale.profit,

                                new Date(
                                    sale.createdAt
                                ).toLocaleDateString()

                            ]);

                        exportToPDF(

                            "Sales Report",

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
                    <h4>

                        📄 Invoices

                    </h4>

                    <h2>

                        {filteredSales.length}

                    </h2>
                </div>

                <div>

                    <h4>
                        💰 Revenue
                    </h4>

                    <h2>

                        ₹{totalRevenue.toLocaleString()}

                    </h2>

                </div>

                <div>

                    <h4>

                        📈 Profit

                    </h4>

                    <h2 className="profit">

                        ₹{totalProfit.toLocaleString()}

                    </h2>

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Invoice</th>

                            <th>Product</th>

                            <th>Customer</th>

                            <th>Qty</th>

                            <th>Price</th>

                            <th>Total</th>

                            <th>Profit</th>

                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredSales.length > 0 ?

                                filteredSales.map((sale) => (

                                    <tr key={sale._id}>

                                        <td>{sale.invoiceNumber}</td>

                                        <td>{sale.product?.name}</td>

                                        <td>{sale.customerName}</td>

                                        <td>{sale.quantity}</td>

                                        <td>₹{sale.sellingPrice}</td>

                                        <td>₹{sale.totalAmount}</td>

                                        <td>

                                            <span className="profit-badge">

                                                ₹{sale.profit || 0}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                new Date(sale.createdAt)

                                                    .toLocaleDateString(

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
                                        colSpan="8"
                                        className="empty-table"
                                    >

                                        No sales found for the selected filter.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SalesReport;