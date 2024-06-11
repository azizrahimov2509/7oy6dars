import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(" SignUpuser:", user);

        updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.photo,
        })
          .then(() => {
            console.log("User profile updated:", user);
            localStorage.setItem(
              "user",
              JSON.stringify(auth.currentUser.providerData[0])
            );
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating profile: ", error);
            setError(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setError("You already have an account. Please log in.");
        } else {
          setError(error.message);
        }
        console.log(error.message);
      });

    setFormData({ email: "", password: "", name: "", photo: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg border border-gray-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="form-control mb-4">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
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
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name..."
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label" htmlFor="photo">
            <span className="label-text">Photo</span>
          </label>
          <input
            id="photo"
            type="url"
            placeholder="Enter your image link..."
            className="input input-bordered w-full"
            value={formData.photo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, photo: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            You already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
