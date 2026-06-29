import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/purchases`;

export const getPurchases = async () => {

    const res = await axios.get(API);

    return res.data;

};

export const getPurchaseById = async (

    id,

    token

) => {

    const res = await axios.get(

        `${API}/${id}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

export const createPurchase = async (

    purchase,

    token

) => {

    const res = await axios.post(

        API,

        purchase,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

export const updatePurchase = async (

    id,

    purchase,

    token

) => {

    const res = await axios.put(

        `${API}/${id}`,

        purchase,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

export const deletePurchase = async (

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