import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      setSuccess('Login successful!');
      setError('');
      // navigate('/home')
      localStorage.setItem('token', response.data.accessToken); // Store token
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      // setIsAuthenticated(true);

      navigate('/profile')
    } catch (err) {
      setError('Login failed! Please try again.');
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@slayt.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-purple-600">
            Welcome back to SlayT
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}


          <div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center">
              <LogIn className="h-5 w-5 mr-2" />
              Sign in
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <button
            onClick={handleDemoLogin}
            className="btn-secondary w-full"
          >
            Try Demo Account
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;