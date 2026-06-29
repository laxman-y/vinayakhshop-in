import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import {
  ShoppingBag,
  CalendarDays,
  ArrowDownRight
} from "lucide-react";

import { getMonthlyPurchases } from "../../services/analyticsService";

import "./PurchaseChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function PurchaseChart() {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("token");

        const data = await getMonthlyPurchases(token);

        setChartData({

          labels: data.labels,

          datasets: [

            {

              label: "Purchases",

              data: data.purchases,

              backgroundColor: "#22c55e",

              borderRadius: 10,

              borderSkipped: false,

              maxBarThickness: 42

            }

          ]

        });

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  if (!chartData) {

    return (

      <div className="chart-card loading-chart">

        Loading Purchase Chart...

      </div>

    );

  }

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <ShoppingBag size={28} />

          <div>

            <h2>

              Monthly Purchases

            </h2>

            <p>

              Purchase Activity Overview

            </p>

          </div>

        </div>

        <div className="chart-badge">

          <CalendarDays size={18} />

          This Year

        </div>

      </div>

      <div className="chart-body">

        <Bar

          data={chartData}

          options={{

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

              legend: {

                display: false

              }

            },

            scales: {

              x: {

                grid: {

                  display: false

                },

                ticks: {

                  color: "#94a3b8"

                }

              },

              y: {

                grid: {

                  color: "rgba(148,163,184,.15)"

                },

                ticks: {

                  color: "#94a3b8"

                }

              }

            }

          }}

        />

      </div>

      <div className="chart-footer">

        <ArrowDownRight size={18} />

        Purchase trend updated automatically

      </div>

    </div>

  );

}

export default PurchaseChart;