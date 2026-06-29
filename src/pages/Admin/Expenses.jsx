import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense
}
from "../../services/expenseService";

import "./Expenses.css";

function Expenses() {

  const [expenses,setExpenses] =
  useState([]);

  const [totalExpense,
  setTotalExpense] =
  useState(0);

  const [formData,
  setFormData] =
  useState({
    title:"",
    category:"Rent",
    amount:"",
    description:""
  });

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses =
  async () => {

    try {

      const data =
      await getExpenses();

      setExpenses(
        data.expenses
      );

      setTotalExpense(
        data.totalExpense
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange =
  (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const token =
      localStorage.getItem(
        "token"
      );

      await createExpense(
        formData,
        token
      );

      setFormData({
        title:"",
        category:"Rent",
        amount:"",
        description:""
      });

      fetchExpenses();

      alert(
        "Expense Added"
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="expenses-page">

      <div className="expense-header">

        <h1>
          Expense Management
        </h1>

      </div>

      <div className="expense-card">

        <h3>
          Total Expenses
        </h3>

        <h2>
          ₹{totalExpense}
        </h2>

      </div>

      <form
      className="expense-form"
      onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >

          <option>
            Rent
          </option>

          <option>
            Electricity
          </option>

          <option>
            Salary
          </option>

          <option>
            Internet
          </option>

          <option>
            Transport
          </option>

          <option>
            Maintenance
          </option>

          <option>
            Other
          </option>

        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Add Expense
        </button>

      </form>

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

          {expenses.map(
          (expense)=>(
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
                {new Date(
                  expense.createdAt
                )
                .toLocaleDateString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Expenses;