import Navbar from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.js";

const About = () => <h2 className="text-center mt-5">About Us</h2>;
const Contact = () => <h2 className="text-center mt-5">Contact Us</h2>;

const Anu = () => {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ensure this is here */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<About />} />
        <Route path="/logout" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Anu;
