import React, { useState } from "react";
import "./LoginReg.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginReg = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login Successful!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (isRegister) {
      // Registration logic
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3000/auth/register", {
          username, // Include username
          email,
          password,
        });
        
        setSuccess("Registration successful! Please log in.");
        setError("");
        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        localStorage.setItem("token", response.data.accessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
        console.log(response.data.accessToken)
        navigate("/");
      } catch (err) {
        setError("Registration failed! Please try again.");
      }
    } else {
      // Login logic
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });


  console.log("Login API Response:", response);
        setSuccess("Login successful!");
        setError("");
        localStorage.setItem("token", response.data.accessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
        console.log(response.data.accessToken)
        navigate("/");
      } catch (err) {
        setError("Login failed! Please try again.");
      }
    }
  };
  
  const fireflies = Array.from({ length: 15 }, (_, i) => <div key={i} className="firefly"></div>);


  return (
    <div className="login-page">
    <div className="wrapper">
        {fireflies}
      <div className="login-box">
        <h2 style={{ fontWeight: "bold", fontStyle: "italic" }}>
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required 
            />
          </div>

        )}

          
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required />
            </div>
          

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required />
          </div>

          {isRegister && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              required />
            </div>
          )}


          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}


          <button type="submit" className="login-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Buttons */}
        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
        {/* {!isRegister && <p className="forgot-password">Forgot Password?</p>} */}
      </div>
    </div>
  </div>
  );
};

export default LoginReg;

