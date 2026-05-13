import React, {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Auth.css";

function Register() {

  const navigate =
    useNavigate();

  /* STATES */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  /* HANDLE REGISTER */

  const handleRegister =
    async (e) => {

      e.preventDefault();

      /* VALIDATION */

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      try {

        setLoading(true);

        console.log(
          "Sending Register Data:",
          {
            name,
            email,
            password,
          }
        );

        /* API CALL */

        const response =
          await axios.post(
            "http://localhost:5000/api/users/register",
            {
              name,

              email:
                email.trim(),

              password,
            }
          );

        console.log(
          "REGISTER RESPONSE:",
          response.data
        );

        alert(
          "Registration Successful"
        );

        /* REDIRECT */

        navigate("/login");

      } catch (error) {

        console.log(
          "REGISTER ERROR:",
          error
        );

        alert(

          error.response?.data
            ?.message ||

          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="auth-page">

      <form
        className="auth-box"
        onSubmit={handleRegister}
      >

        <h2>
          Register
        </h2>

        {/* NAME */}

        <input
          type="text"

          placeholder="Enter Name"

          value={name}

          onChange={(e) =>
            setName(
              e.target.value
            )
          }

          required
        />

        {/* EMAIL */}

        <input
          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          required
        />

        {/* PASSWORD */}

        <input
          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          required
        />

        {/* CONFIRM PASSWORD */}

        <input
          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }

          required
        />

        {/* BUTTON */}

        <button
          type="submit"

          disabled={loading}
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

        {/* LOGIN LINK */}

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;