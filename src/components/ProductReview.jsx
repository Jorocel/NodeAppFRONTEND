import React, { useState } from "react";
import "./ProductReview.css";

const ProductReview = () => {
    const [reviewData, setReviewData] = useState({
        name: "",
        email: "",
        product: "",
        review: "",
        rating: 0,
    });
    const [hoverRating, setHoverRating] = useState (0);

    const handleStarClick = (rating) => {
        setReviewData({
            ...reviewData,
            rating,
        });
    };


    const handleHover = (rating) => {
        setHoverRating(rating);
    }

    const handleMouseOut = () => {
        setHoverRating (0);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (reviewData.rating === 0) {
            alert("Please select a rating before submitting!");
            return;
        }

        try {
            const response = await fetch("https://jorocelapi.azurewebsites.net/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                },
                body: JSON.stringify(reviewData),
            });

            if(response.ok){
                const result = await response.json();
                alert("Form is submitted successfully!");
                console.log("API Response:", result);
                console.log("Form submission was successful!");

                //reset the form
                setReviewData ({
                    name: "",
                    email: "",
                    product: "",
                    review: "",
                    rating: 0
                });
            }
            else {
                const errorResponse = await response.json();
                alert(`Failed to submit form: ${errorResponse.message}`);
                console.error("API Error", response.statusText); 
            }
        }
        catch (error){
            alert("An error occured while submitting the form.");
            console.error("Error:", error);
        };
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Product Review</h1>
                <p>Share your feedback about any kind of products and share your reviews to help fellow shoppers buy better. </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={reviewData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={reviewData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="product">Product</label>
                        <input
                            type="text"
                            id="product"
                            name="product"
                            placeholder="Enter the product name"
                            value={reviewData.product}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="review">Review</label>
                        <textarea
                            id="review"
                            name="review"
                            placeholder="Write your review here"
                            value={reviewData.review}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-field">
                        <label>Rating</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${
                                        hoverRating || reviewData.rating >= star ? "selected" : ""
                                    }`}
                                    onMouseOver={() => handleHover(star)}
                                    onMouseOut= {handleMouseOut}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductReview;
