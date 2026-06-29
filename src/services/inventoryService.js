import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/inventory`;

export const getInventory =
  async () => {

    const res =
      await axios.get(API);

    return res.data;

  };