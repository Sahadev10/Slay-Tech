import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-600 p-4 shadow-lg
">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Slaytech</h1>
        <ul className="flex space-x-6">
        <ul className="flex items-center gap-6">
  <li>
    <Link to="/" className="text-white hover:text-gray-200 italic">Home</Link>
  </li>
  <li>
    <Link to="/profile" className="text-white hover:text-gray-200 italic">User Profile</Link>
  </li>
  <li>
    <Link to="/cart" className="text-white hover:text-gray-200 italic">Cart</Link>
  </li>
  <li>
    <Link to="/logout">
      <button className="text-gray-800 hover:text-gray-600 italic bg-white px-4 py-2 rounded border border-gray-300 shadow">
        User Profile
      </button>
    </Link>
  </li>
</ul>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
