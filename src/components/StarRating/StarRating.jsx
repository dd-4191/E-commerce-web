import { faStarHalfAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        color="gold"
        style={{ fontSize: "12px" }}
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalfAlt}
        color="gold"
        style={{ fontSize: "12px" }}
      />
    );
  }

  const remaining = totalStars - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <span key={`empty-${i}`} style={{ fontSize: "14px" }}>
        ☆
      </span>
    );
  }

  return <span style={{ fontSize: "12px" }}>{stars}</span>;
};

export default StarRating;
