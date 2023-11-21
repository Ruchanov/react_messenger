// App.js
import React, { useState } from 'react';
import ChatsList from "./components/ChatsList";
import ChatWindow from "./components/ChatWindow";
import './App.css'


const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const onSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
      <div className="app">
        <ChatsList onSelectChat={onSelectChat} />
        <ChatWindow selectedChat={selectedChat} />
      </div>
  );
};

export default App;
