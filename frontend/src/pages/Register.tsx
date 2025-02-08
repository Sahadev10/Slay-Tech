import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
const Register = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    console.log(password)
    console.log(confirmPassword)
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        username, // Include username in the request
        email,
        password,
      });
      setSuccess('Registration successful! Please log in.');
      setError('');
      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/home')
    } catch (err) {
      setError('Registration failed! Please try again.');
    }
  };


  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-purple-600">
            Join SlayT
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Create your account to start designing
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                id="username"
                name="username"
                type="usertext"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                confirm Password
              </label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="confirmpassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                className="input-field"
                placeholder="confirmpassword"
              />
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;