import {
    Star,
    Quote
} from "lucide-react";

import "./Testimonials.css";

function Testimonials() {

    const testimonials = [

        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Civil Contractor",
            image: "https://i.pravatar.cc/150?img=12",
            rating: 5,
            review:
                "Excellent quality products with genuine pricing. Their delivery is always on time and the GST billing process is smooth. Highly recommended for construction projects."
        },

        {
            id: 2,
            name: "Anil Sharma",
            role: "Electrical Engineer",
            image: "https://i.pravatar.cc/150?img=18",
            rating: 5,
            review:
                "Vinayak Hardware Hub has become our first choice for electrical materials. Great customer support and authentic brands at competitive prices."
        },

        {
            id: 3,
            name: "Pooja Verma",
            role: "Interior Designer",
            image: "https://i.pravatar.cc/150?img=25",
            rating: 5,
            review:
                "The paint collection, plumbing materials and hardware accessories are excellent. Staff members are knowledgeable and always helpful."
        }

    ];

    return (

        <section className="testimonial-section">

            <div className="testimonial-container">

                <div className="testimonial-heading">

                    <span>

                        CUSTOMER REVIEWS

                    </span>

                    <h2>

                        Trusted By Thousands Of Customers

                    </h2>

                    <p>

                        Customer satisfaction is our biggest achievement.
                        Here's what professionals and homeowners say about
                        Vinayak Hardware Hub.

                    </p>

                </div>

                <div className="testimonial-grid">

                    {

                        testimonials.map(item => (

                            <div
                                className="testimonial-card"
                                key={item.id}
                            >

                                <Quote
                                    className="quote-icon"
                                    size={36}
                                />

                                <div className="testimonial-user">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div>

                                        <h3>

                                            {item.name}

                                        </h3>

                                        <span>

                                            {item.role}

                                        </span>

                                    </div>

                                </div>

                                <div className="testimonial-stars">

                                    {

                                        [...Array(item.rating)].map((_, index) => (

                                            <Star
                                                key={index}
                                                size={18}
                                                fill="#fbbf24"
                                                color="#fbbf24"
                                            />

                                        ))

                                    }

                                </div>

                                <p className="testimonial-review">

                                    "{item.review}"

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Testimonials;