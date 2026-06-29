import {
    Hammer,
    PaintBucket,
    Zap,
    Wrench,
    Building2,
    Drill,
    ArrowRight
} from "lucide-react";

import "./CategorySection.css";

function CategorySection() {

    const categories = [

        {
            icon: <Hammer size={42} />,
            title: "Hardware",
            products: "250+ Products"
        },

        {
            icon: <Zap size={42} />,
            title: "Electrical",
            products: "180+ Products"
        },

        {
            icon: <PaintBucket size={42} />,
            title: "Paint",
            products: "95+ Products"
        },

        {
            icon: <Wrench size={42} />,
            title: "Plumbing",
            products: "140+ Products"
        },

        {
            icon: <Building2 size={42} />,
            title: "Construction",
            products: "120+ Products"
        },

        {
            icon: <Drill size={42} />,
            title: "Power Tools",
            products: "160+ Products"
        }

    ];

    return (

        <section className="category-section">

            <div className="category-container">

                <div className="category-heading">

                    <span>

                        SHOP BY CATEGORY

                    </span>

                    <h2>

                        Explore Our Product Categories

                    </h2>

                    <p>

                        Discover premium quality hardware,
                        construction materials, electrical
                        accessories, plumbing products,
                        industrial tools and trusted brands.

                    </p>

                </div>

                <div className="category-grid">

                    {

                        categories.map(

                            (category, index) => (

                                <div

                                    className="category-card"

                                    key={index}

                                >

                                    <div className="category-icon">

                                        {category.icon}

                                    </div>

                                    <h3>

                                        {category.title}

                                    </h3>

                                    <p>

                                        {category.products}

                                    </p>

                                    <button>

                                        Explore

                                        <ArrowRight
                                            size={18}
                                        />

                                    </button>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

        </section>

    );

}

export default CategorySection;