import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  Package
} from "lucide-react";

import { getRecentSales } from "../../services/dashboardService";

import "./RecentSales.css";

function RecentSales() {

  const [sales,setSales]=useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

    fetchSales();

  },[]);

  const fetchSales=async()=>{

    try{

      const token=localStorage.getItem("token");

      const data=await getRecentSales(token);

      setSales(data.sales||[]);

    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  };

  return(

    <div className="recent-sales-card">

      <div className="recent-header">

        <div>

          <ShoppingCart size={28}/>

          <h2>

            Recent Sales

          </h2>

        </div>

        <Link
          to="/admin/sales"
          className="view-all-btn"
        >

          View All

          <ArrowRight size={18}/>

        </Link>

      </div>

      {

        loading ?

        (

          <div className="table-loading">

            Loading Recent Sales...

          </div>

        )

        :

        sales.length===0 ?

        (

          <div className="empty-state">

            <Package size={45}/>

            <h3>

              No Sales Found

            </h3>

            <p>

              Recent sales will appear here.

            </p>

          </div>

        )

        :

        (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Product</th>

                  <th>Customer</th>

                  <th>Qty</th>

                  <th>Amount</th>

                </tr>

              </thead>

              <tbody>

                {

                  sales.map(sale=>(

                    <tr key={sale._id}>

                      <td>

                        {sale.product?.name}

                      </td>

                      <td>

                        {sale.customerName}

                      </td>

                      <td>

                        {sale.quantity}

                      </td>

                      <td className="price">

                        ₹{sale.totalAmount}

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        )

      }

    </div>

  );

}

export default RecentSales;