import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    Search,
    LayoutDashboard,
    LogIn,
    LogOut
} from "lucide-react";

import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

        window.location.reload();

    };

    return (

        <header className="navbar">

            <div className="navbar-container">

                {/* =======================
                        LOGO
                ======================= */}

                <Link
                    to="/"
                    className="logo"
                >

                    <img
                        src={logo}
                        alt="Logo"
                        className="logo-image"
                    />

                    <div className="logo-text">

                        <h1>

                            Vinayak

                        </h1>

                        <p>

                            Hardware Hub

                        </p>

                    </div>

                </Link>

                {/* =======================
                        DESKTOP MENU
                ======================= */}

                <nav className="desktop-menu">

                    <Link to="/">Home</Link>

                    <Link to="/">Products</Link>

                    <Link to="/">Categories</Link>

                    <Link to="/">About</Link>

                    <Link to="/">Contact</Link>

                </nav>

                {/* =======================
                        RIGHT SIDE
                ======================= */}

                <div className="navbar-right">

                    <div className="search-box">

                        <Search
                            size={18}
                        />

                        <input

                            type="text"

                            placeholder="Search Products..."

                        />

                    </div>

                    {

                        token ?

                            <>

                                <button

                                    className="dashboard-btn"

                                    onClick={() =>

                                        navigate("/admin/dashboard")

                                    }

                                >

                                    <LayoutDashboard size={18} />

                                    Dashboard

                                </button>

                                <button

                                    className="logout-btn"

                                    onClick={handleLogout}

                                >

                                    <LogOut size={18} />

                                    Logout

                                </button>

                            </>

                            :

                            <button

                                className="login-btn"

                                onClick={() =>

                                    navigate("/login")

                                }

                            >

                                <LogIn size={18} />

                                Login

                            </button>

                    }

                </div>

                {/* =======================
                    MOBILE MENU BUTTON
                ======================= */}

                <button

                    className="mobile-menu-btn"

                    onClick={() =>

                        setMenuOpen(!menuOpen)

                    }

                >

                    {

                        menuOpen ?

                            <X size={28} />

                            :

                            <Menu size={28} />

                    }

                </button>

            </div>

            {/* =======================
                    MOBILE MENU
            ======================= */}

            <div

                className={

                    menuOpen ?

                        "mobile-menu active"

                        :

                        "mobile-menu"

                }

            >

                <Link

                    to="/"

                    onClick={() =>

                        setMenuOpen(false)

                    }

                >

                    Home

                </Link>

                <Link

                    to="/"

                    onClick={() =>

                        setMenuOpen(false)

                    }

                >

                    Products

                </Link>

                <Link

                    to="/"

                    onClick={() =>

                        setMenuOpen(false)

                    }

                >

                    Categories

                </Link>

                <Link

                    to="/"

                    onClick={() =>

                        setMenuOpen(false)

                    }

                >

                    About

                </Link>

                <Link

                    to="/"

                    onClick={() =>

                        setMenuOpen(false)

                    }

                >

                    Contact

                </Link>

                <div className="mobile-search">

                    <Search size={18} />

                    <input

                        type="text"

                        placeholder="Search Products..."

                    />

                </div>

                {

                    token ?

                        <>

                            <button

                                className="dashboard-btn mobile"

                                onClick={() => {

                                    navigate("/admin/dashboard");

                                    setMenuOpen(false);

                                }}

                            >

                                <LayoutDashboard size={18} />

                                Dashboard

                            </button>

                            <button

                                className="logout-btn mobile"

                                onClick={handleLogout}

                            >

                                <LogOut size={18} />

                                Logout

                            </button>

                        </>

                        :

                        <button

                            className="login-btn mobile"

                            onClick={() => {

                                navigate("/login");

                                setMenuOpen(false);

                            }}

                        >

                            <LogIn size={18} />

                            Login

                        </button>

                }

            </div>

        </header>

    );

}

export default Navbar;