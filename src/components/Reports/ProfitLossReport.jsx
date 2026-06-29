import { useEffect, useState } from "react";
import { getProfitLossReport } from "../../services/reportService";
import "./ProfitLossReport.css";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

function ProfitLossReport() {

    const [report, setReport] = useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await getProfitLossReport(token);

            setReport(data.report);

        } catch (err) {

            console.log(err);

        }

    };

    if (!report) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="profit-report">

            <div className="sales-toolbar">

                <button
                    className="refresh-btn"
                    onClick={loadReport}
                >
                    🔄 Refresh
                </button>

                <button
                    className="excel-btn"
                    onClick={() => {

                        const rows = [

                            {

                                Metric: "Total Sales",

                                Amount: `₹${report.totalSales.toLocaleString()}`

                            },

                            {

                                Metric: "Total Purchases",

                                Amount: `₹${report.totalPurchases.toLocaleString()}`

                            },

                            {

                                Metric: "Total Expenses",

                                Amount: `₹${report.totalExpenses.toLocaleString()}`

                            },

                            {

                                Metric: "Gross Profit",

                                Amount: `₹${report.grossProfit.toLocaleString()}`

                            },

                            {

                                Metric: "Net Profit",

                                Amount: `₹${report.netProfit.toLocaleString()}`

                            }

                        ];

                        exportToExcel(

                            rows,

                            "Profit_Loss_Report"

                        );

                    }}
                >
                    📊 Excel
                </button>

                <button

                    className="pdf-btn"

                    onClick={() => {

                        const columns = [

                            "Metric",

                            "Amount"

                        ];
                        const rows = [
                            ["Total Sales", report.totalSales],
                            ["Total Purchases", report.totalPurchases],
                            ["Total Expenses", report.totalExpenses],
                            ["Gross Profit", report.grossProfit],
                            ["Net Profit", report.netProfit]
                        ];

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

                    <h4>💰 Sales</h4>

                    <h2>

                        ₹{report.totalSales.toLocaleString()}

                    </h2>

                </div>

                <div>

                    <h4>📦 Purchases</h4>

                    <h2>

                        ₹{report.totalPurchases.toLocaleString()}

                    </h2>

                </div>

                <div>

                    <h4>🧾 Expenses</h4>

                    <h2>

                        ₹{report.totalExpenses.toLocaleString()}

                    </h2>

                </div>

                <div>

                    <h4>📈 Gross Profit</h4>

                    <h2 className="profit">

                        ₹{report.grossProfit.toLocaleString()}

                    </h2>

                </div>

                <div>

                    <h4>💵 Net Profit</h4>

                    <h2

                        className={
                            report.netProfit >= 0
                                ? "profit"
                                : "loss"
                        }

                    >

                        ₹{report.netProfit.toLocaleString()}

                    </h2>

                </div>

            </div>

            <div className="profit-table">

                <table>

                    <thead>

                        <tr>

                            <th>Metric</th>

                            <th>Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>Total Sales</td>

                            <td>₹{report.totalSales.toLocaleString()}</td>

                        </tr>

                        <tr>

                            <td>Total Purchases</td>

                            <td>₹{report.totalPurchases.toLocaleString()}</td>

                        </tr>

                        <tr>

                            <td>Total Expenses</td>

                            <td>₹{report.totalExpenses.toLocaleString()}</td>

                        </tr>

                        <tr>

                            <td>Gross Profit</td>

                            <td className="profit">

                                ₹{report.grossProfit.toLocaleString()}

                            </td>

                        </tr>

                        <tr>

                            <td>Net Profit</td>

                            <td

                                className={
                                    report.netProfit >= 0
                                        ? "profit"
                                        : "loss"
                                }

                            >

                                ₹{report.netProfit.toLocaleString()}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ProfitLossReport;