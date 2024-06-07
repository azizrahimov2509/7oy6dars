import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login", user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          setError("Incorrect email or password. Please try signing up.");
        } else {
          setError(error.message);
        }
        console.log(error.message);
      });

    setLoginData({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg border border-gray-300"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="form-control mb-4">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input input-bordered w-full"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            className="input input-bordered w-full"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account yet?
            <Link to="/signUp" className="link link-primary ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
