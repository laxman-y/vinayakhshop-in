import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/products`;

/* ======================================
   GET ALL PRODUCTS
====================================== */

export const getProducts = async (token) => {

    const res = await axios.get(

        `${API}?page=1&limit=500`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

/* ======================================
   GET PRODUCT BY ID
====================================== */

export const getProductById = async (

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

/* ======================================
   CREATE PRODUCT
====================================== */

export const createProduct = async (
    product,
    token
) => {
    const res = await axios.post(
        API,
        product,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }

        }

    );

    return res.data;

};

/* ======================================
   UPDATE PRODUCT
====================================== */

export const updateProduct = async (

    id,

    product,

    token

) => {

    const res = await axios.put(

        `${API}/${id}`,

        product,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

/* ======================================
   DELETE PRODUCT
====================================== */

export const deleteProduct = async (

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

/* ======================================
   IMAGE UPLOAD
====================================== */

export const uploadProductImage = async (

    file,

    token

) => {

    const formData = new FormData();

    formData.append(

        "image",

        file

    );

    const res = await axios.post(

        `${API}/upload`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data.image;

};
