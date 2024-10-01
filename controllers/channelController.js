const Channel = require('../models/Channel');
const User = require('../models/User');

// Create a new channel
exports.createChannel = async (req, res, next) => {
  const { name, members } = req.body;
  try {
    const channel = new Channel({
      name,
      members,
      admin: req.user,
    });

    await channel.save();
    res.status(201).json({ message: 'Channel created successfully', channel });
  } catch (error) {
    next(error);
  }
};

// Get all channels the user is a part of
exports.getUserChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find({ members: req.user });
    res.json(channels);
  } catch (error) {
    next(error);
  }
};

// Add a user to the channel
exports.addMember = async (req, res, next) => {
  const { channelId, userId } = req.body;
  try {
    const channel = await Channel.findById(channelId);
    const user = await User.findById(userId);

    if (!channel || !user) {
      return res.status(404).json({ message: 'Channel or User not found' });
    }

    if (channel.members.includes(userId)) {
      return res.status(400).json({ message: 'User already in the channel' });
    }

    channel.members.push(userId);
    await channel.save();

    res.json({ message: 'User added to the channel', channel });
  } catch (error) {
    next(error);
  }
};

// Remove a member from the channel
exports.removeMember = async (req, res, next) => {
  const { channelId, userId } = req.body;
  try {
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    channel.members = channel.members.filter(member => member.toString() !== userId);
    await channel.save();

    res.json({ message: 'User removed from the channel', channel });
  } catch (error) {
    next(error);
  }
};
