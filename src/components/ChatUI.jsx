import React from "react";
// import SplineBackground from "./SplineBackground";
import Spline from '@splinetool/react-spline'
function ChatUI() {
  return (
    <div className="chat-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Konnect</h2>
          <button className="new-chat">+</button>
        </div>

        <div className="search-box">
          <input placeholder="Search people..." />
        </div>

        <div className="chat-list">
          <div className="chat-item active">
            <img src="/avatar.png" />
            <div>
              <h4>Agniva Roy</h4>
              <p>Typing...</p>
            </div>
          </div>

          <div className="chat-item">
            <img src="/avatar.png" />
            <div>
              <h4>Harry Potter</h4>
              <p>Hello!</p>
            </div>
          </div>

          <div className="chat-item">
            <img src="/avatar.png" />
            <div>
              <h4>Ron Weasley</h4>
              <p>See you soon.</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="chat-window">
        <div className="bmo-container">
          <Spline scene="https://prod.spline.design/Wjk7LoWwtAwDLfB6/scene.splinecode" />
        </div>
      </main>
    </div>
  );
}

export default ChatUI;
