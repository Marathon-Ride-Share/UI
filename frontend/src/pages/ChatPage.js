import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createWebSocketConnection } from '../services/chatService';
import '../css/ChatPageStyles.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('default');
    const { state } = useLocation();
    const [rideId, setRideId] = useState(state?.rideId || null);
    const [chatType, setChatType] = useState(state?.rideId ? 'private' : 'group');
    const ws = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useeffect1");
        // if (state?.rideId) {
        //     setChatType('private');
        //     setMessages([]); // Clear messages when entering a new private chat room
        // }
        const wsUrl = `ws://localhost:8083/chat?rideId=${state.rideId}`;
        ws.current = createWebSocketConnection(wsUrl, handleMessageReceived);
        console.log('Closing connection for Ride ID: ', state.rideId);
        return () => {
            if (ws.current) {
                ws.current.close();
                console.log('Closing connection for Ride ID: ', state.rideId);
            }
        };
    }, []);

    const fetchMessages = useCallback(() => {
        if (rideId) {
            const url = `http://localhost:8090/chat/${rideId}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const formattedMessages = data.map(msg => ({
                        sender: msg.senderId || 'Unknown',
                        message: msg.message,
                        timestamp: new Date(msg.timestamp).getTime(),
                        chatType: msg.chatType
                    }));
                    setMessages(formattedMessages);
                })
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [rideId]);

    useEffect(() => {
        console.log("useeffect2");

        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        console.log("useeffect3");

        setUsername(localStorage.getItem('username') || 'default');
    }, []);

    const handleMessageReceived = useCallback((data) => {
        setMessages(prev => [...prev, {
            sender: data.senderId,
            message: data.message,
            timestamp: new Date(data.timestamp).getTime(),
            chatType: data.chatType
        }]);
    }, []);



    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const timestamp = Date.now();
            const messageToSend = {
                sender: username,
                message: newMessage,
                timestamp: timestamp,
                chatType: chatType
            };
            if (messageToSend.sender !== username) { // Check if the message is not from the current user
                setMessages(prevMessages => [...prevMessages, messageToSend]);
            }
            sendMessage(rideId, newMessage, username, chatType).then(() => {
                console.log("Message sent successfully");
            }).catch(error => {
                console.error("Error sending message:", error);
            });
            setNewMessage('');
        }
    };

    const sendMessage = async (rideId, message, username, chatType) => {
        console.log("getting param to send message");
        console.log(rideId);
        console.log(message);
        console.log(username);
        console.log(chatType);

        const url = `http://localhost:8090/chat/send/${rideId}`;
        const messageData = {
            senderId: username,
            timestamp: Date.now(),
            message: message,
            chatType: chatType,
            tripId: rideId
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            if (ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(message);
            } else {
                console.error('WebSocket is not open.');
            }

            const responseData = await response.json();
            console.log('Message sent successfully:', responseData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="bigBox">
            <div className="header">
                <div className="headerText">{chatType === 'private' ? 'Private Chat' : 'Group Chat'}</div>
                <button className="backButton" onClick={() => navigate('/ride-share')}>Back</button>
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
            <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..."></textarea>
            <button className="sendButton" onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;
