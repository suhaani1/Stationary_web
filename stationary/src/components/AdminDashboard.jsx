import React, { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [uploading, setUploading] = useState(false);

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    image: "",
    price: "",
    countInStock: "",
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config,
      );

      setFormData({
        ...formData,
        image: `http://localhost:5000${data}`,
      });

      setUploading(false);
    } catch (error) {
      console.log(error);

      setUploading(false);
    }
  };
  /* FETCH PRODUCTS */

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")

      .then((res) => {
        setProducts(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* HANDLE INPUTS */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ADD PRODUCT */

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", formData);

      alert("Product Added");

      fetchProducts();

      setFormData({
        name: "",
        brand: "",
        category: "",
        description: "",
        image: "",
        price: "",
        countInStock: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* DELETE PRODUCT */

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* START EDIT */

  const startEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    });
  };

  /* UPDATE PRODUCT */

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
        formData,
      );

      alert("Product Updated");

      setEditingId(null);

      fetchProducts();

      setFormData({
        name: "",
        brand: "",
        category: "",
        description: "",
        image: "",
        price: "",
        countInStock: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className='admin-page'>
        <h1>Admin Dashboard</h1>

        {/* FORM */}

        <form
          className='product-form'
          onSubmit={editingId ? updateProduct : addProduct}
        >
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

          <input
            type='text'
            name='name'
            placeholder='Product Name'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='brand'
            placeholder='Brand'
            value={formData.brand}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='category'
            placeholder='Category'
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input type='file' onChange={uploadFileHandler} />

          {uploading && <p>Uploading...</p>}
          <input
            type='number'
            name='price'
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type='number'
            name='countInStock'
            placeholder='Stock'
            value={formData.countInStock}
            onChange={handleChange}
            required
          />

          <textarea
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type='submit'>
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* PRODUCTS */}

        <div className='admin-products'>
          <h2>All Products</h2>

          <div className='admin-grid'>
            {products.map((product) => (
              <div className='admin-card' key={product._id}>
                <img src={product.image} alt={product.name} />

                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

                <button className='edit-btn' onClick={() => startEdit(product)}>
                  Edit
                </button>

                <button
                  className='delete-btn'
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
