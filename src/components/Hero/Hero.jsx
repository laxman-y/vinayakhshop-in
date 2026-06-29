import "./Hero.css";
import {
  CalendarDays,
  ShieldCheck,
  ReceiptText,
  Truck,
  BadgeCheck,
  ArrowRight,
  Phone,
  Package,
  Tags,
  BadgePercent
} from "lucide-react";

import heroImage from "../../assets/hero-banner.png";

function Hero() {

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  return (

    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        {/* ==========================
                    LEFT SIDE
                ========================== */}

        <div className="hero-left">

          <div className="hero-date">

            <CalendarDays size={20} />

            <span>{today}</span>

          </div>

          <div className="welcome-badge">

            WELCOME TO

          </div>

          <h1>

            VINAYAK

            <br />

            <span>

              HARDWARE HUB

            </span>

          </h1>

          <h2>

            Trusted Hardware & Building
            Material Supplier

          </h2>

          <p>

            We provide premium quality
            hardware, construction tools,
            electrical supplies, plumbing
            materials, paint solutions and
            industrial equipment for homes,
            contractors and businesses.

          </p>

          {/* ======================
                        FEATURES
                    ====================== */}

          <div className="hero-features">

            <div className="feature">

              <ShieldCheck />

              <span>

                Genuine Products

              </span>

            </div>

            <div className="feature">

              <ReceiptText />

              <span>

                GST Billing

              </span>

            </div>

            <div className="feature">

              <Truck />

              <span>

                Fast Delivery

              </span>

            </div>

            <div className="feature">

              <BadgeCheck />

              <span>

                Best Price

              </span>

            </div>

          </div>

          {/* ======================
                        BUTTONS
                    ====================== */}

          <div className="hero-buttons">

            <button
              className="shop-btn"
            >

              Explore Products

              <ArrowRight
                size={20}
              />

            </button>

            <button
              className="contact-btn"
            >

              Contact Us

              <Phone
                size={20}
              />

            </button>

          </div>

        </div>

        {/* ==========================
                    RIGHT SIDE
                ========================== */}

        <div className="hero-right">

          <div className="hero-image-wrapper">

            <img

              src={heroImage}

              alt="Hero"

              className="hero-image"

            />
            {/* Floating Cards */}

            <div className="floating-card card-one">

              <Package
                size={34}
              />

              <div>

                <h3>

                  500+

                </h3>

                <p>

                  Products

                </p>

              </div>

            </div>

            <div className="floating-card card-two">

              <Tags
                size={34}
              />

              <div>

                <h3>

                  50+

                </h3>

                <p>

                  Brands

                </p>

              </div>

            </div>

            <div className="floating-card card-three">

              <BadgePercent
                size={34}
              />

              <div>

                <h3>

                  GST

                </h3>

                <p>

                  Registered

                </p>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ==================================
                    Bottom Statistics
            =================================== */}

      <div className="hero-stats">

        <div className="stat-box">

          <Package
            size={42}
          />

          <div>

            <h2>

              500+

            </h2>

            <h4>

              Products

            </h4>

            <p>

              Wide range of quality
              hardware products.

            </p>

          </div>

        </div>

        <div className="stat-box">

          <Tags
            size={42}
          />

          <div>

            <h2>

              50+

            </h2>

            <h4>

              Brands

            </h4>

            <p>

              Trusted brands under
              one roof.

            </p>

          </div>

        </div>

        <div className="stat-box">

          <ShieldCheck
            size={42}
          />

          <div>

            <h2>

              1200+

            </h2>

            <h4>

              Happy Customers

            </h4>

            <p>

              Serving contractors,
              builders and families.

            </p>

          </div>

        </div>

        <div className="stat-box">

          <BadgeCheck
            size={42}
          />

          <div>

            <h2>

              99%

            </h2>

            <h4>

              Satisfaction

            </h4>

            <p>

              Trusted service with
              genuine products.

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;