// WelcomePage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./WelcomePage.css";


import journalImg from "../assets/journal.jpeg";
import notebookImg from "../assets/notebook.jpg";
import penImg from "../assets/pen.jpg";
import artistImg from "../assets/arts.jpg";

function WelcomePage() {
  const [subscribed, setSubscribed] = useState(false);

  const cards = [
    {
      title: "Journals",
      desc: "Hand-bound leather journals with cream archival paper.",
      img: journalImg,
    },
    {
      title: "Notebooks",
      desc: "Minimal notebooks designed for thinkers.",
      img: notebookImg,
    },
    {
      title: "Writing Tools",
      desc: "Pens and ink sets for premium writing.",
      img: penImg,
    },
    {
      title: "Art Supplies",
      desc: "High-quality art materials for creative expression.",
      img: artistImg,
    },
  ];

  return (
    <div className="main-container">

      {/* Navbar */}
      {/* <nav className="navbar">
        <h1 className="logo">Paperie & Co.</h1>

        <div className="nav-links">
          <a href="#collections">Collections</a>
          <a href="#contact">Contact</a>

          <button className="shop-btn">Shop Now</button>
        </div>
      </nav> */}

      {/* Hero */}
      <section className="hero">
        <p>THOUGHTFULLY CRAFTED STATIONERY</p>

        <h1>Where Every Page Tells a Story</h1>

        <p className="hero-text">
          Discover journals, notebooks, and writing essentials designed to inspire creativity.
        </p>

        <div className="hero-buttons">
         <Link to="/collections">
         <button className="primary-btn">Explore Collections</button></Link> 
          <button className="secondary-btn">Our Story</button>
        </div>
      </section>

      {/* Collections */}
      

<section id="collections" className="collections">
  <h2>Our Collections</h2>

  <div className="card-container">
    {cards.map((item, index) => (
      <div className="card" key={index}>

        <img
          src={item.img}
          alt={item.title}
          className="collection-img"
        />

        <h3>{item.title}</h3>
        <p>{item.desc}</p>

      </div>
    ))}
  </div>

  {/* Button After All Collections */}
  <div className="collection-btn-box">
    <Link to="/collections">
      <button className="view-btn">
        View All Collections
      </button>
    </Link>
  </div>

</section>

      {/* Contact */}
      <section id="contact" className="contact">
        <h2>Stay Inspired</h2>

        <p>Join our newsletter for new collections and offers.</p>

        <div style={{ marginTop: "20px" }}>
          <input type="email" placeholder="Your email address" />

          <button onClick={() => setSubscribed(true)}>
            {subscribed ? "Subscribed ✓" : "Subscribe"}
          </button>
        </div>
      </section>

      {/* Footer */}
     

<footer className="footer">

  <div className="footer-container">

    {/* Left Side */}
    <div className="footer-info">
      <h2>Sri Radha Vallab Agency</h2>

      <p>
        Crafted with care for those who love the written word.
      </p>

      <p className="footer-location">
        📍 Panch mukhi hanuman mandir, West Boring Canal Rd, Sri Krishna Nagar, Kidwaipuri, Patna, Bihar 800001
      </p>
    </div>

    {/* Right Side Map */}
    <div className="footer-map">
      <iframe
        title="Location Map"
        src="https://www.google.com/maps/place/Sri+Radha+Vallab+Agency,+Classmate+%26+Doms/@25.6002585,85.0966515,14z/data=!4m6!3m5!1s0x39ed5953f027242b:0x9ad3e2a809b4e5e4!8m2!3d25.617089!4d85.122733!16s%2Fg%2F11wj0cjwfq?entry=tts&g_ep=EgoyMDI2MDQyMC4wIPu8ASoASAFQAw%3D%3D&skid=0b49e5c0-8898-49ee-b27c-cc46d3c2d6e8"
        allowFullScreen=""
      ></iframe>
    </div>

  </div>

</footer>

    </div>
  );
}

export default WelcomePage;