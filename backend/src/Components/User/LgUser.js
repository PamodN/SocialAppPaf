import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LgUser.css";

function LgUser({ lguser }) {
  const history = useNavigate();

  if (!lguser) {
    return <h1>No user data available</h1>;
  }

  const { _id, lgname, lggmail, lgnumber, lgage, lgaddress } = lguser;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/lgusers/${_id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-row">
      <div className="user-cell">{lgname}</div>
      <div className="user-cell">{lggmail}</div>
      <div className="user-cell">{lgage}</div>
      <div className="user-cell">{lgnumber}</div>
      <div className="user-cell address-cell" title={lgaddress}>{lgaddress}</div>
      <div className="user-cell actions-cell">
        <Link to={`/userlgdetails/${_id}`}>
          <button className="edit-btn">✏️</button>
        </Link>
        <button className="delete-btn" onClick={deleteHandler}>🗑️</button>
      </div>
    </div>
  );
}

export default LgUser;
