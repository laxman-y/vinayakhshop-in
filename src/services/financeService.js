import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/finance`;

export const getFinanceStats =
async () => {

  const res =
    await axios.get(API);

  return res.data;
};