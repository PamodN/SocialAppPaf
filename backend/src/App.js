
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import AddLgUser from './Components/AddLguser/AddLguser';
import Users from './Components/UserDetails/LgUsers';
import React from 'react';
import UpdateLguser from './Components/UpdateLguser/UpdateLguser';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';


function App() {
  return (
    <div>

      
   
       <React.Fragment>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/mainhome" element={<Home/>}/>
        <Route path="/addlguser" element={<AddLgUser/>}/>
        <Route path="/userlgdetails" element={<Users/>}/>
        <Route path="/userlgdetails/:id" element={<UpdateLguser/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>
       </React.Fragment>
        
    </div>
  );
}

export default App;
