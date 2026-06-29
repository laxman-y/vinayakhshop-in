import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/dashboard`;

export const getDashboardStats =
async (token) => {

  const res =
    await axios.get(
      API,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return res.data;
};

export const getRecentSales =
async (token) => {

  const res =
    await axios.get(
      `${API}/recent-sales`,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return res.data;
};

export const getRecentPurchases =
async (token) => {

  const res =
    await axios.get(
      `${API}/recent-purchases`,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return res.data;
};