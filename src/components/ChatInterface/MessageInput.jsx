import React, { useState } from "react";
import {
  Paperclip,
  Smile,
  Send,
} from "lucide-react";
import "../../MessageInput.css";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSendMessage(message);

    setMessage("");
  };

  return (
    <form
      className="message-input-wrapper"
      onSubmit={handleSubmit}
    >

      <button
        type="button"
        className="input-action"
      >
        <Paperclip size={20} />
      </button>

      <input
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="button"
        className="input-action"
      >
        <Smile size={20} />
      </button>

      <button
        type="submit"
        className="send-button"
        disabled={!message.trim()}
      >
        <Send size={18} />
      </button>

    </form>
  );
}

export default MessageInput;