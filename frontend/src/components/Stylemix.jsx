// // import React from "react";

// // const Stylemix = () => {
// //   return (
// //     <div className="flex justify-center items-center p-4">
// //       <iframe
// //         // src="https://yisol-idm-vton.hf.space"
// //         // src="https://huggingface.co/spaces/uhdessai/StyleMixing"
// //         src="https://weshopai-weshopai-virtual-try-on.hf.space"
// //         frameBorder="0"
// //         width="850"
// //         height="450"
// //         className="rounded-lg shadow-lg"
// //         title="Virtual Try-On"
// //       ></iframe>
// //     </div>
// //   );
// // };

// // export default Stylemix;



// import React from "react";

// const Stylemix = () => {
//   return (
//     <div className="flex justify-center items-center p-4">
//       <a
//         href="https://huggingface.co/spaces/uhdessai/StyleMixing"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
//       >
//         Style mix
//       </a>
//     </div>
//   );
// };

// export default Stylemix;


import React from "react";

const Stylemix = () => {
  const handleRedirect = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/customisation/style/stylemix-redirect", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirectUrl;
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
        Style mix
      </button>
    </div>
  );
};

export default Stylemix;

