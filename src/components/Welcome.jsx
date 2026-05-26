import React from "react";

function Welcome({ username }) {
  return (
    <div className="welcome">
      <div className="welcome-icon">
        <i className="ti ti-messages" />
      </div>
      <h1>Hello, {username} 👋</h1>
      <p className="sub">Welcome to ChitChat</p>
      <p className="desc">
        Start a conversation, pick up where you left off, or invite someone new.
      </p>
      <div className="status-row">
        <span className="dot" />
        <span>3 contacts online</span>
      </div>
      <div className="action-row">
        <button className="start-btn">
          <i className="ti ti-edit" /> New chat
        </button>
        <button className="ghost-btn">
          <i className="ti ti-user-plus" /> Invite friend
        </button>
      </div>
    </div>
  );
}

export default Welcome;
