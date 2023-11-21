import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages} from "../api";
import './ChatWindow.css';

const ChatWindow = ({ selectedChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageInputRef = useRef();

    useEffect(() => {
        if (selectedChat) {
            getMessages(selectedChat.id)
                .then(messagesData => setMessages(messagesData))
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [selectedChat]);

    function handleSendMessage() {
        if (newMessage.trim() !== '') {
            sendMessage(selectedChat.id, { sender: 'User', text: newMessage })
                .then(() => {
                    setNewMessage('');
                    messageInputRef.current.focus(); // Keep focus on the input after sending a message
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        // Handle 403 Forbidden error
                        console.error(error);
                        // Display error message to the user
                        // ...
                    } else {
                        // Handle other errors
                        // ...
                    }
                });
        }
    }


    return (
        <div className="chat-window">
            <h2>{selectedChat ? selectedChat.name : 'Select a chat'}</h2>
            <div className="messages">
                {messages.map(message => (
                    <div key={message.id}>
                        <strong>{message.sender}: </strong>
                        {message.text}
                    </div>
                ))}
            </div>
            {selectedChat && (
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        ref={messageInputRef}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
