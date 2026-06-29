import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/settings`;

// ======================================
// GET SETTINGS
// ======================================

export const getSettings = async (token) => {

    const res = await axios.get(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return res.data;

};

// ======================================
// CREATE SETTINGS
// ======================================

export const createSettings = async (

    settingData,

    token

) => {

    const res = await axios.post(

        API,

        settingData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

// ======================================
// UPDATE SETTINGS
// ======================================

export const updateSettings = async (

    settingData,

    token

) => {

    const res = await axios.put(

        API,

        settingData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};

// ======================================
// RESET SETTINGS
// ======================================

export const resetSettings = async (

    token

) => {

    const res = await axios.delete(

        `${API}/reset`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return res.data;

};