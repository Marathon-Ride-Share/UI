export const createWebSocketConnection = (apiUrl, handleMessageReceived) => {
    let ws = new WebSocket(apiUrl);

    ws.onopen = () => {
        console.log('WebSocket Connected');
    };

    ws.onmessage = event => {
        const data = event.data;
        console.log("Received raw data:", data);
        if (typeof data === 'string') {
            try {
                const parsedData = JSON.parse(data);
                console.log("Parsed data:", parsedData);
                handleMessageReceived(parsedData);
            } catch (error) {
                console.error("Error parsing JSON data from WebSocket message:", error);
            }
        } else {
            console.log("Data received is already an object:", data);
            handleMessageReceived(data);
        }
    };

    ws.onclose = event => {
        console.log('Connection closed');
    };

    ws.onerror = error => {
        console.log('WebSocket encountered an error:', error);
        console.log('Error details:', error.message);
        ws.close();
    };

    return ws;
};
