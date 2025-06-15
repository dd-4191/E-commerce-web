import React from "react";
import { useProducts } from "../../context/productContext";
import { Link } from "react-router-dom";
import "./Category.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";

const Category = () => {
  const { allProducts, selectedCategory, setCategory, isLoading } =
    useProducts();

  // Unique categories
  const categories = [...new Set(allProducts.map((p) => p.category))];

  if (isLoading) {
    return <p>Loading Categories.......</p>;
  }

  // Filtered products
  const filteredProducts =
    selectedCategory === "" || selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="category-wrapper">
      <h3>Top Categories...</h3>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button
          onClick={() => setCategory("all")}
          className={`category-btn ${
            selectedCategory === "all" ? "active" : ""
          }`}
        >
          See All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Show Category Slider when "See All" is clicked */}
      {selectedCategory === "all" && (
        <div className="category-slider">
          <Swiper
            modules={[Navigation, Mousewheel, Keyboard]}
            cssMode={true}
            navigation={true}
            // pagination={true}
            mousewheel={true}
            keyboard={true}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {categories.map((cat) => {
              const oneProduct = allProducts.find((p) => p.category === cat);
              return (
                <SwiperSlide key={cat}>
                  <div
                    className="category-item"
                    onClick={() => setCategory(cat)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={oneProduct?.thumbnail} alt={cat} />
                    <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}

      {/* Filtered Products Grid */}
      {selectedCategory !== "all" && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <span>
                {product.title.length > 20
                  ? product.title.slice(0, 20) + "..."
                  : product.title}
              </span>
              <p>${product.price}</p>
              <Link to={`/products/${product.id}`}>
                <button className="view-btn">View Product</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
