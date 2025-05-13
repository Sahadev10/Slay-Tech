// import Navbar from "./components/Nav.jsx";
// import Home from "./components/Home.jsx";
// import { Routes, Route } from "react-router-dom";
// import Profile from "./components/Profile.js";
// import SCGallery from "./components/scgallery.jsx";

// const About = () => <h2 className="text-center mt-5">About Us</h2>;
// const Contact = () => <h2 className="text-center mt-5">Contact Us</h2>;

// const Anu = () => {
//   return (
//     <div >
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Ensure this is here */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cart" element={<About />} />
//         <Route path="/logout" element={<Contact />} />
//         <Route path="/sc" element={<SCGallery />} />
//       </Routes>
//     </div>
//   );
// };

// export default Anu;


import Navbar from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import Urpic from "./components/pic";
import { Cart } from './components/Cart';
import Dress from "./components/dress";
import Socio from "./components/social";
import Vr from "./components/vr.jsx";
import Footer from "./components/Footer.jsx";
import Stylemix from "./components/Stylemix.jsx";
import GenBrazer from "./components/gen_blazer.jsx";
import GenDress from "./components/gen_dress.jsx";
import GenTop from "./components/gen_top.jsx";
import "./Anu.css";
import BodyMeasure from "./components/measurement.jsx";

const About = () => <h2 className="text-center mt-5">About Us</h2>;
const Contact = () => <h2 className="text-center mt-5">Contact Us</h2>;

const Anu = () => {
  return (
<>
  <Navbar />
  <div className="main-content"> {/* Add padding to push content down */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/vr" element={<Vr />} />
      <Route path="/sm" element={<Stylemix />} />
      <Route path="/social" element={<Socio />} />
      <Route path="/picture" element={<Urpic />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/logout" element={<Contact />} />
      <Route path="/dress" element={<Dress />} />
      <Route path="/genblazer" element={<GenBrazer />} />
      <Route path="/gendress" element={<GenDress />} />
      <Route path="/gentop" element={<GenTop />} />
      <Route path="/measure" element={<BodyMeasure />} />
      
    </Routes>
  </div>
  <Footer className="footer" />
</>

  );
};

export default Anu;