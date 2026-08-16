import React, { useState,useEffect } from "react";
import ChatSidebar from "./ChatSideBar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../../ChatPage.css";
import ChatBackground from "./ChatBackground";
import socket from "../../Socket";


function ChatPage() {
  const [conversations,setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentUser,setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [messages, setMessages] = useState([]);

  // FRIENDS CONVERSATIONS
  useEffect(() => {
  const fetchFriends = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/friends`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setConversations(data.friends);

        if (data.friends.length > 0) {
          setSelectedConversation(data.friends[0]);
        }
      } else {
        console.error(data.message);
      }

    } catch (err) {
      console.error("Failed to fetch friends:", err);
    }
  };

  fetchFriends();
}, []);

  // GET LOGGED-IN USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // JOIN SOCKET.IO ROOM
  useEffect(() => {
    if (!currentUser) return;

    socket.emit("join", currentUser.username);

    console.log("Joined room:", currentUser.username);
  }, [currentUser]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);

    setMessages([]);  
  };
  // ************** CHAT PAGE LISTENS TO JOIN ROOM
  useEffect(() => {
  const handleReceiveMessage = (message) => {
    console.log("Received message:", message);

    setMessages((prev) => [
      ...prev,
      message,
    ]);
  };

  socket.on(
    "receive_msg",
    handleReceiveMessage
  );

  return () => {
    socket.off(
      "receive_msg",
      handleReceiveMessage
    );
  };
}, []);


  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={`chat-page ${darkMode ? "dark-mode" : ""}`}>
      <ChatSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={handleSelectConversation}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="chat-main">
        <ChatHeader conversation={selectedConversation} />

        <MessageList messages={messages} />

        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

export default ChatPage;
