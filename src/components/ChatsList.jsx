// ChatsList.js
import React, { useState, useEffect } from 'react';
import {getChats} from "../api";
import './ChatList.css'

const ChatsList = ({ onSelectChat }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getChats()
            .then(chatsData => {
                console.log('Chats data:', chatsData); // Добавьте эту строку
                setChats(chatsData);
            })
            .catch(error => console.error('Error fetching chats:', error));
    }, []);

    return (
        <div className="chats-list">
            <h2>Chats</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id} onClick={() => onSelectChat(chat)}>
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatsList;
