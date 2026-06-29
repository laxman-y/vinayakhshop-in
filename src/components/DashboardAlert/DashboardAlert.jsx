import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TriangleAlert,
  ShieldCheck,
  PackageX,
  Boxes,
  RefreshCw
} from "lucide-react";

import { getLowStockProducts } from "../../services/alertService";
import "./DashboardAlert.css";

function DashboardAlert() {

  const [products,setProducts]=useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    loadAlerts();

  },[]);

  const loadAlerts=async()=>{

    try{

      setLoading(true);

      const data=await getLowStockProducts();

      setProducts(data.products||[]);

    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  };

  const outOfStock=products.filter(

    p=>p.stock===0

  ).length;

  const lowStock=products.filter(

    p=>p.stock>0

  ).length;

  if(loading){

    return(

      <div className="dashboard-alert loading-card">

        Loading Inventory...

      </div>

    );

  }

  return(

    <div className="dashboard-alert">

      {

        products.length===0?

        (

          <div className="healthy-card">

            <div className="alert-top">

              <div>

                <ShieldCheck size={34}/>

                <h2>

                  Inventory Healthy

                </h2>

              </div>

            </div>

            <p>

              All products are sufficiently stocked.

            </p>

            <Link

              to="/admin/inventory"

              className="alert-btn"

            >

              View Inventory →

            </Link>

          </div>

        )

        :

        (

          <div className="warning-card">

            <div className="alert-top">

              <div>

                <TriangleAlert size={34}/>

                <h2>

                  Low Stock Alerts

                </h2>

              </div>

              <button

                onClick={loadAlerts}

                className="refresh-btn"

              >

                <RefreshCw size={18}/>

              </button>

            </div>

            <p>

              Some products require immediate attention.

            </p>

            <div className="alert-grid">

              <div>

                <h3>

                  {products.length}

                </h3>

                <span>

                  Total Alerts

                </span>

              </div>

              <div>

                <PackageX size={24}/>

                <h3>

                  {outOfStock}

                </h3>

                <span>

                  Out of Stock

                </span>

              </div>

              <div>

                <Boxes size={24}/>

                <h3>

                  {lowStock}

                </h3>

                <span>

                  Low Stock

                </span>

              </div>

            </div>

            <Link

              to="/admin/alerts"

              className="alert-btn"

            >

              View Alerts →

            </Link>

          </div>

        )

      }

    </div>

  );

}

export default DashboardAlert;