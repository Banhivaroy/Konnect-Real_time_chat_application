import {Routes, Route} from "react-router-dom"
import Landing from './components/landing'
import SignUp from "./components/SignUp";
import FullProfile from "./components/FullProfile";
import './App.css'

// const socket = io("http://localhost:3000")

function App() {
 

  return (
   
      <Routes>
        <Route path = "/land" element = {<Landing/>}/>
        <Route path = "/" element = {<SignUp/>}/>
        <Route path = "/fullprofile" element ={<FullProfile/>}/>
      </Routes>
   
  );
  
}

export default App
