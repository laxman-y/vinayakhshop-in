import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API =
  `${BASE_URL}/api/brands`;

export const getBrands = async (token) => {

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const createBrand = async (
  brandData,
  token
) => {

  const res = await axios.post(
    API,
    brandData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  return res.data;

};

export const updateBrand = async (
  id,
  brandData,
  token
) => {

  const res = await axios.put(
    `${API}/${id}`,
    brandData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  return res.data;

};

export const deleteBrand = async (
  id,
  token
) => {

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