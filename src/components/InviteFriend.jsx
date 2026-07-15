import React, { useState } from "react";

function InviteFriend() {
  const [copied, setCopied] = useState(false);
  const inviteCode = "hfyeeh10";
  const referrals = [
    {
      name: "Robert Downey Jr.",
      email: "robert0754@gmail.com",
      joined: true,
    },
    {
      name: "Frances Swann",
      email: "frances@gmail.com",
      joined: false,
    },
    {
      name: "Emily Watson",
      email: "emily@gmail.com",
      joined: true,
    },
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="invite-page">
      <div className="invite-card">
        <div className="invite-top">
          <div className="invite-content">
            <h1>Invite your friends</h1>

            <p>Share your referral code and grow your network on Konnect.</p>

            <div className="invite-code-box">
              <div>
                <small>Your Invite Code</small>
                <h2>{inviteCode}</h2>
              </div>

              <button onClick={copyCode}>{copied ? "Copied!" : "Copy"}</button>
            </div>

            <button className="share-btn">Share Invite Link</button>
          </div>

          <svg
            className="wave"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              d="
      M0,96
      C240,180
      480,0
      720,70
      C960,140
      1200,180
      1440,80
      L1440,180
      L0,180
      Z"
            />
          </svg>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>12</h3>
            <span>Invited</span>
          </div>

          <div className="stat-card">
            <h3>8</h3>
            <span>Joined</span>
          </div>

          <div className="stat-card">
            <h3>67%</h3>
            <span>Success</span>
          </div>
        </div>

        <div className="friends">
          <div className="friends-title">Invited Friends</div>

          {referrals.map((friend, index) => (
            <div className="friend" key={index}>
              <div className="avatar">{friend.name.charAt(0)}</div>

              <div className="friend-info">
                <h4>{friend.name}</h4>

                <p>{friend.email}</p>
              </div>

              <span className={friend.joined ? "joined" : "pending"}>
                {friend.joined ? "Joined" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
