// About.jsx

import React from "react";
import "./About.css";
import Navbar from "./Navbar";   // correct path if same folder

function About() {
  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* About Page */}
      <div className="about-page">

        {/* Hero */}
        <section className="about-hero">
          <p className="about-tag">ABOUT US</p>

          <h1>Sri Radha Vallab Agency</h1>

          <p className="about-subtext">
            Your Success, Our Commitment. Trusted distributor of premium
            stationery brands with quality service and customer satisfaction.
          </p>
        </section>

        {/* Story */}
        <section className="about-section">

          <div className="about-content">
            <h2>Who We Are</h2>

            <p>
              Sri Radha Vallab Agency is a trusted stationery distributor
              dealing in top brands like <strong>Classmate</strong>,
              <strong> Doms</strong>, <strong> Hauser</strong> and <strong> Paperkraft</strong>.
            </p>

            <p>
              We supply notebooks, pens, art materials, office essentials,
              school stationery, premium writing products, and corporate
              stationery solutions.
            </p>

            <p>
              Our commitment is to deliver genuine products, timely service,
              and long-term trust with retailers, schools, offices,
              and customers.
            </p>
          </div>

          <div className="about-image">
            <img src="/src/assets/about.jpg" alt="Stationery Products" />
          </div>

        </section>

        {/* Brands */}
        <section className="values-section">
          <h2>Brands We Deal In</h2>

          <div className="value-cards">

            <div className="value-card">
              <h3>Classmate</h3>
              <p>Premium notebooks, registers, and student essentials.</p>
            </div>

            <div className="value-card">
              <h3>Doms</h3>
              <p>Pens, pencils, colors, geometry boxes, and art products.</p>
            </div>

            <div className="value-card">
              <h3>Hauser</h3>
              <p>Luxury notebooks, diaries, and premium office stationery.</p>
            </div>

            <div className="value-card">
              <h3>Paperkraft</h3>
              <p>Luxury notebooks, diaries, and premium office stationery.</p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <section className="about-footer">
          <h2>Your Success, Our Commitment</h2>
          <p>Authorized & trusted stationery supply partner.</p>
        </section>

      </div>
    </>
  );
}

export default About;