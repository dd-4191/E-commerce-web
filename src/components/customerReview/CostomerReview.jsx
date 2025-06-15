import React from "react";
import "./CustomerReview.css";
import StarRating from "../../components/StarRating/StarRating"; //  import your reusable component

const CustomerReview = ({ reviews }) => {
  if (!reviews.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="customer-review">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <span className="reviewerName">
            {review.reviewerName || `User ${index + 1}`}
          </span>
          <div className="rating-stars">
            <StarRating rating={review.rating} />
            {/* reusable star display */}
            <span className="rating-number">({review.rating} / 5)</span>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReview;
