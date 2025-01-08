// routes/chat.js
import express from 'express';
import Chat from '../models/chat.model.js';
import isAuthenticated from "../middleware/isAuthenticated.js";

import mongoose from 'mongoose';
const router = express.Router();

//Fetch a single chat 
router.get('/:userId1/:userId2', /* isAuthenticated, */ async (req,res) =>{
    const { userId1, userId2 } = req.params;
    
    console.log("userId1:", userId1, "userId2:", userId2);
    try {
      const participants = [userId1, userId2].sort()
      const chatId = participants.join('_');
      console.log('Searching for chat with chatId:', chatId);
      const chat = await Chat.findOne({ chatId });
      if (!chat){
        return res.status(404).json({message: 'Chat not found'});
    }
      res.status(200).json(chat)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  })
  //create new chat
  router.post('/',  isAuthenticated, async (req, res) => {
    const { participants } = req.body;
  
    try {
      // Generate a unique chatId
      const chatId = participants.sort().join('_');
  
      // Check if a chat with this specific ID already exists
      const existingChat = await Chat.findOne({ chatId });
  
      if (existingChat) {
        return res.status(400).json({ message: 'Chat already exists' });
      }
  
      // Create a new chat
      const newChat = new Chat({ participants, chatId });
      await newChat.save();
      res.status(201).json(newChat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  //Fetch all chats 
  router.get('/:userId', isAuthenticated, async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch all chats where the user is a participant
      const chats = await Chat.find({ participants: userId })
        .populate('participants', 'username') // Populate participant details
        .populate('lastMessage') // Optionally populate lastMessage to extract relevant data
        .sort({ lastUpdated: -1 }); // Sort by most recent chats
  
      if (!chats.length) {
        return res.status(404).json({ message: 'No chats found for this user' });
      }
  
      // Map lastMessage to just the content if it's an object
      const formattedChats = chats.map(chat => ({
        ...chat._doc,
        lastMessage: chat.lastMessage ? chat.lastMessage.content : 'No messages yet'
      }));
  
      res.status(200).json(formattedChats);
    } catch (error) {
      console.error('Error fetching user chats:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export default router