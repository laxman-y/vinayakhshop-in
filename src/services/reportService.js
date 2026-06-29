import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API =
`${BASE_URL}/api/reports`;

const config=(token)=>({

headers:{
Authorization:`Bearer ${token}`
}

});

export const getDashboardReport=
async(token)=>{

const res=await axios.get(
`${API}/dashboard`,
config(token)
);

return res.data;

};

export const getSalesReport=
async(token)=>{

const res=await axios.get(
`${API}/sales`,
config(token)
);

return res.data;

};

export const getPurchaseReport=
async(token)=>{

const res=await axios.get(
`${API}/purchases`,
config(token)
);

return res.data;

};

export const getExpenseReport=
async(token)=>{

const res=await axios.get(
`${API}/expenses`,
config(token)
);

return res.data;

};

export const getInventoryReport=
async(token)=>{

const res=await axios.get(
`${API}/inventory`,
config(token)
);

return res.data;

};

export const getProfitLossReport=
async(token)=>{

const res=await axios.get(
`${API}/profit-loss`,
config(token)
);

return res.data;

};