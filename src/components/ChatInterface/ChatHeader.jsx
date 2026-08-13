import React from "react";
import {
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import "../../ChatHeader.css";

function ChatHeader({ conversation }) {
  if (!conversation) return null;

  return (
    <header className="chat-header">

      <div className="chat-user-info">

        <div className="chat-header-avatar">

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
            <span className="header-online-dot" />
          )}

        </div>

        <div>
          <h2>{conversation.name}</h2>

          <p>
            {conversation.online
              ? "Active now"
              : "Offline"}
          </p>
        </div>

      </div>

      <div className="chat-header-actions">

        <button>
          <Phone size={19} />
        </button>

        <button>
          <Video size={20} />
        </button>

        <button>
          <MoreVertical size={20} />
        </button>

      </div>

    </header>
  );
}

export default ChatHeader;