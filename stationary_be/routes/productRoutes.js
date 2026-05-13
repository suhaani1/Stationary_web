const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
} = require(
  "../controllers/productController"
);

router.route("/")
  .get(getProducts)
  .post(createProduct);
router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.post(
  "/:id/reviews",
  createReview
);

module.exports = router;