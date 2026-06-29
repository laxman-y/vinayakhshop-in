import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Package
} from "lucide-react";

import { getRecentPurchases } from "../../services/dashboardService";

import "./RecentPurchases.css";

function RecentPurchases() {

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchPurchases();

  }, []);

  const fetchPurchases = async () => {

    try {

      const token = localStorage.getItem("token");

      const data = await getRecentPurchases(token);

      setPurchases(data.purchases || []);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="recent-purchases-card">

      <div className="recent-header">

        <div>

          <ShoppingBag size={28} />

          <h2>

            Recent Purchases

          </h2>

        </div>

        <Link
          to="/admin/purchases"
          className="view-all-btn"
        >

          View All

          <ArrowRight size={18} />

        </Link>

      </div>

      {

        loading ?

          (

            <div className="table-loading">

              Loading Recent Purchases...

            </div>

          )

          :

          purchases.length === 0 ?

            (

              <div className="empty-state">

                <Package size={45} />

                <h3>

                  No Purchases Found

                </h3>

                <p>

                  Recent purchases will appear here.

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

                      <th>Supplier</th>

                      <th>Qty</th>

                      <th>Cost</th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      purchases.map((purchase) => (

                        <tr key={purchase._id}>

                          <td>

                            {purchase.product?.name}

                          </td>

                          <td>

                            {purchase.supplier?.name || "-"}

                          </td>

                          <td>

                            {purchase.quantity}

                          </td>

                          <td className="price">

                            ₹{purchase.totalAmount}

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

export default RecentPurchases;