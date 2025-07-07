// import React from "react";
// import { Link } from "react-router-dom";
// import L from "./L.jsx";
// import Footer from "./Footer.jsx";
// /*import "./Home.css";*/
// const Home = () => {
//   return (
//     <div>
     
//     <div className="flex justify-between items-center mt-10 px-10">
//   {/* Text on the Left */}
//   <div className="flex flex-col items-start mt-5">
//   <h2 className="text-2xl font-bold text-gray-700">
//     Create, Customize, Conquer 
//     – Slay Your Way! <br />
//     Mix Colors, Switch Sleeves, <br />
//     Own Your Style!
//   </h2>

//   {/* Button below the text */}
//   <L redirectPath="/customization" />
// </div>


//   {/* Large rfytCircle shifted to the Right */}
//   <div className="w-160 h-130 bg-gray-400 rounded-full overflow-hidden shadow-lg">
//   <img src="/public/images/a.jpg" alt="Circle" className="w-full h-full object-cover" />

//   </div>
// </div>

// <br />
// <br />
// <div className="mt-6 w-full h-32 bg-gray-300 rounded-tr-full rounded-bl-full shadow-lg flex items-center justify-center">
// <p className="text-3xl italic font-semibold text-gray-700">
//     FUSE YOUR CLOTHES
//   </p>
// </div>

// <br />
// <br />



// <div className="flex justify-center items-center space-x-40 mt-6">
//   <div className="flex flex-col items-center">
//     <Link to="www.google.com">
//       <img src="/public/images/i1.jpg" alt="Image 1" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
//     </Link>
//     <p className="mt-2 text-lg font-semibold text-gray-700">Dress</p>
//   </div>
//   <div className="flex flex-col items-center">
//     <Link to="/page2">
//       <img src="/public/images/i2.jpg" alt="Image 2" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
//     </Link>
//     <p className="mt-2 text-lg font-semibold text-gray-700">Tops</p>
//   </div>
//   {/* 
// <div className="flex flex-col items-center">
//     <Link to="/page3">
//       <img src="/path-to-image3.jpg" alt="Image 3" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
//     </Link>
//     <p className="mt-2 text-lg font-semibold text-gray-700">Bottomwear</p>
// </div> 
// */}

//   <div className="flex flex-col items-center">
//     <Link to="/page4">
//       <img src="/public/images/i3.jpg" alt="Image 4" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
//     </Link>
//     <p className="mt-2 text-lg font-semibold text-gray-700">men</p>
//   </div>
// </div>

// <br />
// <Footer />


// </div>



//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import L from "./L.jsx";

import Dress from "./dress"
/*import "./Home.css";*/
const Home = () => {
  return (
    <div>
     
    <div className="flex justify-between items-center mt-10 px-10">
  {/* Text on the Left */}
  <div className="flex flex-col items-start mt-5">
  <h2 className="text-2xl font-bold text-gray-700">
    Create, Customize, Conquer 
    – Slay Your Way! <br />
    Mix Colors, Switch Sleeves, <br />
    Own Your Style!
  </h2>

  {/* Button below the text */}
  {/* <L redirectPath="/customization" /> */}
  <Link
    to="/customization"
    className="text-3xl italic font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-200"
  >
    Customisation
  </Link>
</div>


  {/* Large rfytCircle shifted to the Right */}
  <div className="w-160 h-130 bg-gray-400 rounded-full overflow-hidden shadow-lg">
  <img src="/public/images/a.jpg" alt="Circle" className="w-full h-full object-cover" />

  </div>
</div>

<br />
<br />
{/* <div className="mt-6 w-full h-32 bg-gray-300 rounded-tr-full rounded-bl-full shadow-lg flex items-center justify-center">
  <p className="text-3xl italic font-semibold text-gray-700">
   FUSE THE CLOTHES
  </p>
</div> */}

<div className="mt-6 w-full h-32 bg-gray-300 rounded-tr-full rounded-bl-full shadow-lg flex items-center justify-center">
  <Link
    to="/sm"
    className="text-3xl italic font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-200"
  >
    GENERATE NEW CLOTHES
  </Link>
</div>



<br />
<br />



<div className="flex justify-center items-center space-x-40 mt-6">
  <div className="flex flex-col items-center">
    <Link to="/dress">
      <img src="/public/images/i1.jpg" alt="Image 1" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
    </Link>
    <p className="mt-2 text-lg font-semibold text-gray-700">Dress</p>
  </div>
  <div className="flex flex-col items-center">
    <Link to="/gentop">
      <img src="/public/images/i2.jpg" alt="Image 2" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
    </Link>
    <p className="mt-2 text-lg font-semibold text-gray-700">Tops</p>
  </div>
  {/* 
<div className="flex flex-col items-center">
    <Link to="/page3">
      <img src="/path-to-image3.jpg" alt="Image 3" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
    </Link>
    <p className="mt-2 text-lg font-semibold text-gray-700">Bottomwear</p>
</div> 
*/}

  <div className="flex flex-col items-center">
    <Link to="/genblazer">
      <img src="/public/images/i3.jpg" alt="Image 4" className="w-40 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
    </Link>
    <p className="mt-2 text-lg font-semibold text-gray-700">Blazer</p>
  </div>
</div>

<br />



</div>



  );
};

export default Home;