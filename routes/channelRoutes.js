const express = require('express');
const { createChannel, getUserChannels, addMember, removeMember } = require('../controllers/channelController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to create a channel
router.post('/create', protect, createChannel);

// Protected route to get channels for the user
router.get('/my-channels', protect, getUserChannels);

// Protected route to add a member to a channel
router.post('/add-member', protect, addMember);

// Protected route to remove a member from a channel
router.post('/remove-member', protect, removeMember);

module.exports = router;
