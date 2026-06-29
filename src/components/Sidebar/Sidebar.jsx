import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  BadgePercent,
  Truck,
  ShoppingCart,
  Receipt,
  Users,
  Warehouse,
  Wallet,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  X
} from "lucide-react";

import logo from "../../assets/logo.png";
import "./Sidebar.css";
import { getAlertCount } from "../../services/alertService";

function Sidebar({

  sidebarOpen,

  setSidebarOpen

}) {

  const location = useLocation();

  const navigate = useNavigate();

  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {

    const loadAlerts = async () => {

      try {

        const count = await getAlertCount();

        setAlertCount(count);

      }

      catch (error) {

        console.log(error);

      }

    };

    loadAlerts();

  }, []);

  const menus = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard"
    },

    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products"
    },

    {
      name: "Categories",
      icon: <FolderTree size={20} />,
      path: "/admin/categories"
    },

    {
      name: "Brands",
      icon: <BadgePercent size={20} />,
      path: "/admin/brands"
    },

    {
      name: "Suppliers",
      icon: <Truck size={20} />,
      path: "/admin/suppliers"
    },

    {
      name: "Purchases",
      icon: <ShoppingCart size={20} />,
      path: "/admin/purchases"
    },

    {
      name: "Sales",
      icon: <Receipt size={20} />,
      path: "/admin/sales"
    },

    {
      name: "Customers",
      icon: <Users size={20} />,
      path: "/admin/customers"
    },

    {
      name: "Inventory",
      icon: <Warehouse size={20} />,
      path: "/admin/inventory"
    },

    {
      name: "Expenses",
      icon: <Wallet size={20} />,
      path: "/admin/expenses"
    },

    {
      name: "Finance",
      icon: <BarChart3 size={20} />,
      path: "/admin/finance"
    },

    {
      name: "Payments",
      icon: <Wallet size={20} />,
      path: "/admin/payments"
    },

    {
      name: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/admin/reports"
    },

    {
      name: "Alerts",
      icon: <Bell size={20} />,
      path: "/admin/alerts"
    },

    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings"
    }

  ];

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  const handleMenuClick = () => {

    if (window.innerWidth <= 768) {

      setSidebarOpen(false);

    }

  };

  return (

    <aside

      className={

        sidebarOpen

          ?

          "sidebar open"

          :

          "sidebar"

      }

    >

      {/* Mobile Close */}

      <button

        className="close-sidebar"

        onClick={() =>

          setSidebarOpen(false)

        }

      >

        <X size={24} />

      </button>

      {/* Logo */}

      <div className="sidebar-logo">

        <img

          src={logo}

          alt="Logo"

        />

        <div>

          <h2>

            Vinayak

          </h2>

          <span>

            Hardware Hub

          </span>

        </div>

      </div>

      {/* Admin */}

      <div className="admin-user">

        <div className="avatar">

          A

        </div>

        <div>

          <h4>

            Administrator

          </h4>

          <p>

            Online

          </p>

        </div>

      </div>

      {/* Menu */}

      <ul className="sidebar-menu">

        {

          menus.map(menu => (

            <li

              key={menu.path}

              className={

                location.pathname === menu.path

                  ?

                  "active"

                  :

                  ""

              }

            >

              <Link

                to={menu.path}

                onClick={handleMenuClick}

              >

                {menu.icon}

                <span>

                  {menu.name}

                </span>

                {

                  menu.name === "Alerts"

                  &&

                  alertCount > 0

                  &&

                  <small>

                    {alertCount}

                  </small>

                }

              </Link>

            </li>

          ))

        }

      </ul>

      {/* Logout */}

      <button

        className="logout-btn"

        onClick={handleLogout}

      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>

  );

}

export default Sidebar;