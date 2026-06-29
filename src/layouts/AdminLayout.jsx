import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/Sidebar/Sidebar";

import "./AdminLayout.css";

function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="admin-layout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="admin-main">

        {/* Mobile Header */}

        <div className="mobile-header">

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(true)
            }
          >

            <Menu size={24} />

          </button>

          <div className="mobile-title">

            <h3>

              Vinayak Hardware Hub

            </h3>

            <span>

              Inventory Management

            </span>

          </div>

        </div>

        {/* Desktop Header */}

        <div className="admin-topbar">

          <div>

            <h2>

              Vinayak Hardware Hub

            </h2>

            <p>

              Inventory & Business Management System

            </p>

          </div>

          <div className="admin-profile">

            <div className="profile-circle">

              A

            </div>

            <div>

              <h4>

                Administrator

              </h4>

              <span>

                Online

              </span>

            </div>

          </div>

        </div>

        <div className="admin-content">

          <Outlet />

        </div>

      </main>

      {/* Overlay */}

      {

        sidebarOpen && (

          <div

            className="sidebar-overlay"

            onClick={() =>
              setSidebarOpen(false)
            }

          />

        )

      }

    </div>

  );

}

export default AdminLayout;