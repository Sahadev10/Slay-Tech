// import React from "react";


// const Vr = () => {
//   return (
//     <div className="relative w-full h-screen">
//       {/* Fullscreen iframe */}
//       <iframe
//         src="https://yisol-idm-vton.hf.space/"
//         frameBorder="0"
//         className="absolute inset-0 w-full h-full z-0"
//       ></iframe>

//       {/* Navbar */}
//       <div className="absolute top-0 left-0 w-full h-28 bg-black text-white z-10 flex flex-col items-center justify-center space-y-1">
//         <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Virtual Try On
//         </div>
//         <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Slay in your own style
//         </div>
//       </div>

//       {/* Thin gradient line flush below navbar */}
//       <div className="absolute top-[7rem] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-10"></div>
//     </div>
//   );
// };

// export default Vr;


// Vr.jsx
// import React from "react";
// import SaveGeneratedImage from "./SaveGeneratedImage"; // Ensure correct path
// import { jwtDecode } from 'jwt-decode';

// const Vr = () => {
//   const token = localStorage.getItem('token');
//   const decoded = jwtDecode(token);

        

//   // const userId = "76"; // 🔁 Replace with actual dynamic logic if needed
//   const userId = decoded.sub;
//   console.log("uuuuuswwwwrrridd" ,userId);
//   return (
//     <div className="relative w-full h-screen">
//       {/* Fullscreen iframe */}
//       <iframe
//         src={`https://yisol-idm-vton.hf.space/?user_id=${userId}`}
//         frameBorder="0"
//         className="absolute inset-0 w-full h-full z-0"
//         title="Virtual Try On"
//       ></iframe>

//       {/* Navbar */}
//       <div className="absolute top-0 left-0 w-full h-28 bg-black text-white z-10 flex flex-col items-center justify-center space-y-1">
//         <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Virtual Try On
//         </div>
//         <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Slay in your own style
//         </div>
//       </div>

//       {/* Gradient line */}
//       <div className="absolute top-[7rem] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-10"></div>

//       {/* Save Image Component */}
//       <SaveGeneratedImage userId={userId} />
//     </div>
//   );
// };

// export default Vr;




import React from "react";
import SaveGeneratedImage from "./SaveGeneratedImage";
import { jwtDecode } from 'jwt-decode';


const Vr = () => {
  const token = localStorage.getItem("token");

  if (!token || typeof token !== "string") {
    // No valid token found
    return <div>Please log in to continue.</div>;
  }

  let userId;

  try {
    const decoded = jwtDecode(token);
    userId = decoded?.sub;
  } catch (err) {
    console.error("Invalid token:", err);
    return <div>Invalid session. Please log in again.</div>;
  }

  if (!userId) {
    return <div>User ID not found in token.</div>;
  }

  return (
    <div className="relative w-full h-screen">
      <iframe
        src={`https://yisol-idm-vton.hf.space/?user_id=${userId}`}
        frameBorder="0"
        className="absolute inset-0 w-full h-full z-0"
        title="Virtual Try On"
      ></iframe>

      <div className="absolute top-0 left-0 w-full h-28 bg-black text-white z-10 flex flex-col items-center justify-center space-y-1">
        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Virtual Try On
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Slay in your own style
        </div>
      </div>

      <div className="absolute top-[7rem] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-10"></div>

      <SaveGeneratedImage userId={userId} />
    </div>
  );
};

export default Vr;
