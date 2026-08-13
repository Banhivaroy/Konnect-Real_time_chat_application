import React, { useState } from "react";
import { Search, Settings, MoreHorizontal } from "lucide-react";
import ConversationItem from "./ConversationItem";
import "../../ChatSideBar.css";

function ChatSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
}) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="chat-sidebar">

      <div className="sidebar-top">

        <div className="sidebar-heading">
          <div>
            <h1>Messages</h1>
            <p>Stay connected</p>
          </div>

          <button className="sidebar-icon-button">
            <Settings size={19} />
          </button>
        </div>

        <div className="chat-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="conversation-section">

        <div className="conversation-title">
          <span>Conversations</span>

          <button className="sidebar-more">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="conversation-list">

          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selected={
                selectedConversation?.id === conversation.id
              }
              onClick={() =>
                onSelectConversation(conversation)
              }
            />
          ))}

        </div>

      </div>

    </aside>
  );
}

export default ChatSidebar;