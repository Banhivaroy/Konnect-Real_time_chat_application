import React, { useState, useEffect } from 'react';

import {Routes, Route} from "react-router-dom";
import Landing from './components/Landing';
import SignUp from "./components/SignUp";
import FullProfile from "./components/FullProfile";
import LoginPage from './components/LoginPage';
import InviteFriend from './components/InviteFriend';

import './App.css'

// const socket = io("http://localhost:3000")

function App() {
 

  return (
   
      <Routes>
        <Route path = "/" element = {<Landing/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/fullprofile" element ={<FullProfile/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/invite" element = {<InviteFriend/>}/>
      </Routes>
   
  );
  
}

export default App
