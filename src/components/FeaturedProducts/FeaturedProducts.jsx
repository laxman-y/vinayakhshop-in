import {
    Star,
    Eye,
    ShoppingCart,
    BadgePercent
} from "lucide-react";

import "./FeaturedProducts.css";

function FeaturedProducts() {

    const products = [

        {
            id: 1,
            name: "Bosch Rotary Hammer",
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=700",
            price: 4999,
            oldPrice: 5999,
            stock: "In Stock",
            discount: "17% OFF",
            rating: 5
        },

        {
            id: 2,
            name: "Industrial Drill Machine",
            brand: "Makita",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700",
            price: 6999,
            oldPrice: 7999,
            stock: "In Stock",
            discount: "12% OFF",
            rating: 5
        },

        {
            id: 3,
            name: "Premium Paint Bucket",
            brand: "Asian Paints",
            image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700",
            price: 2499,
            oldPrice: 2999,
            stock: "Limited Stock",
            discount: "20% OFF",
            rating: 4
        },

        {
            id: 4,
            name: "Heavy Duty Cement Bag",
            brand: "UltraTech",
            image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=700",
            price: 420,
            oldPrice: 480,
            stock: "In Stock",
            discount: "10% OFF",
            rating: 5
        }

    ];

    return (

        <section className="featured-section">

            <div className="featured-container">

                <div className="featured-heading">

                    <span>

                        FEATURED PRODUCTS

                    </span>

                    <h2>

                        Best Selling Products

                    </h2>

                    <p>

                        Explore our most popular construction materials,
                        hardware tools, electrical accessories and
                        industrial products trusted by professionals.

                    </p>

                </div>

                <div className="featured-grid">

                    {

                        products.map(product => (

                            <div
                                className="product-card"
                                key={product.id}
                            >

                                <div className="discount-badge">

                                    <BadgePercent
                                        size={16}
                                    />

                                    {product.discount}

                                </div>

                                <div className="product-image">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                </div>

                                <div className="product-content">

                                    <span className="brand">

                                        {product.brand}

                                    </span>

                                    <h3>

                                        {product.name}

                                    </h3>

                                    <div className="rating">

                                        {

                                            [...Array(product.rating)].map((_, i) => (

                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill="#fbbf24"
                                                    color="#fbbf24"
                                                />

                                            ))

                                        }

                                    </div>

                                    <div className="price-row">

                                        <h4>

                                            ₹{product.price.toLocaleString()}

                                        </h4>

                                        <span>

                                            ₹{product.oldPrice.toLocaleString()}

                                        </span>

                                    </div>

                                    <div className="stock">

                                        {product.stock}

                                    </div>

                                    <div className="product-buttons">

                                        <button
                                            className="view-btn"
                                        >

                                            <Eye size={18} />

                                            View

                                        </button>

                                        <button
                                            className="cart-btn"
                                        >

                                            <ShoppingCart
                                                size={18}
                                            />

                                            Add

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default FeaturedProducts;