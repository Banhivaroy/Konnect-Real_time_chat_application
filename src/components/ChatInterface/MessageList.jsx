import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import "../../MessageList.css";

function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="message-list">

      <div className="message-date">
        <span>Today</span>
      </div>

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />

    </div>
  );
}

export default MessageList;