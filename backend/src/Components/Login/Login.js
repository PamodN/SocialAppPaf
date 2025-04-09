import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    lggmail: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', user);
      if (res.data.status === 'ok') {
        alert('Login Successful');
        history('/userlgdetails');
      } else {
        alert('Invalid Credentials');
      }
    } catch (err) {
      alert('Login Failed');
    }
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign in to your account</h1>
          <input
            type="email"
            name="lggmail"
            value={user.lggmail}
            onChange={handleInputChange}
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="submit">Sign in</button>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
