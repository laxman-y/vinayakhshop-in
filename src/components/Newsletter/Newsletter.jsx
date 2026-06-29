import { Mail, Send, BellRing, ShieldCheck } from "lucide-react";
import "./Newsletter.css";

function Newsletter() {

    return (

        <section className="newsletter-section">

            <div className="newsletter-container">

                <div className="newsletter-left">

                    <span className="newsletter-tag">

                        STAY CONNECTED

                    </span>

                    <h2>

                        Get Exclusive Offers &
                        Latest Product Updates

                    </h2>

                    <p>

                        Subscribe to receive updates about new arrivals,
                        discounts, business offers, construction materials
                        and premium hardware products.

                    </p>

                    <div className="newsletter-features">

                        <div>

                            <BellRing size={20} />

                            Latest Product Updates

                        </div>

                        <div>

                            <ShieldCheck size={20} />

                            Exclusive Business Offers

                        </div>

                    </div>

                </div>

                <div className="newsletter-right">

                    <div className="newsletter-card">

                        <Mail
                            size={60}
                            className="mail-icon"
                        />

                        <h3>

                            Join Our Community

                        </h3>

                        <p>

                            Receive useful updates directly
                            in your inbox.

                        </p>

                        <form>

                            <input
                                type="email"
                                placeholder="Enter your email address"
                            />

                            <button type="submit">

                                <Send size={18} />

                                Subscribe

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Newsletter;