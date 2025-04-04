// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-600 p-4 shadow-lg
// ">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">Slaytech</h1>
//         <ul className="flex space-x-6">
//         <ul className="flex items-center gap-6">
//   <li>
//     <Link to="/" className="text-white hover:text-gray-200 italic">Home</Link>
//   </li>
//   <li>
//     <Link to="/profile" className="text-white hover:text-gray-200 italic">User Profile</Link>
//   </li>
//   <li>
//     <Link to="/sc" className="text-white hover:text-gray-200 italic">social gallery</Link>
//   </li>

//   <li>
//     <Link to="/cart" className="text-white hover:text-gray-200 italic">Cart</Link>
//   </li>
//   <li>
//     <Link to="/logout">
//       <button className="text-gray-800 hover:text-gray-600 italic bg-white px-4 py-2 rounded border border-gray-300 shadow">
//         User Profile
//       </button>
//     </Link>
//   </li>
// </ul>

//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { Home, UserCircle2, ShoppingCart, LogOut, Camera, Shirt } from "lucide-react";
const token = localStorage.getItem('token');


const handleLogout = () => {
  localStorage.removeItem('token'); // Clear token
  window.location.reload(); // Reload page to log out
};

const Navbar = () => {
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
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Home className="w-4 h-4 group-hover:text-purple-400" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vr"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Shirt className="w-4 h-4 group-hover:text-purple-400" />
              <span>Virtual Try-On</span>
            </Link>
          </li>
          <li>
            <Link
              to="/social"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Camera className="w-4 h-4 group-hover:text-purple-400" />
              <span>Social Gallery</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <UserCircle2 className="w-4 h-4 group-hover:text-purple-400" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group relative"
            >
              <ShoppingCart className="w-4 h-4 group-hover:text-purple-400" />
              <span>Cart</span>
              <span className="absolute -top-2 -right-4 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </li>
          <li className="ml-4">
            {/* <Link
              to="/logout"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Link> */}

<button
  onClick={handleLogout}
  className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors w-full text-left"
>
  Logout
</button>

          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/vr"
            className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          >
            Virtual Try-On
          </Link>
          <Link
            to="/social"
            className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          >
            Social Gallery
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          >
            Profile
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          >
            Cart
          </Link>
          <Link  onClick={handleLogout

          }
            to="/logout"
            className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;