
import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "./Navbar";

import ProductCard from "./ProductCard";

import "./Shop.css";

function Shop() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",
    "Notebook",
    "Journal",
    "Pen",
    "Art Supplies",
    "Office",
  ];

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        setProducts(data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  return (
    <>
   

      <div className="shop-page">

        {/* Hero */}

        <div className="shop-hero">

          <h1>
            Shop Stationery
          </h1>

          <p>
            Discover premium notebooks,
            journals, pens, office supplies,
            and art essentials.
          </p>

        </div>

        {/* Layout */}

        <section className="shop-layout">

          {/* Sidebar */}

          <div className="filter-sidebar">

            <h2>
              Categories
            </h2>

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "active-category"
                    : ""
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          {/* Products Content */}

          <div className="products-content">

            {/* Search */}

            <div className="search-box">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            {/* Products */}

            {loading ? (

              <div className="loading-box">
                <h2>
                  Loading Products...
                </h2>
              </div>

            ) : (

              <div className="products-grid">

                {products

                  .filter((product) =>

                    product.name
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )
                  )

                  .filter((product) =>

                    category === "All"

                      ? true

                      : product.category ===
                        category
                  )

                  .map((product) => (

                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}

              </div>
            )}

          </div>

        </section>

      </div>
    </>
  );
}

export default Shop;
