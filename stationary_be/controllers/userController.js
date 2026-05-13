// const User =
// require("../models/User");

// const bcrypt =
// require("bcryptjs");

// const jwt =
// require("jsonwebtoken");

// /* REGISTER */

// exports.registerUser =
// async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       password,
//     } = req.body;

//     const userExists =
//       await User.findOne({
//         email,
//       });

//     if (userExists) {

//       return res.status(400).json({
//         message:
//           "User already exists",
//       });
//     }

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         10
//       );

//     const user =
//       await User.create({

//         name,

//         email,

//         password:
//           hashedPassword,
//       });

//     res.status(201).json({

//       _id: user._id,

//       name: user.name,

//       email: user.email,
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message:
//         "Server Error",
//     });
//   }
// };

// /* LOGIN */

// exports.loginUser =
// async (req, res) => {

//   try {

//     const {
//       email,
//       password,
//     } = req.body;

//     const user =
//       await User.findOne({
//         email,
//       });

//     if (!user) {

//       return res.status(401).json({
//         message:
//           "User not found",
//       });
//     }

//     const isMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       );

//     if (!isMatch) {

//       return res.status(401).json({
//         message:
//           "Invalid password",
//       });
//     }

//     const token =
//       jwt.sign(

//         { id: user._id },

//         process.env.JWT_SECRET,

//         {
//           expiresIn: "30d",
//         }
//       );

//     res.json({

//       _id: user._id,

//       name: user.name,

//       email: user.email,

//       isAdmin: user.isAdmin,

//       token,
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message:
//         "Server Error",
//     });
//   }
// };




const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

/* =========================
   REGISTER USER
========================= */

exports.registerUser =
async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    /* CHECK USER */

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    /* HASH PASSWORD */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /* CREATE USER */

    const user =
      await User.create({

        name,

        email:

          email.toLowerCase(),

        password:
          hashedPassword,
      });

    /* RESPONSE */

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

/* =========================
   LOGIN USER
========================= */

exports.loginUser =
async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    console.log(
      "LOGIN REQUEST:",
      email,
      password
    );

    /* FIND USER */

    const user =
      await User.findOne({

        email:
          email.toLowerCase(),
      });

    console.log(
      "USER FOUND:",
      user
    );

    if (!user) {

      return res.status(401).json({
        message:
          "User not found",
      });
    }

    /* CHECK PASSWORD */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {

      return res.status(401).json({
        message:
          "Invalid password",
      });
    }

    /* GENERATE TOKEN */

    const token =
      jwt.sign(

        { id: user._id },

        process.env.JWT_SECRET,

        {
          expiresIn: "30d",
        }
      );

    /* SUCCESS */

    res.status(200).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      isAdmin:
        user.isAdmin,

      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

exports.updateUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (user) {

        user.name =
          req.body.name ||
          user.name;

        user.email =
          req.body.email ||
          user.email;

        if (
          req.body.password
        ) {

          user.password =
            req.body.password;
        }

        const updatedUser =
          await user.save();

        res.json(
          updatedUser
        );

      } else {

        res.status(404);

        throw new Error(
          "User not found"
        );
      }

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
};