import {
    
    Phone,
    Mail,
    MapPin,
    Clock,
    ChevronRight,
    Package,
    ShieldCheck,
    Truck,
    Users
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube
} from "react-icons/fa";

import logo from "../../assets/logo.png";

import "./Footer.css";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className="footer">

            {/* TOP */}

            <div className="footer-top">

                <div className="footer-company">

                    <div className="footer-logo">

                        <img src={logo} alt="logo" />

                        <div>

                            <h2>Vinayak</h2>

                            <span>Hardware Hub</span>

                        </div>

                    </div>

                    <p>

                        India's trusted destination for hardware,
                        construction materials, plumbing,
                        electrical, paint and industrial products.

                    </p>

                    <div className="footer-social">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                        <a href="#">
                            <FaYoutube />
                        </a>

                    </div>

                </div>

                {/* QUICK LINKS */}

                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <ul>

                        <li><ChevronRight size={16} />Home</li>

                        <li><ChevronRight size={16} />Products</li>

                        <li><ChevronRight size={16} />Categories</li>

                        <li><ChevronRight size={16} />About</li>

                        <li><ChevronRight size={16} />Contact</li>

                    </ul>

                </div>

                {/* CATEGORIES */}

                <div className="footer-links">

                    <h3>Categories</h3>

                    <ul>

                        <li><ChevronRight size={16} />Hardware</li>

                        <li><ChevronRight size={16} />Power Tools</li>

                        <li><ChevronRight size={16} />Electrical</li>

                        <li><ChevronRight size={16} />Paint</li>

                        <li><ChevronRight size={16} />Cement</li>

                        <li><ChevronRight size={16} />Plumbing</li>

                    </ul>

                </div>

                {/* CONTACT */}

                <div className="footer-contact">

                    <h3>Contact</h3>

                    <div>

                        <MapPin size={18} />

                        <span>

                            Haridwar,

                            Uttarakhand

                        </span>

                    </div>

                    <div>

                        <Phone size={18} />

                        <span>

                            +91 9876543210

                        </span>

                    </div>

                    <div>

                        <Mail size={18} />

                        <span>

                            support@vinayakhardwarehub.com

                        </span>

                    </div>

                    <div>

                        <Clock size={18} />

                        <span>

                            Mon-Sat

                            <br />

                            9:00 AM - 8:00 PM

                        </span>

                    </div>

                </div>

            </div>

            {/* MIDDLE */}

            <div className="footer-stats">

                <div>

                    <Package size={28} />

                    <h2>500+</h2>

                    <p>Products</p>

                </div>

                <div>

                    <ShieldCheck size={28} />

                    <h2>50+</h2>

                    <p>Brands</p>

                </div>

                <div>

                    <Truck size={28} />

                    <h2>Fast</h2>

                    <p>Delivery</p>

                </div>

                <div>

                    <Users size={28} />

                    <h2>1200+</h2>

                    <p>Customers</p>

                </div>

            </div>

            {/* BOTTOM */}

            <div className="footer-bottom">

                <p>

                    © {year} Vinayak Hardware Hub.

                    All Rights Reserved.

                </p>

                <div>

                    <a href="#">

                        Privacy Policy

                    </a>

                    <a href="#">

                        Terms

                    </a>

                    <a href="#">

                        Support

                    </a>

                </div>

            </div>

        </footer>

    );

}

export default Footer;