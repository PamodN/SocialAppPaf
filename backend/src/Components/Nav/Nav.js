import React from 'react'
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
    <ul className='home-ul'>
      <li className='home-li'>
        <Link to ="/mainhome" className='active home-a'>
        <h1>Home</h1>
        </Link>
      </li>
     
      <li className='home-li'>
      <Link to ="/addlguser" className='active home-a'>
        <h1>Add user</h1>
        </Link>
      </li>
    
      <li className='home-li'>
      <Link to ="/userlgdetails" className='active home-a'>
        <h1>user details</h1>
        </Link>
      </li>
      <li className='home-li'>
      <Link to ="/register" className='active home-a'>
        <h1>Register</h1>
        </Link>
      </li>
      <li className='home-li'>
      <Link to ="/login" className='active home-a'>
        <h1>Login</h1>
        </Link>
      </li>

    </ul>
    </div>
  );
}

export default Nav
