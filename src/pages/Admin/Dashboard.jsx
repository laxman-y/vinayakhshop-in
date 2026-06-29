import { useEffect, useState } from "react";
import {
  Package,
  FolderTree,
  BadgePercent,
  Truck,
  IndianRupee,
  TrendingUp
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

import DashboardAlert from "../../components/DashboardAlert/DashboardAlert";
import RecentSales from "../../components/RecentSales/RecentSales";
import RecentPurchases from "../../components/RecentPurchases/RecentPurchases";
import SalesChart from "../../components/Charts/SalesChart";
import PurchaseChart from "../../components/Charts/PurchaseChart";
import InventoryChart from "../../components/Charts/InventoryChart";

import "./Dashboard.css";

function Dashboard() {

  const [stats,setStats]=useState(null);

  useEffect(()=>{

    const fetchData=async()=>{

      try{

        const token=localStorage.getItem("token");

        const data=await getDashboardStats(token);

        setStats(data.stats);

      }

      catch(error){

        console.log(error);

      }

    };

    fetchData();

  },[]);

  if(!stats){

    return(

      <div className="dashboard-loading">

        Loading Dashboard...

      </div>

    );

  }

  const cards=[

    {

      title:"Products",

      value:stats.totalProducts,

      icon:<Package size={34}/>

    },

    {

      title:"Categories",

      value:stats.totalCategories,

      icon:<FolderTree size={34}/>

    },

    {

      title:"Brands",

      value:stats.totalBrands,

      icon:<BadgePercent size={34}/>

    },

    {

      title:"Suppliers",

      value:stats.totalSuppliers,

      icon:<Truck size={34}/>

    },

    {

      title:"Revenue",

      value:`₹${stats.totalSales}`,

      icon:<IndianRupee size={34}/>

    },

    {

      title:"Profit",

      value:`₹${stats.totalProfit}`,

      icon:<TrendingUp size={34}/>

    }

  ];

  return(

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <span className="dashboard-tag">

            DASHBOARD

          </span>

          <h1>

            Welcome Back 👋

          </h1>

          <p>

            Monitor your inventory, sales,
            purchases and overall business
            performance.

          </p>

        </div>

      </div>

      <div className="dashboard-cards">

        {

          cards.map((card,index)=>(

            <div

              className="dashboard-card"

              key={index}

            >

              <div className="card-icon">

                {card.icon}

              </div>

              <div>

                <h4>

                  {card.title}

                </h4>

                <h2>

                  {card.value}

                </h2>

              </div>

            </div>

          ))

        }

      </div>

      <DashboardAlert/>

      <SalesChart/>

      <PurchaseChart/>

      <InventoryChart/>

      <RecentSales/>

      <RecentPurchases/>

    </div>

  );

}

export default Dashboard;