import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

import {
  PackageCheck,
  CalendarDays,
  Activity
} from "lucide-react";

import { getInventoryChart } from "../../services/analyticsService";

import "./InventoryChart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function InventoryChart() {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("token");

        const data = await getInventoryChart(token);

        setChartData({

          labels: data.labels,

          datasets: [

            {

              data: data.values,

              backgroundColor: [

                "#22c55e",

                "#f59e0b",

                "#ef4444"

              ],

              borderWidth: 0,

              hoverOffset: 18

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

      <div className="inventory-card loading-chart">

        Loading Inventory...

      </div>

    );

  }

  return (

    <div className="inventory-card">

      <div className="inventory-header">

        <div>

          <PackageCheck size={28} />

          <div>

            <h2>

              Inventory Status

            </h2>

            <p>

              Current Stock Distribution

            </p>

          </div>

        </div>

        <div className="inventory-badge">

          <CalendarDays size={18} />

          Live Data

        </div>

      </div>

      <div className="inventory-body">

        <div className="inventory-chart">

          <Pie

            data={chartData}

            options={{

              responsive: true,

              maintainAspectRatio: false,

              plugins: {

                legend: {

                  position: "bottom",

                  labels: {

                    color: "#cbd5e1",

                    padding: 18,

                    font: {

                      size: 13

                    }

                  }

                }

              }

            }}

          />

        </div>

      </div>

      <div className="inventory-footer">

        <Activity size={18} />

        Inventory updates in real time

      </div>

    </div>

  );

}

export default InventoryChart;