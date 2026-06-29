import {
    ArrowRight,
    BadgeCheck
} from "lucide-react";

import "./TopBrands.css";
import asian from "../../assets/brands/asian-paints.png";

function TopBrands() {

    const brands = [

        {
            name: "Bosch",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Bosch-logo.svg",
            products: "120+ Products"
        },

        {
            name: "Makita",
            logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Makita_logo.svg",
            products: "85+ Products"
        },

        {
            name: "Asian Paints",
            logo: asian,
            products: "60+ Products"
        },

        {
            name: "UltraTech",
            logo: "https://upload.wikimedia.org/wikipedia/en/6/63/UltraTech_Cement_Logo.png",
            products: "40+ Products"
        },

        {
            name: "ACC Cement",
            logo: "https://upload.wikimedia.org/wikipedia/en/f/f0/ACC_Limited_logo.png",
            products: "35+ Products"
        },

        {
            name: "Havells",
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Havells_logo.svg",
            products: "95+ Products"
        }

    ];

    return (

        <section className="brands-section">

            <div className="brands-container">

                <div className="brands-heading">

                    <span>

                        TRUSTED BRANDS

                    </span>

                    <h2>

                        India's Most Trusted Hardware Brands

                    </h2>

                    <p>

                        We proudly deal with globally recognized
                        manufacturers delivering premium quality,
                        reliability and long-lasting performance.

                    </p>

                </div>

                <div className="brands-grid">

                    {

                        brands.map((brand, index) => (

                            <div
                                className="brand-card"
                                key={index}
                            >

                                <div className="verified">

                                    <BadgeCheck
                                        size={18}
                                    />

                                    Verified

                                </div>

                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                />

                                <h3>

                                    {brand.name}

                                </h3>

                                <p>

                                    {brand.products}

                                </p>

                                <button>

                                    Explore

                                    <ArrowRight
                                        size={18}
                                    />

                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default TopBrands;