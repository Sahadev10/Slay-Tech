import React, { useState } from "react";
import "./LoginReg.css";

const LoginReg = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const fireflies = Array.from({ length: 15 }, (_, i) => <div key={i} className="firefly"></div>);


  return (
    <div className="login-page">
    <div className="wrapper">
        {fireflies}
      <div className="login-box">
        <h2 style={{ fontWeight: "bold", fontStyle: "italic" }}>
          {isRegister ? "Register" : "Login"}
        </h2>

        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" required />
          </div>

          
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
          

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          {isRegister && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" required />
            </div>
          )}

          <button type="submit" className="login-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Buttons */}
        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
        {!isRegister && <p className="forgot-password">Forgot Password?</p>}
      </div>
    </div>
  </div>
  );
};

export default LoginReg;
