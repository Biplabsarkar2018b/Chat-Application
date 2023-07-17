import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../commons/Urls";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const diapatch = useDispatch();
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    }
    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Proceed with login logic here

    // console.log("Logged in!");

    axios
      .post(`${BASE_URL}/createUser`, { mobile: mobileNumber, name })
      .then((response) => {
        diapatch(setUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
