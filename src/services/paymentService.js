import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/payments`;

const CUSTOMER_API = `${BASE_URL}/api/customers`;

const SALES_API = `${BASE_URL}/api/sales`;

// ==============================
// Get Payments
// ==============================

export const getPayments = async (token) => {

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;

};

// ==============================
// Create Payment
// ==============================

export const createPayment = async (
  paymentData,
  token
) => {

  const res = await axios.post(
    API,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

};

// ==============================
// Delete Payment
// ==============================

export const deletePayment = async (
  id,
  token
) => {

  const res = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

};

// ==============================
// Get Customers
// ==============================

export const getCustomers = async (token) => {

  const res = await axios.get(
    CUSTOMER_API,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

};

// ==============================
// Get Sales
// ==============================

export const getSales = async (token) => {

  const res = await axios.get(
    SALES_API,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

};

export const getPaymentSummary =
async (saleId, token)=>{

  const res =
    await axios.get(

      `${API}/summary/${saleId}`,

      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }

    );

  return res.data;

};














