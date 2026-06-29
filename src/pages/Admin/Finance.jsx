import { useEffect, useState } from "react";
import { getFinanceStats }
from "../../services/financeService";

import "./Finance.css";

function Finance() {

  const [stats,setStats] =
  useState(null);

  useEffect(() => {

    const fetchData =
    async()=>{

      try{

        const data =
        await getFinanceStats();

        setStats(data.stats);

      }catch(error){

        console.log(error);

      }

    };

    fetchData();

  },[]);

  if(!stats)
    return <h2>Loading...</h2>;

  return (

    <div className="finance-page">

      <h1>
        Finance Dashboard
      </h1>

      <div className="finance-grid">

        <div className="finance-card">
          <h3>Total Sales</h3>
          <h2>₹{stats.totalSales}</h2>
        </div>

        <div className="finance-card">
          <h3>Total Purchases</h3>
          <h2>₹{stats.totalPurchases}</h2>
        </div>

        <div className="finance-card">
          <h3>Total Expenses</h3>
          <h2>₹{stats.totalExpenses}</h2>
        </div>

        <div className="finance-card">
          <h3>Gross Profit</h3>
          <h2>₹{stats.totalProfit}</h2>
        </div>

        <div className="finance-card">
          <h3>Net Profit</h3>
          <h2>₹{stats.netProfit}</h2>
        </div>

        <div className="finance-card">
          <h3>Inventory Value</h3>
          <h2>₹{stats.inventoryValue}</h2>
        </div>

      </div>

    </div>

  );

}

export default Finance;