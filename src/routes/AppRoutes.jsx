import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import Categories from "../pages/Admin/Categories";
import Brands from "../pages/Admin/Brands";
import Suppliers from "../pages/Admin/Suppliers";
import Purchases from "../pages/Admin/Purchases";
import Sales from "../pages/Admin/Sales";
import Inventory from "../pages/Admin/Inventory";
import Expenses from "../pages/Admin/Expenses";
import Finance from "../pages/Admin/Finance";
import Alerts from "../pages/Admin/Alerts";

import Reports from "../pages/Reports/Reports";

import Customers from "../pages/Customers/Customers";
import AddCustomer from "../pages/Customers/AddCustomer";
import EditCustomer from "../pages/Customers/EditCustomer";

import Invoice from "../pages/Invoice/Invoice";
import Payments from "../pages/Payments/Payments";

import Settings from "../pages/Settings/Settings";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import EditProduct from "../pages/Admin/EditProduct";
import EditPurchase from "../pages/Admin/EditPurchase";
import EditSale from "../pages/Admin/EditSale";

function AppRoutes() {

  return (

    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

      </Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route element={<ProtectedRoute />}>

        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/admin/products"
            element={<Products />}
          />

          <Route
            path="/admin/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/admin/categories"
            element={<Categories />}
          />

          <Route
            path="/admin/brands"
            element={<Brands />}
          />

          <Route
            path="/admin/suppliers"
            element={<Suppliers />}
          />

          <Route
            path="/admin/purchases"
            element={<Purchases />}
          />

          <Route
            path="/admin/sales"
            element={<Sales />}
          />

          <Route
            path="/admin/inventory"
            element={<Inventory />}
          />

          <Route
            path="/admin/expenses"
            element={<Expenses />}
          />

          <Route
            path="/admin/finance"
            element={<Finance />}
          />

          <Route
            path="/admin/alerts"
            element={<Alerts />}
          />

          <Route
            path="/admin/reports"
            element={<Reports />}
          />

          <Route
            path="/admin/customers"
            element={<Customers />}
          />

          <Route
            path="/admin/customers/add"
            element={<AddCustomer />}
          />

          <Route
            path="/admin/customers/edit/:id"
            element={<EditCustomer />}
          />

          <Route
            path="/admin/invoice/:saleId"
            element={<Invoice />}
          />

          <Route
            path="/admin/payments"
            element={<Payments />}
          />

          <Route
            path="/admin/settings"
            element={<Settings />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="/admin/purchases/edit/:id"
            element={<EditPurchase />}
          />

          <Route
            path="/admin/sales/edit/:id"
            element={<EditSale />}
          />

        </Route>
      </Route>

    </Routes>

  );

}

export default AppRoutes;