


import React from "react";

const Vr = () => {
  const userId = ''; // Retrieve this from JWT after decoding it (or from auth context)

  return (
    <div className="flex justify-center items-center p-4">
      <a
        href={`https://kwai-kolors-kolors-virtual-try-on.hf.space?user_id=${userId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Open Virtual Try-On App
      </a>
    </div>
  );
};


export default Vr;


// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode"; // ✅ This works with the latest version


// const Vrk = () => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // or wherever your JWT is stored
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         // Adjust this according to the actual key in your JWT payload
//         setUserId(decoded.userId || decoded.userid || decoded.sub || null);
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     }
//   }, []);

//   if (!userId) return <p>Loading user info...</p>;

//   return (
//     <div className="flex justify-center items-center p-4">
//       <a
//         href={`https://kwai-kolors-kolors-virtual-try-on.hf.space?user_id=${userId}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
//       >
//         Open Virtual Try-On App
//       </a>
//     </div>
//   );
// };

// export default Vrk;

