import React, { useState,useEffect } from "react";
import ChatSidebar from "./ChatSideBar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../../ChatPage.css";
import ChatBackground from "./ChatBackground";
import socket from "../../Socket";

const conversations = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "@alexj",
    avatar: null,
    online: true,
    lastMessage: "Hey, how are you?",
    time: "10:42 PM",
  },
  {
    id: 2,
    name: "Sarah Williams",
    username: "@sarah",
    avatar: null,
    online: false,
    lastMessage: "See you tomorrow!",
    time: "9:15 PM",
  },
  {
    id: 3,
    name: "David Miller",
    username: "@david",
    avatar: null,
    online: true,
    lastMessage: "That sounds great.",
    time: "8:32 PM",
  },
];

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "other",
      text: "Hey! How are you?",
      time: "10:38 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "I'm doing great! How about you?",
      time: "10:40 PM",
    },
    {
      id: 3,
      sender: "other",
      text: "I'm good too. What are you working on?",
      time: "10:42 PM",
    },
  ],

  2: [
    {
      id: 1,
      sender: "other",
      text: "Are we still meeting tomorrow?",
      time: "9:10 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes, definitely!",
      time: "9:12 PM",
    },
    {
      id: 3,
      sender: "other",
      text: "See you tomorrow!",
      time: "9:15 PM",
    },
  ],

  3: [
    {
      id: 1,
      sender: "me",
      text: "I have an idea for the project.",
      time: "8:28 PM",
    },
    {
      id: 2,
      sender: "other",
      text: "That sounds great.",
      time: "8:32 PM",
    },
  ],
};

function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const [currentUser,setCurrentUser] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [messages, setMessages] = useState(
    initialMessages[conversations[0].id] || [],
  );

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

    setMessages(initialMessages[conversation.id] || []);
  };

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
