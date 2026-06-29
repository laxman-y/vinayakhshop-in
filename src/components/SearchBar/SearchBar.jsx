import { useState } from "react";
import {
    Search,
    Hammer,
    PaintBucket,
    Zap,
    Wrench,
    Building2,
    ArrowRight
} from "lucide-react";

import "./SearchBar.css";

function SearchBar() {

    const [keyword, setKeyword] = useState("");

    const categories = [

        {
            icon: <Hammer size={18} />,
            name: "Hardware"
        },

        {
            icon: <PaintBucket size={18} />,
            name: "Paint"
        },

        {
            icon: <Zap size={18} />,
            name: "Electrical"
        },

        {
            icon: <Wrench size={18} />,
            name: "Plumbing"
        },

        {
            icon: <Building2 size={18} />,
            name: "Cement"
        },

        {
            icon: <Hammer size={18} />,
            name: "Power Tools"
        }

    ];

    const handleSearch = () => {

        if (!keyword.trim()) {

            alert("Please enter product name.");

            return;

        }

        alert(`Searching : ${keyword}`);

        // Later:
        // Navigate("/products")
        // API Search

    };

    return (

        <section className="search-section">

            <div className="search-wrapper">

                <div className="search-heading">

                    <span>

                        PRODUCT SEARCH

                    </span>

                    <h2>

                        Find Products Faster

                    </h2>

                    <p>

                        Search thousands of premium hardware,
                        construction materials, electrical,
                        plumbing, paint and industrial tools.

                    </p>

                </div>

                <div className="premium-search-box">

                    <Search
                        size={22}
                    />

                    <input

                        type="text"

                        placeholder="Search Products, Brands, Categories..."

                        value={keyword}

                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }

                    />

                    <button

                        onClick={handleSearch}

                    >

                        Search

                        <ArrowRight size={18} />

                    </button>

                </div>

                <div className="popular-search">

                    <h3>

                        Popular Categories

                    </h3>

                    <div className="popular-grid">

                        {

                            categories.map(

                                (item, index) => (

                                    <button

                                        key={index}

                                        className="popular-card"

                                    >

                                        {item.icon}

                                        <span>

                                            {item.name}

                                        </span>

                                    </button>

                                )

                            )

                        }

                    </div>

                </div>

            </div>

        </section>

    );

}

export default SearchBar;