import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Package,
  Truck,
  BadgeCheck
} from "lucide-react";

import logo from "../../assets/logo.png";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/login",

        {

          email,

          password

        }

      );

      localStorage.setItem(

        "token",

        res.data.token

      );

      navigate("/admin/dashboard");

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      {/* LEFT PANEL */}

      <div className="login-left">

        <div className="overlay"></div>

        <div className="left-content">

          <div className="login-logo">

            <img

              src={logo}

              alt="Logo"

            />

            <div>

              <h2>

                Vinayak

              </h2>

              <p>

                HARDWARE HUB

              </p>

            </div>

          </div>

          <span className="login-tag">

            ADMIN PORTAL

          </span>

          <h1>

            Welcome Back

            <br />

            Administrator

          </h1>

          <p>

            Manage products, inventory,

            suppliers, purchases,

            sales, reports and

            business operations

            from one dashboard.

          </p>

          <div className="login-features">

            <div>

              <Package size={22} />

              <span>

                500+ Products

              </span>

            </div>

            <div>

              <ShieldCheck size={22} />

              <span>

                GST Billing

              </span>

            </div>

            <div>

              <Truck size={22} />

              <span>

                Fast Delivery

              </span>

            </div>

            <div>

              <BadgeCheck size={22} />

              <span>

                Trusted Service

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="login-right">

        <form

          className="login-card"

          onSubmit={handleLogin}

        >

          <button

            type="button"

            className="back-btn"

            onClick={() => navigate("/")}

          >

            <ArrowLeft size={18} />

            Back To Home

          </button>

          <h2>

            Admin Login

          </h2>

          <p>

            Sign in to continue

          </p>

          {/* EMAIL */}

          <div className="input-group">

            <Mail size={18} />

            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e) =>

                setEmail(e.target.value)

              }

              required

            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <Lock size={18} />

            <input

              type={

                showPassword

                  ? "text"

                  : "password"

              }

              placeholder="Password"

              value={password}

              onChange={(e) =>

                setPassword(e.target.value)

              }

              required

            />

            <button

              type="button"

              className="eye-btn"

              onClick={() =>

                setShowPassword(

                  !showPassword

                )

              }

            >

              {

                showPassword

                  ?

                  <EyeOff size={18} />

                  :

                  <Eye size={18} />

              }

            </button>

          </div>

          <div className="login-options">

            <label>

              <input type="checkbox" />

              Remember Me

            </label>

            <span>

              Forgot Password?

            </span>

          </div>

          <button

            className="login-btn"

            type="submit"

            disabled={loading}

          >

            {

              loading

                ?

                "Signing In..."

                :

                "Login"

            }

          </button>

          <div className="login-version">

            Version 1.0.0

          </div>

        </form>

      </div>

    </div>

  );

}

export default Login;