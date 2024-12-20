import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    chatId: {type: String, unique: true},
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  export default Chat;
  