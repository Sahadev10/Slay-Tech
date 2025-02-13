import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Anu from "./Anu.jsx"; 
import LoginReg from "./LoginReg/LoginReg.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route (Landing Page) */}
        <Route path="/" element={<Anu />} />
        {/* Login/Register Route */}
        <Route path="/LoginReg" element={<LoginReg />} />
      </Routes>
    </Router>
  );
}

export default App;
