// // src/components/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState(''); // New state for username
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       // Include username in the POST request
//       await axios.post('http://localhost:3000/auth/register', {
//         username,  // Add username
//         email,
//         password,
//       });
//       setSuccess('Registration successful! Please log in.');
//       setError('');
//     } catch (err) {
//       setError('Registration failed! Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Register</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Username"  // Placeholder for username
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Register</button>
//       </form>
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       {success && <div className="alert alert-success mt-3">{success}</div>}
//     </div>
//   );
// };

// export default Register;

// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './../App.css'; // Import your CSS file

const Register = () => {
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      setError('Registration failed! Please try again.');
    }
  };

  return (
    <div className="outerDiv">
      <h2 className='reg'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" // Change type to text for username
          placeholder="Username"
          value={username} // Bind value to username state
          onChange={(e) => setUsername(e.target.value)} // Update state on change
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  );
};

export default Register;
