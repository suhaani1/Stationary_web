// Collections.jsx

import React from "react";
import "./Collections.css";


import journalImg from "../assets/journal.jpeg";
import notebookImg from "../assets/notebook.jpg";
import penImg from "../assets/pen.jpg";

function Collections() {
  const items = [
    {
      title: "Journals",
      desc: "Premium leather journals for daily writing.",
      img: journalImg,
    },
    {
      title: "Notebooks",
      desc: "Classmate notebooks for school & office use.",
      img: notebookImg,
    },
    {
      title: "Writing Tools",
      desc: "Doms pens, pencils and art supplies.",
      img: penImg,
    },
    {
      title: "Diaries",
      desc: "Elegant Paperkraft diaries & planners.",
      img: journalImg,
    },
    {
      title: "Registers",
      desc: "Strong binding office registers.",
      img: notebookImg,
    },
    {
      title: "Art Materials",
      desc: "Sketch pens, colors & geometry kits.",
      img: penImg,
    },
  ];

  return (
    <>
      

      <div className="collections-page">

        {/* Hero */}
        <section className="collections-hero">
          <p>OUR COLLECTIONS</p>
          <h1>Explore Premium Stationery</h1>
          <span>
            Discover notebooks, journals, pens and more.
          </span>
        </section>

        {/* Collection Grid */}
        <section className="collections-section">

          <div className="collections-grid">
            {items.map((item, index) => (
              <div className="collection-card" key={index}>

                <img
                  src={item.img}
                  alt={item.title}
                  className="collection-img"
                />

                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <button>View More</button>

              </div>
            ))}
          </div>

        </section>

      </div>
    </>
  );
}

export default Collections;