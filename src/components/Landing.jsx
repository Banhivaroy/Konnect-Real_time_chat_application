import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as VantaGlobe from "vanta/dist/vanta.globe.min";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";
import InviteBackground from "./InviteBackground";

function Landing() {
  const vantaRef = useRef(null);
  const navigate = useNavigate();
  

  return (
   <div>
    <InviteBackground/>
      <nav className="glass-navbar">
        <ul className="nav-links">
          <li>
            <button className="nav-btn" onClick={() => navigate("/signup")}>Sign Up</button>
          </li>

          <li>
            <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          </li>

          <li>
            <button className="invite-btn" onClick={() => navigate("/invite")}>Invite a Friend</button>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-content">
        

          <h1>
            Connect With Anyone,
            <span> Instantly.</span>
          </h1>

          <p>
            Experience secure and lightning-fast communication with real-time
            updates.
          </p>

          <div className="hero-buttons">
            
            <button className="secondary-btn">Learn More</button>
            
          </div>
        </div>
      </section>
    </div>
  );
}
export default Landing;
