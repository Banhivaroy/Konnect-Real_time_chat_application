import React, { useState, useEffect } from "react";
import InviteBackground from "./InviteBackground.jsx";
import "../invitefriend.css";

import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader.jsx";

function InviteFriend() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // INVITE LINK
  const inviteLink = user
    ? `${window.location.origin}/invite/${user.inviteCode}`
    : "";
  const copyInviteLink = async () => {
    if (!user) {
      return;
    }

    await navigator.clipboard.writeText(inviteLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          credentials: "include",
        });
        const data = await res.json();

         await new Promise((resolve) => setTimeout(resolve, 3000));

        if (data.success) {
          setUser(data.user);
        } else {
          navigate("/login", {
            state: {
              from: location.pathname,
            },
          });
        }
      } catch (err) {
        console.log(err);
        navigate("/login", {
          state: {
            from: location.pathname,
          },
        });
      } finally {
      setLoading(false);
    }
    };
    fetchUser();
  }, [navigate, location.pathname]);
  if (loading) {
  return <Loader />;
}

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
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="invite-link-input"
            />

            <button onClick={copyInviteLink} disabled={!user}>
              {copied ? (
                <span className="copied-text">Copied!</span>
              ) : (
                <span className="copy-text">Copy code</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
