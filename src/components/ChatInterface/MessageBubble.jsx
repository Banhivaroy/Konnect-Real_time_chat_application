import React from "react";
import "../../MessageBubble.css";

function MessageBubble({ message }) {
  const isMine = message.sender === "me";

  return (
    <div
      className={`message-row ${
        isMine ? "message-row-mine" : "message-row-other"
      }`}
    >

      <div
        className={`message-bubble ${
          isMine
            ? "message-bubble-mine"
            : "message-bubble-other"
        }`}
      >

        <p>{message.text}</p>

        <span className="message-time">
          {message.time}
        </span>

      </div>

    </div>
  );
}

export default MessageBubble;