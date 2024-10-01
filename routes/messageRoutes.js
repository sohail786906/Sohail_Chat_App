const express = require('express');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to send a message
router.post('/send', protect, sendMessage);

// Protected route to get messages from a channel
router.get('/:channelId', protect, getMessages);

// Protected route to delete a message
router.delete('/:messageId', protect, deleteMessage);

module.exports = router;
