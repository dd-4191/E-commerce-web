import { useEffect, useState } from "react";
import "./singleProduct.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/productContext";
import { useCart } from "../../context/CartContext";
import CustomerReview from "../../components/customerReview/CostomerReview";
import PageNavigation from "../../components/PageNavigation";
import StarRating from "../../components/StarRating/StarRating";
import CartCountToggle from "../../components/CartCountToggle/CartCountToggle";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { getSingleProduct, isSingleProductLoading, singleProduct } =
    useProducts();
  const { dispatch, cart } = useCart();
  const { id } = useParams();
  const API = "https://dummyjson.com/products";

  useEffect(() => {
    if (id) {
      getSingleProduct(`${API}/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (singleProduct?.thumbnail) {
      setMainImage(singleProduct.thumbnail);
    }
  }, [singleProduct]);

  // 🔍 Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (singleProduct?.category) {
          const res = await fetch(
            `https://dummyjson.com/products/category/${singleProduct.category}`
          );
          const data = await res.json();
          const filtered = data.products.filter(
            (p) => p.id !== singleProduct.id
          );
          setRelatedProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };
    fetchRelatedProducts();
  }, [singleProduct]);

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please login first to add item to cart.");
      navigate("/login");
      return;
    }
    const itemInCart = cart.find((item) => item.id === singleProduct.id);
    if (itemInCart) {
      toast.warning("Item already in cart.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: singleProduct });
    toast.success(`${singleProduct.title} added to cart successfully`);
  };

  if (isSingleProductLoading) return <p>Loading product...</p>;

  const {
    title,
    description,
    price,
    rating,
    brand,
    category,
    images = [],
    reviews = [],
  } = singleProduct;

  return (
    <div className="single-product-container">
      <PageNavigation title={title} />

      <div className="product-wrapper">
        <div className="product-images">
          <div className="main-img-container">
            {mainImage ? (
              <img className="main-img" src={mainImage} alt={title} />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="gallery">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                onClick={() => setMainImage(img)}
                className={`thumb-img ${mainImage === img ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{title}</h1>
          <p className="brand">
            {brand} | {category}
          </p>
          <p className="rating">
            Rating: <StarRating rating={rating} /> ({rating}/5)
          </p>
          <p className="price">Price: ₹{price}</p>
          <p className="description">{description}</p>
          <button onClick={handleAddToCart} className="add-cart-btn">
            Add to Cart
          </button>
          <Link to="/products">
            <button className="back-btn">← Back to Products</button>
          </Link>
          <div className="customer-review-section">
            <h2>Customer Reviews</h2>
            <CustomerReview reviews={reviews} />
          </div>
        </div>
      </div>

      {/* Related Products Slider */}
      <div className="related-products-section">
        <h2 className="section-title">Related Products</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          cssMode={true}
          navigation={true}
          // pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
        >
          {relatedProducts.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                className="related-card"
                onClick={() => navigate(`/products/${item.id}`)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="related-img"
                />
                <h4 className="related-title">{item.title}</h4>
                <p className="related-price">₹{item.price}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetails;
