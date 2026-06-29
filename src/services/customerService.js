import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
`${BASE_URL}/api/customers`;

const getConfig = (token) => ({

  headers: {

    Authorization:
      `Bearer ${token}`

  }

});

// =======================
// Get All Customers
// =======================

export const getCustomers =
async (token) => {

  const res =
    await axios.get(

      API,

      getConfig(token)

    );

  return res.data;

};

// =======================
// Get Customer By ID
// =======================

export const getCustomerById =
async (id, token) => {

  const res =
    await axios.get(

      `${API}/${id}`,

      getConfig(token)

    );

  return res.data;

};

// =======================
// Create Customer
// =======================

export const createCustomer =
async (customer, token) => {

  const res =
    await axios.post(

      API,

      customer,

      getConfig(token)

    );

  return res.data;

};

// =======================
// Update Customer
// =======================

export const updateCustomer =
async (id, customer, token) => {

  const res =
    await axios.put(

      `${API}/${id}`,

      customer,

      getConfig(token)

    );

  return res.data;

};

// =======================
// Delete Customer
// =======================

export const deleteCustomer =
async (id, token) => {

  const res =
    await axios.delete(

      `${API}/${id}`,

      getConfig(token)

    );

  return res.data;

};