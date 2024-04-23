import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createWebSocketConnection, sendMessage } from '../services/chatService';
import '../css/ChatPageStyles.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatType, setChatType] = useState('group');
    const [recipient, setRecipient] = useState('');
    const ws = useRef(null);

    const handleMessageReceived = useCallback((data) => {
        if (!messages.some(msg => msg.timestamp === data.timestamp && msg.message === data.message)) {
            setMessages(prev => [...prev, {...data, sender: 'default'}]);
        }
    }, [messages]);

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
            sendMessage(ws.current, newMessage, chatType === 'private' ? recipient : undefined);
            setNewMessage('');
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
