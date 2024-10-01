exports.validateSignup = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };
  
  exports.validateMessage = (req, res, next) => {
    const { channelId, content } = req.body;
    if (!channelId || !content) {
      return res.status(400).json({ message: 'Channel ID and message content are required' });
    }
    next();
  };
  