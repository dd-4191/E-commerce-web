import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About DD-SHOP</h1>
        <p>Your one-stop solution for smart shopping!</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Who We Are</h2>
          <p>
            At <strong>DD-SHOP</strong>, we're passionate about making online
            shopping easy, reliable, and affordable. From gadgets to fashion, we
            bring you a wide range of top-quality products.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            To provide customers with an exceptional shopping experience by
            combining technology, design, and service — all at your fingertips.
          </p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li> Fast & Secure Checkout</li>
            <li> Curated Quality Products</li>
            <li> 24/7 Customer Support</li>
            <li> Easy Returns & Refunds</li>
          </ul>
        </section>

        <section className="about-team">
          <h2>Meet the Creator</h2>
          <div className="team-card">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Devendra"
              className="team-avatar"
            />
            <div>
              <h3>Devendra</h3>
              <p>Frontend Developer</p>
              <p>
                Built this project using React.js, Context API, and modern UI/UX
                practices to deliver a seamless user experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
