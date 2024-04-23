import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createWebSocketConnection, sendMessage } from '../services/chatService';
import '../css/ChatPageStyles.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('default');
    const ws = useRef(null);

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleMessageReceived = useCallback((data) => {
        const actualData = data.message;
        if (!messages.some(msg => msg.timestamp === actualData.timestamp && msg.message === actualData.message)) {
            setMessages(prev => [...prev, {...actualData, sender: actualData.sender || username}]);
        }
    }, [messages, username]);



    useEffect(() => {
        const websocketUrl = `ws://localhost:8083/chat`;
        ws.current = createWebSocketConnection(websocketUrl, handleMessageReceived);

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [handleMessageReceived]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "" && ws.current && ws.current.readyState === WebSocket.OPEN) {
            const messageToSend = {
                message: newMessage,
                timestamp: Date.now(),
                sender: username,
                chatType: 'group', // 假设当前只有群聊功能，简化代码
            };
            sendMessage(ws.current, messageToSend);
            setNewMessage('');
            setMessages(prevMessages => [...prevMessages, messageToSend]);
        }
    };

    return (
        <div className="bigBox">
            <div className="header">
                <div className="headerText">Chat Room</div>
                <button className="backButton" onClick={() => {}}>Back</button>
            </div>
            <div id="messages">
                {messages.map((msg, index) => (
                    <div className="message" key={index}>
                        <div className="msgHeader">
                            <div className="msgName"><strong>{msg.sender}</strong></div>
                            <div className="msgTime">[{new Date(msg.timestamp).toLocaleString()}]</div>
                        </div>
                        <div className="msgContent">{msg.message}</div>
                    </div>
                ))}
            </div>
            <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            ></textarea>
            <button className="sendButton" onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;