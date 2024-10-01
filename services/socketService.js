// socketService.js
const socketIO = require('socket.io');

let io; // Declare the io variable globally

const initializeSocket = (server) => {
  io = socketIO(server); // Initialize socket.io with the server

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for incoming messages
    socket.on('send-message', (data) => {
      // Broadcast the message to other users in the same channel
      io.to(data.channelId).emit('receive-message', data);
    });

    // Join a channel
    socket.on('join-channel', (channelId) => {
      socket.join(channelId); // Join the channel
      console.log(`User ${socket.id} joined channel ${channelId}`);
    });

    // Leave a channel
    socket.on('leave-channel', (channelId) => {
      socket.leave(channelId); // Leave the channel
      console.log(`User ${socket.id} left channel ${channelId}`);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

// Export the initialize function
module.exports = { initializeSocket };
