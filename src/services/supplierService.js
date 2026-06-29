import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/suppliers`;

export const getSuppliers =
  async () => {

    const res =
      await axios.get(API);

    return res.data;

  };

export const createSupplier =
  async (
    supplierData,
    token
  ) => {

    const res =
      await axios.post(
        API,
        supplierData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;

  };

export const updateSupplier =
  async (
    id,
    supplierData,
    token
  ) => {

    const res =
      await axios.put(
        `${API}/${id}`,
        supplierData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;

  };

export const deleteSupplier =
  async (
    id,
    token
  ) => {

    const res =
      await axios.delete(
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