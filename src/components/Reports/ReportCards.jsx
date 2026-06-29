import { useEffect, useState } from "react";
import { getDashboardReport } from "../../services/reportService";
import "./ReportCards.css";

function ReportCards() {

    const [report, setReport] = useState(null);

    useEffect(() => {

        const loadReport = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const data =
                    await getDashboardReport(token);

                setReport(data.report);

            } catch (err) {

                console.log(err);

            }

        };

        loadReport();

    }, []);

    if (!report) {

        return <h3>Loading Report...</h3>;

    }

    const cards = [

        {
            title: "Total Sales",
            value: report.totalSales,
            color: "#2563eb"
        },

        {
            title: "Total Purchases",
            value: report.totalPurchases,
            color: "#16a34a"
        },

        {
            title: "Total Expenses",
            value: report.totalExpenses,
            color: "#dc2626"
        },

        {
            title: "Gross Profit",
            value: report.totalProfit,
            color: "#9333ea"
        },

        {
            title: "Net Profit",
            value: report.netProfit,
            color: "#f59e0b"
        },

        {
            title: "Inventory Value",
            value: report.inventoryValue,
            color: "#0891b2"
        }

    ];

    return (

        <div className="report-card-grid">

            {

                cards.map((card, index) => (

                    <div
                        key={index}
                        className="report-card"
                    >

                        <h4>

                            {card.title}

                        </h4>

                        <h2
                            style={{
                                color: card.color
                            }}
                        >

                            ₹
                            {card.value.toLocaleString()}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}

export default ReportCards;