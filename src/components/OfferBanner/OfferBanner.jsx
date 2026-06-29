import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import "./OfferBanner.css";

function OfferBanner() {

    return (

        <section className="offer-banner">

            <div className="offer-overlay">

                <div className="offer-content">

                    <span className="offer-tag">

                        SPECIAL BUSINESS OFFER

                    </span>

                    <h2>

                        Everything You Need To Build Better

                    </h2>

                    <p>

                        From premium construction materials to electrical,
                        plumbing, paint and industrial hardware,
                        Vinayak Hardware Hub is your trusted partner for
                        homes, contractors and commercial projects.

                    </p>

                    <div className="offer-highlights">

                        <div>

                            <ShieldCheck size={22} />

                            Genuine Products

                        </div>

                        <div>

                            <ShieldCheck size={22} />

                            GST Billing

                        </div>

                        <div>

                            <ShieldCheck size={22} />

                            Best Price

                        </div>

                    </div>

                    <div className="offer-buttons">

                        <button className="offer-primary">

                            Explore Products

                            <ArrowRight size={20} />

                        </button>

                        <button className="offer-secondary">

                            <PhoneCall size={20} />

                            Contact Us

                        </button>

                    </div>

                </div>

                <div className="offer-right">

                    <div className="offer-card">

                        <h3>

                            Business Customers

                        </h3>

                        <h1>

                            25% OFF

                        </h1>

                        <p>

                            Bulk purchase benefits available
                            for builders, contractors,
                            institutions and industrial clients.

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default OfferBanner;