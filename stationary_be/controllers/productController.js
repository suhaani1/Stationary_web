const Product = require("../models/Product");

/* GET PRODUCTS */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* GET SINGLE PRODUCT */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* CREATE PRODUCT */
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* UPDATE PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.description = req.body.description;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE PRODUCT */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "Product Removed",
      });
    } else {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* CREATE REVIEW */
exports.createReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.name === req.body.name,
      );

      if (alreadyReviewed) {
        return res.status(400).json({
          message: "You already reviewed this product",
        });
      }

      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      res.status(201).json({
        message: "Review Added",
      });
    } else {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
