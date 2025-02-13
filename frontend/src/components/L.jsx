import { useNavigate } from "react-router-dom";
const CustomizeButton = ({ redirectPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const isLoggedIn = false; //kept false for trisl
    navigate(isLoggedIn ? redirectPath : "/LoginReg");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
    >
      CUSTOMIZE
    </button>
  );
};

export default CustomizeButton;
