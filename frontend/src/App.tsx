import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SocialGallery from './pages/SocialGallery';
// import DesignStudio from './pages/DesignStudio';
// import VirtualTryOn from './pages/VirtualTryOn';
// import OrderPlacement from './pages/OrderPlacement';
import UserProfile from './pages/UserProfile';
// import AdminPanel from './pages/AdminPanel';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import FAQ from './pages/FAQ';
// import Terms from './pages/Terms';
import { AuthProvider } from './context/AuthContext';

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<SocialGallery />} />
            {/* <Route path="/design-studio" element={<DesignStudio />} />
            <Route path="/virtual-try-on" element={<VirtualTryOn />} />
            <Route path="/order" element={<OrderPlacement />} /> */}
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App