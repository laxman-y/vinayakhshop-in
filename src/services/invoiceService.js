import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
  `${BASE_URL}/api/invoice`;

export const getInvoice =
async (saleId, token) => {

  const res =
    await axios.get(

      `${API}/${saleId}`,

      {
        headers: {

          Authorization:
          `Bearer ${token}`

        }

      }

    );

  return res.data;

};