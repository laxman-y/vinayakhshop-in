import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API =
`${BASE_URL}/api/analytics`;

export const getMonthlySales =
async(token)=>{

const res=await axios.get(

`${API}/monthly-sales`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

return res.data;

};

export const getMonthlyPurchases =
async(token)=>{

const res=await axios.get(

`${API}/monthly-purchases`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

return res.data;

};

export const getInventoryChart =
async(token)=>{

const res=await axios.get(

`${API}/inventory`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

return res.data;

};