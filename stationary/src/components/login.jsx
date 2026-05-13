import React, { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "./Auth.css";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      /* Validation */

      if (!email || !password) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        console.log(
          "Sending Login Data:",
          {
            email,
            password,
          }
        );

        /* API CALL */

        const response =
          await axios.post(
            "http://localhost:5000/api/users/login",
            {
              email: email.trim(),
              password,
            }
          );

        console.log(
          "Login Response:",
          response.data
        );

        /* SAVE USER */

        localStorage.setItem(
          "userInfo",

          JSON.stringify(
            response.data
          )
        );

        alert(
          "Login Successful"
        );

        /* REDIRECT */

        navigate("/");

      } catch (error) {

        console.log(
          "LOGIN ERROR:",
          error
        );

        alert(

          error.response?.data
            ?.message ||

          "Login Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="auth-page">

      <form
        className="auth-box"
        onSubmit={handleLogin}
      >

        <h2>
          Login
        </h2>

        {/* Email */}

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

        {/* Password */}

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

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

        {/* Register */}

        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;