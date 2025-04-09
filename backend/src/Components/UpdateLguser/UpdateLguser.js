import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';

function UpdateLguser() {
  const [inputs, setInputs] = useState({
    lgname: '',
    lggmail: '',
    lgnumber: '',
    lgage: '',
    lgaddress: '',
  });
  const history = useNavigate();
  const { id } = useParams();

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/lgusers/${id}`);
        if (res.data && res.data.lguser) {
          setInputs(res.data.lguser); // Populate state with fetched user data
        } else {
          console.error('Invalid API response:', res.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchHandler();
  }, [id]); // Re-fetch whenever the ID changes

  // Update the state as the user types in the inputs
  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  // Send the updated data to the backend
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/lgusers/${id}`, {
        lgname: inputs.lgname,
        lggmail: inputs.lggmail,
        lgnumber: inputs.lgnumber,
        lgage: inputs.lgage,
        lgaddress: inputs.lgaddress,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/userlgdetails')); // Navigate after updating
  };

  return (
    <div className="add-lguser-container">
      <Nav />
      <h1 className="form-title">Update Log In User</h1>
      <form className="lguser-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="lgname"
          className="form-input"
          placeholder="Name"
          value={inputs.lgname || ''}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="lggmail"
          className="form-input"
          placeholder="Email"
          value={inputs.lggmail || ''}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lgnumber"
          className="form-input"
          placeholder="Number"
          value={inputs.lgnumber || ''}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="lgage"
          className="form-input"
          placeholder="Age"
          value={inputs.lgage || ''}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lgaddress"
          className="form-input"
          placeholder="Address"
          value={inputs.lgaddress || ''}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateLguser;
