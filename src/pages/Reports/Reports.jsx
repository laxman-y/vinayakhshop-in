import { useState } from "react";
import "./Reports.css";

import ReportCards from "../../components/Reports/ReportCards";
import SalesReport from "../../components/Reports/SalesReport";
import PurchaseReport from "../../components/Reports/PurchaseReport";
import ExpenseReport from "../../components/Reports/ExpenseReport";
import InventoryReport from "../../components/Reports/InventoryReport";
import ProfitLossReport from "../../components/Reports/ProfitLossReport";

function Reports() {

  const [activeTab, setActiveTab] =
    useState("sales");

  return (

    <div className="reports-page">

      <div className="reports-header">

        <div>

          <h1>

            Reports Center

          </h1>

          <p>

            Complete business reports and analytics

          </p>

        </div>

      </div>

      <ReportCards />

      <div className="report-tabs">

        <button

          className={
            activeTab === "sales"
              ? "active-tab"
              : ""
          }

          onClick={() =>
            setActiveTab("sales")
          }

        >

          Sales

        </button>

        <button

          className={
            activeTab === "purchase"
              ? "active-tab"
              : ""
          }

          onClick={() =>
            setActiveTab("purchase")
          }

        >

          Purchases

        </button>

        <button

          className={
            activeTab === "expense"
              ? "active-tab"
              : ""
          }

          onClick={() =>
            setActiveTab("expense")
          }

        >

          Expenses

        </button>

        <button

          className={
            activeTab === "inventory"
              ? "active-tab"
              : ""
          }

          onClick={() =>
            setActiveTab("inventory")
          }

        >

          Inventory

        </button>

        <button

          className={
            activeTab === "profit"
              ? "active-tab"
              : ""
          }

          onClick={() =>
            setActiveTab("profit")
          }

        >

          Profit & Loss

        </button>

      </div>

      <div className="report-body">

        {

          activeTab === "sales" &&

          <SalesReport />

        }

        {

          activeTab === "purchase" &&

          <PurchaseReport />

        }

        {

          activeTab === "expense" &&

          <ExpenseReport />

        }

        {

          activeTab === "inventory" &&

         <InventoryReport />

        }

        {

          activeTab === "profit" &&

          <ProfitLossReport />

        }

      </div>

    </div>

  );

}


export default Reports;