import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_BASE_URL;

export const createReturn = async (
    data,
    token
) => {

    const res = await axios.post(

        `${BASE_URL}/returns`,

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return res.data;

};

export const getReturns = async (
    token
) => {

    const res = await axios.get(

        `${BASE_URL}/returns`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return res.data;

};