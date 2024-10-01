// Load environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { socketHandler } = require('./services/socketService'); // Import your Socket.IO handler

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Create a Socket.IO server

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/channels', channelRoutes); // Channel routes
app.use('/api/messages', messageRoutes); // Message routes

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socketHandler(socket, io); // Handle socket events

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chatapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
