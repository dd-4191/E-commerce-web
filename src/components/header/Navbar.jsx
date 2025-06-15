import React, { useState } from "react";
import "./Navbar.css";
import "../../../src/global.css";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa6";
import { CgLogIn, CgLogOut, CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/productContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const { allProducts } = useProducts(); //  Get all products
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(true);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate("/");
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      toast.warning("Please login first to access your cart.");
      navigate("/login");
    }
  };

  //  Filter logic for search dropdown
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="navbar">
        <GiHamburgerMenu className="icon burger-icon" onClick={toggleMenu} />
        <div className="logo" onClick={() => navigate("/")}>
          DD-SHOP
        </div>

        {/*  Search input with dropdown */}
        <div className="search-input" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <BiSearchAlt className="icon search-icon" onClick={handleSearch} />

          {searchTerm.trim() !== "" && (
            <ul className="search-dropdown">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 5).map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      navigate(`/products/${product.id}`);
                      setSearchTerm("");
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      width="30"
                    />
                    <span>{product.title}</span>
                  </li>
                ))
              ) : (
                <li className="no-results">No products found 😔</li>
              )}
            </ul>
          )}
        </div>

        <div className={!isMenuOpen ? "nav-links active" : " nav-links"}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/products" onClick={closeMenu}>
            All-Products
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {!user ? (
            <div className="login">
              <Link to="/login" onClick={closeMenu}>
                <CgLogIn className="icon" />
                <span>Login</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-count" onClick={handleCartClick}>
                <span>{cart.length}</span>
                <FaCartPlus className="icon" />
              </div>
              <div className="profile-dropdown">
                <div className="profile-icon" onClick={toggleDropdown}>
                  <Link to="/profile" onClick={closeMenu}>
                    <CgProfile className="icon" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
