import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/sales`;

export const getSales = async () => {

    const res = await axios.get(API);

    return res.data;

};

export const getSaleById = async (

    id,

    token

) => {

    const res = await axios.get(

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

export const createSale = async (

    saleData,

    token

) => {

    const res = await axios.post(

        API,

        saleData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return res.data;

};

export const updateSale = async (

    id,

    saleData,

    token

) => {

    const res = await axios.put(

        `${API}/${id}`,

        saleData,

        {

            headers: {

                Authorization:

                    `Bearer ${token}`

            }

        }

    );

    return res.data;

};

export const deleteSale = async (

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