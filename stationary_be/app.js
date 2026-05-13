const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
const userRoutes = require("./routes/userRoutes");

const productRoutes = require(
  "./routes/productRoutes"
);

const orderRoutes = require(
  "./routes/orderRoutes"
);

app.use(
  "/api/orders",
  orderRoutes
);

const uploadRoutes = require(
  "./routes/uploadRoutes"
);

app.use(
  "/api/upload",
  uploadRoutes
);


/* STATIC UPLOAD FOLDER */
app.use(
  "/uploads",

  express.static(
    path.join(
      __dirname,
      "/uploads"
    )
  )
);

const couponRoutes = require(
  "./routes/couponRoutes"
);

app.use(
  "/api/coupons",
  couponRoutes
);



app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

/* Default Route */
app.get("/", (req, res) => {
  res.send("Stationery Backend Running");
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});