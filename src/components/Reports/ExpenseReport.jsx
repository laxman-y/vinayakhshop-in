import { useEffect, useMemo, useState } from "react";
import { getExpenseReport } from "../../services/reportService";
import "./ExpenseReport.css";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

function ExpenseReport() {

    const [expenses, setExpenses] = useState([]);

    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    useEffect(() => {

        loadExpenses();

    }, []);

    const loadExpenses = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const data =
                await getExpenseReport(token);

            setExpenses(data.expenses);

        } catch (err) {

            console.log(err);

        }

    };

    const filtered = useMemo(() => {

        return expenses.filter((expense) => {

            const keyword =
                search.toLowerCase();

            const title =
                expense.title.toLowerCase();

            const category =
                expense.category.toLowerCase();

            const expenseDate =
                new Date(expense.expenseDate);

            const from =
                fromDate ? new Date(fromDate) : null;

            const to =
                toDate ? new Date(toDate) : null;

            const dateMatch =
                (!from || expenseDate >= from) &&
                (!to || expenseDate <= to);

            return dateMatch && (

                title.includes(keyword) ||

                category.includes(keyword)

            );

        });

    }, [expenses, search, fromDate, toDate]);

    const totalExpense =
        filtered.reduce(

            (sum, item) =>

                sum + item.amount,

            0

        );

    return (

        <div className="expense-report">

            <div className="sales-toolbar">

                <input

                    type="text"

                    placeholder="Search Title / Category"

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
                    onClick={loadExpenses}
                >

                    🔄 Refresh

                </button>

                <button
                    className="excel-btn"
                    onClick={() => {

                        const rows =

                            filtered.map(

                                expense => ({

                                    Title: expense.title,

                                    Category: expense.category,

                                    Amount: expense.amount,

                                    Description: expense.description,

                                    Date: new Date(

                                        expense.expenseDate

                                    ).toLocaleDateString(

                                        "en-IN",

                                        {

                                            day: "2-digit",

                                            month: "short",

                                            year: "numeric"

                                        }

                                    )

                                })

                            );

                        exportToExcel(

                            rows,

                            "Expense_Report"

                        );

                    }}

                >

                    📊 Excel

                </button>

                <button

                    className="pdf-btn"

                    onClick={() => {

                        const columns = [

                            "Title",

                            "Category",

                            "Amount",

                            "Description",

                            "Date"

                        ];

                        const rows =

                            filtered.map((expense) => [

                                expense.title,

                                expense.category,

                                expense.amount,

                                expense.description,

                                new Date(
                                    expense.expenseDate
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })

                            ]);

                        exportToPDF(

                            "Expense Report",

                            columns,

                            rows,

                            "Expense_Report"

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

                        🧾 Expenses

                    </h4>

                    <h2>

                        {filtered.length}

                    </h2>

                </div>

                <div>

                    <h4>

                        💰 Total Expense

                    </h4>

                    <h2>

                        ₹{totalExpense.toLocaleString()}

                    </h2>

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Amount</th>

                            <th>Description</th>

                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length ?

                                filtered.map((expense) => (

                                    <tr key={expense._id}>

                                        <td>

                                            {expense.title}

                                        </td>

                                        <td>

                                            {expense.category}

                                        </td>

                                        <td>

                                            ₹{expense.amount}

                                        </td>

                                        <td>

                                            {expense.description}

                                        </td>

                                        <td>

                                            {

                                                new Date(

                                                    expense.expenseDate

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

                                        colSpan="5"

                                        className="empty-table"

                                    >

                                        No Expense Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ExpenseReport;