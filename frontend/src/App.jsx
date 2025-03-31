import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Anu from "./Anu.jsx"; 
import LoginReg from "./LoginReg/LoginReg.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginreg" element={<LoginReg />} />
        <Route path="*" element={<Anu />} />  {/* Pass all other routes to Anu */}
      </Routes>
    </Router>
  );
}

export default App;
