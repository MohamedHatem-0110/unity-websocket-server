// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(cors());
app.use(express.json());

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('Received message:', message);
        // Here you can handle messages from the client (Unity)
    });
});

app.post('/sendMessage', (req, res) => {
    const message = req.body.message;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
    res.json({ status: 'Message sent to Unity' });
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
