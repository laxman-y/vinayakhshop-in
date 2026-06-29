import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  TrendingUp,
  CalendarDays,
  ArrowUpRight
} from "lucide-react";

import { getMonthlySales } from "../../services/analyticsService";

import "./SalesChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function SalesChart() {

  const [chartData,setChartData]=useState(null);

  useEffect(()=>{

    const fetchData=async()=>{

      try{

        const token=localStorage.getItem("token");

        const data=await getMonthlySales(token);

        setChartData({

          labels:data.labels,

          datasets:[

            {

              label:"Sales",

              data:data.sales,

              borderColor:"#3b82f6",

              backgroundColor:"rgba(59,130,246,.18)",

              fill:true,

              tension:.45,

              pointRadius:4,

              pointHoverRadius:7,

              pointBackgroundColor:"#3b82f6",

              borderWidth:3

            }

          ]

        });

      }

      catch(error){

        console.log(error);

      }

    };

    fetchData();

  },[]);

  if(!chartData){

    return(

      <div className="chart-card loading-chart">

        Loading Chart...

      </div>

    );

  }

  return(

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <TrendingUp size={28}/>

          <div>

            <h2>

              Monthly Sales

            </h2>

            <p>

              Sales Performance Overview

            </p>

          </div>

        </div>

        <div className="chart-badge">

          <CalendarDays size={18}/>

          This Year

        </div>

      </div>

      <div className="chart-body">

        <Line

          data={chartData}

          options={{

            responsive:true,

            maintainAspectRatio:false,

            interaction:{

              mode:"index",

              intersect:false

            },

            plugins:{

              legend:{

                display:false

              }

            },

            scales:{

              x:{

                grid:{

                  display:false

                },

                ticks:{

                  color:"#94a3b8"

                }

              },

              y:{

                grid:{

                  color:"rgba(148,163,184,.15)"

                },

                ticks:{

                  color:"#94a3b8"

                }

              }

            }

          }}

        />

      </div>

      <div className="chart-footer">

        <ArrowUpRight size={18}/>

        Sales trend updated automatically

      </div>

    </div>

  );

}

export default SalesChart;