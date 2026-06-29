import {
    ShieldCheck,
    Truck,
    BadgeDollarSign,
    Headphones,
    FileText,
    Award
} from "lucide-react";

import "./WhyChooseUs.css";

function WhyChooseUs() {

    const features = [

        {
            icon: <ShieldCheck size={42} />,
            title: "100% Genuine Products",
            description:
                "We supply only genuine and trusted brands ensuring quality, durability and complete customer satisfaction."
        },

        {
            icon: <Truck size={42} />,
            title: "Fast Delivery",
            description:
                "Quick and reliable delivery for construction sites, contractors and individual customers."
        },

        {
            icon: <BadgeDollarSign size={42} />,
            title: "Best Price Guarantee",
            description:
                "Competitive wholesale and retail pricing without compromising product quality."
        },

        {
            icon: <Headphones size={42} />,
            title: "Customer Support",
            description:
                "Friendly assistance before and after purchase to help you choose the right products."
        },

        {
            icon: <FileText size={42} />,
            title: "GST Billing",
            description:
                "Professional GST invoices with complete billing transparency for every purchase."
        },

        {
            icon: <Award size={42} />,
            title: "Trusted Hardware Store",
            description:
                "Serving homeowners, contractors and businesses with premium hardware products and dependable service."
        }

    ];

    return (

        <section className="why-section">

            <div className="why-container">

                <div className="why-heading">

                    <span>

                        WHY CHOOSE US

                    </span>

                    <h2>

                        Trusted By Professionals &
                        Homeowners

                    </h2>

                    <p>

                        Vinayak Hardware Hub is committed to
                        delivering premium quality hardware,
                        construction materials, electrical,
                        plumbing and industrial products with
                        reliable service and competitive pricing.

                    </p>

                </div>

                <div className="why-grid">

                    {

                        features.map((item, index) => (

                            <div
                                key={index}
                                className="why-card"
                            >

                                <div className="why-icon">

                                    {item.icon}

                                </div>

                                <h3>

                                    {item.title}

                                </h3>

                                <p>

                                    {item.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default WhyChooseUs;