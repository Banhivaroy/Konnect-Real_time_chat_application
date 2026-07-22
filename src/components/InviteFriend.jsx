import React, { useState,useEffect } from "react";
import InviteBackground from "./InviteBackground.jsx";
import "../invitefriend.css";
import { span } from "framer-motion/client";
import  { useNavigate,useLocation } from "react-router-dom"


function InviteFriend() {
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // INVITE LINK 

  const copyInviteLink = async () => {
    if(!user){
      return;
    }
    const inviteLink = `${window.location.origin}/invite/${user.inviteCode}`

    await navigator.clipboard.writeText(inviteLink)

    setCopied(true)

    setTimeout(() =>{
      setCopied(false)
    }, 2000)
  }

  const [user,setUser] = useState(null)

  useEffect(() => {
    
      const fetchUser = async () =>{
        try{
          const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/me`,
        {
          credentials: "include"
        }
      )
      const data = await res.json()

      if(data.success){
        setUser(data.user)
      } else{
        navigate("/login",{
          state : {
            from: location.pathname,
          }
        })
      }
    }
    catch(err){
    console.log(err)
    navigate("/login")
    }
      }
    fetchUser()
  }, [navigate])

  

  return (
    <div className="invite-page">
      <InviteBackground />

      <div className="invite-card">
        <div className="invite-header">
          <h1>Invite Your Friends</h1>

          <p>Share your invite code and grow your network on Konnect.</p>

        </div>

        <div className="invite-body">
          <span className="label">Your Invite Code</span>

          <div className="code-box">
            <h2>{user?.inviteCode}</h2>

            <button onClick={copyInviteLink} disabled={!user}>
              {copied ? <span className="copied-text">Copied!</span> : <span className="copy-text">Copy code</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
