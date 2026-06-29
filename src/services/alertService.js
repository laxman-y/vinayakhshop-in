import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API =
  `${BASE_URL}/api/alerts`;

export const getLowStockProducts =
  async () => {

    const res =
      await axios.get(
        `${API}/low-stock`
      );

    return res.data;

  };

export const getAlertCount = async () => {

  const res = await axios.get(
    `${BASE_URL}/api/alerts/low-stock`
  );

  return res.data.count;

};