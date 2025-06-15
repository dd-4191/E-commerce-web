import "./ProductComponent.css";
import React, { useState } from "react";
import { useProducts } from "../../context/productContext";
import { useSearch } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
  const navigate = useNavigate();
  const { allProducts, isLoading } = useProducts();
  const { searchTerm } = useSearch();

  const [visibleCount, setVisibleCount] = useState(6); // Show 6 products initially

  if (isLoading) return <p>Loading...</p>;

  // Filter products based on searchTerm
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 10); // Load 6 more products on each click
  };

  return (
    <div className="product-list-container">
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleCount).map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.thumbnail}
                alt={`Image of ${product.title}`}
                onClick={() => navigate(`/products/${product.id}`)}
              />
              <span className="title">
                {product.title.length > 20
                  ? `${product.title.slice(0, 20)}...`
                  : product.title}
              </span>
              <p className="price">Price - ₹{product.price.toFixed(2)}</p>

              <button onClick={() => navigate(`/products/${product.id}`)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products found 😔</p>
        )}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
