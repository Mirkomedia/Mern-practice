// routes/chat.js
import express from 'express';
import Message from '../models/message.model.js';
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Fetch messages between two users
router.get('/:userId1/:userId2', isAuthenticated, async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 },
      ],
    })
      .sort({ timestamp: 1 })
      .exec();
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST route to send a message
router.post('/:userId1/:userId2', isAuthenticated, async (req, res) => {
  const { userId1, userId2 } = req.params; // Extract user IDs from URL params
  const { message } = req.body; // Get message content from the body
  const chatId = [userId1, userId2].sort().join('_')
  if (!message || !userId1 || !userId2) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newMessage = new Message({
      sender: userId1,
      recipient: userId2,
      message,
      timestamp: new Date(),
      chatId: chatId
    });

    await newMessage.save();
    res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    console.error('Error saving message', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


export default router;
