import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Navigation
} from "lucide-react";

import "./StoreLocation.css";

function StoreLocation() {

    return (

        <section className="store-section">

            <div className="store-container">

                <div className="store-heading">

                    <span>

                        VISIT OUR STORE

                    </span>

                    <h2>

                        We're Here To Help You Build Better

                    </h2>

                    <p>

                        Visit our store or contact us for expert guidance,
                        premium hardware products, construction materials,
                        electrical accessories and industrial solutions.

                    </p>

                </div>

                <div className="store-grid">

                    {/* LEFT */}

                    <div className="store-info">

                        <div className="store-card">

                            <MapPin size={28} />

                            <div>

                                <h3>Address</h3>

                                <p>

                                    Vinayak Hardware Hub<br/>

                                    Karha,<br/>

                                   Mau, Utter Pradesh - 276402

                                </p>

                            </div>

                        </div>

                        <div className="store-card">

                            <Phone size={28} />

                            <div>

                                <h3>Phone</h3>

                                <p>

                                    +91 9876543210

                                </p>

                            </div>

                        </div>

                        <div className="store-card">

                            <Mail size={28} />

                            <div>

                                <h3>Email</h3>

                                <p>

                                    info@vinayakhardware.com

                                </p>

                            </div>

                        </div>

                        <div className="store-card">

                            <Clock size={28} />

                            <div>

                                <h3>Working Hours</h3>

                                <p>

                                    Monday - Saturday

                                    <br/>

                                    9:00 AM - 8:00 PM

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="map-card">

                        <iframe

                            title="Vinayak Hardware Hub"

                            src="https://www.google.com/maps?q=Mau,Utter Pradesh&output=embed"

                            loading="lazy"

                        ></iframe>

                        <button>

                            <Navigation size={18}/>

                            Get Directions

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default StoreLocation;