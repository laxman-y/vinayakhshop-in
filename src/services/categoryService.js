import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/categories`;

export const getCategories =
  async (token) => {

    const res = await axios.get(
      API,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.data;

};

export const createCategory =
  async (data, token) => {

    const res = await axios.post(
      API,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.data;

};

export const updateCategory =
  async (id, data, token) => {

    const res = await axios.put(
      `${API}/${id}`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.data;

};

export const deleteCategory =
  async (id, token) => {

    const res = await axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    return res.data;

};