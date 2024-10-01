const Message = require('../models/Message');
const Channel = require('../models/Channel');

// Send a message
exports.sendMessage = async (req, res, next) => {
  const { channelId, content } = req.body;
  try {
    const channel = await Channel.findById(channelId);

    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const message = new Message({
      sender: req.user,
      channel: channelId,
      content
    });

    await message.save();

    res.status(201).json({ message: 'Message sent', message });
  } catch (error) {
    next(error);
  }
};

// Get messages for a channel
exports.getMessages = async (req, res, next) => {
  const { channelId } = req.params;
  try {
    const messages = await Message.find({ channel: channelId }).populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Delete a message (admin or message owner only)
exports.deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findById(messageId);

    if (!message) return res.status(404).json({ message: 'Message not found' });

    if (message.sender.toString() !== req.user && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized to delete this message' });
    }

    await message.remove();
    res.json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
