import React from "react";
import { CheckCheck } from "lucide-react";
import "../../Conversation.css";

function ConversationItem({
  conversation,
  selected,
  onClick,
}) {
  return (
    <button
      className={`conversation-item ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >

      <div className="conversation-avatar">

        {conversation.avatar ? (
          <img
            src={conversation.avatar}
            alt={conversation.name}
          />
        ) : (
          <span>
            {conversation.name.charAt(0)}
          </span>
        )}

        {conversation.online && (
          <span className="online-dot" />
        )}

      </div>

      <div className="conversation-content">

        <div className="conversation-top">

          <span className="conversation-name">
            {conversation.name}
          </span>

          <span className="conversation-time">
            {conversation.time}
          </span>

        </div>

        <div className="conversation-bottom">

          <span className="conversation-last-message">
            {conversation.lastMessage}
          </span>

          <CheckCheck
            size={15}
            className="message-read-icon"
          />

        </div>

      </div>

    </button>
  );
}

export default ConversationItem;