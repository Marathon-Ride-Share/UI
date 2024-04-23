export const createWebSocketConnection = (apiUrl, handleMessageReceived) => {
    let ws = new WebSocket(apiUrl);

    ws.onopen = () => {
        console.log('WebSocket Connected');
    };

    ws.onmessage = event => {
        const data = JSON.parse(event.data);
        handleMessageReceived(data);
    };

    ws.onclose = event => {
        console.log('Connection closed');
    };

    ws.onerror = error => {
        console.log('WebSocket encountered an error');
        ws.close();
    };

    return ws;
};

export const sendMessage = (ws, message, recipient) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        const messageData = { message, recipient };
        ws.send(JSON.stringify(messageData));
    }
};
