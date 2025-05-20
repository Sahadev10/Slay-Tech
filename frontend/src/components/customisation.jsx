import React, { useState } from "react";

const customization = () => {
  const [loading, setLoading] = useState(false);

  const handleRedirect = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/customisation/cust/image", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.redirectUrl, "_blank");
      } else {
        alert("Failed to redirect: " + response.statusText);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };
//func for handling second space
   const handleRedirect2 = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/customisation/cust/image", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.redirectUrl, "_blank");
      } else {
        alert("Failed to redirect: " + response.statusText);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full h-[495px] flex flex-col justify-center items-center bg-white relative overflow-hidden text-center px-4">
    {/* Background animation blobs */}
    <span className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-3xl"></span>
    <span className="absolute -bottom-32 -right-16 w-96 h-96 bg-indigo-500 rounded-full opacity-40 animate-pulse mix-blend-multiply filter blur-3xl"></span>

    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 z-10">
      Customization
    </h1>
    <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mt-4 mb-10 z-10">
      Customize your experience with our advanced customization options. Choose the perfect settings to suit your needs and preferences.
    </p>

    {/* Buttons container */}
    <div className="flex flex-wrap justify-center gap-6 z-10">
      {/* Button 1 */}
      <button
        onClick={handleRedirect}
        disabled={loading}
        className={`relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white rounded-full shadow-2xl transition-transform duration-500 transform
          bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-80
          ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
          hover:scale-105 active:scale-95
        `}
      >
        {loading ? (
          <>
            <svg
              className="w-6 h-6 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "option a"
        )}
        <span className="absolute bottom-1 left-1/4 w-1/2 h-1 bg-white rounded-full opacity-30 animate-pulse"></span>
      </button>

      {/* Button 2 */}
      <button
        onClick={handleRedirect2}
        disabled={loading}
        className={`relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white rounded-full shadow-2xl transition-transform duration-500 transform
          bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-80
          ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
          hover:scale-105 active:scale-95
        `}
      >
        {loading ? (
          <>
            <svg
              className="w-6 h-6 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "Option b"
        )}
        <span className="absolute bottom-1 left-1/4 w-1/2 h-1 bg-white rounded-full opacity-30 animate-pulse"></span>
      </button>
    </div>
  </div>
);

};

export default customization;
