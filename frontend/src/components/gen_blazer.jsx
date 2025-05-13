
import React from "react";

const GenBrazer = () => {
  const handleRedirect = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/images/gen/blazer", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // window.location.href = data.redirectUrl;
      window.open(data.redirectUrl, "_blank");

    } else {
      alert("Failed to redirect: " + response.statusText);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <button
        onClick={handleRedirect}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Gen Blazer
      </button>
    </div>
  );
};

export default GenBrazer;
