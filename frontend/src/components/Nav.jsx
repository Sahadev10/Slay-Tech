import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, UserCircle2, ShoppingCart, Camera, Shirt } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-xl fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
            Slaytech
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <Home className="w-4 h-4 group-hover:text-purple-400" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/vr" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <Shirt className="w-4 h-4 group-hover:text-purple-400" />
              <span>Virtual Try-On</span>
            </Link>
          </li>
          <li>
            <Link to="/measure" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <Shirt className="w-4 h-4 group-hover:text-purple-400" />
              <span>Measure</span>
            </Link>
          </li>
          <li>
            <Link to="/social" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <Camera className="w-4 h-4 group-hover:text-purple-400" />
              <span>Social Gallery</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <UserCircle2 className="w-4 h-4 group-hover:text-purple-400" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/sm" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group relative">
              <ShoppingCart className="w-4 h-4 group-hover:text-purple-400" />
              <span>Fusion</span>
              
            </Link>
          </li>
          <li className="ml-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/LoginReg"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            Home
          </Link>
          <Link to="/vr" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            Virtual Try-On
          </Link>
          <Link to="/social" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            Social Gallery
          </Link>
          <Link to="/profile" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            Profile
          </Link>
          <Link to="/sm" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            Fusion
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors w-full text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/LoginReg"
              className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors w-full text-left"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;