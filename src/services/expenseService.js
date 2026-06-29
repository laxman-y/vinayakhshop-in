import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/expenses`;

export const getExpenses =
async () => {

  const res =
  await axios.get(API);

  return res.data;
};

export const createExpense =
async (expenseData, token) => {

  const res =
  await axios.post(
    API,
    expenseData,
    {
      headers:{
        Authorization:
        `Bearer ${token}`
      }
    }
  );

  return res.data;
};