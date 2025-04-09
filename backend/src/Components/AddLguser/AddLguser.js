import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddLguser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    lgname: '',
    lggmail: '',
    lgnumber: '',
    lgage: '',
    lgaddress: '',
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/lgusers', inputs);
      navigate('/userlgdetails'); // Redirect after successful submission
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="add-lguser-container">
      <Nav />
      <h1 className="form-title">Log In User</h1>
      <form className="lguser-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="lgname"
          className="form-input"
          placeholder="Name"
          value={inputs.lgname}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="email"
          name="lggmail"
          className="form-input"
          placeholder="Email"
          value={inputs.lggmail}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="text"
          name="lgnumber"
          className="form-input"
          placeholder="Number"
          value={inputs.lgnumber}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="number"
          name="lgage"
          className="form-input"
          placeholder="Age"
          value={inputs.lgage}
          onChange={handleChange}
          required
        /><br></br>
        <input
          type="text"
          name="lgaddress"
          className="form-input"
          placeholder="Address"
          value={inputs.lgaddress}
          onChange={handleChange}
          required
        /><br></br>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default AddLguser;
