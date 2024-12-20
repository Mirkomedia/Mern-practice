import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import palauteRoutes from "./routes/palaute.route.js";
import messageRoutes from "./routes/message.route.js"
import chatRoutes from "./routes/chat.route.js"
import path from "path";
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';
import sessionRoutes from "./routes/session.route.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { Server} from "socket.io";
import http from 'http';
import Message from "./models/message.model.js";

dotenv.config();

// Initialize MongoDBStore with the session library
const MongoDBStore = connectMongoDBSession(session);

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000', // Update with your frontend's URL
    methods: ['GET', 'POST'],
  },
});

// Middleware to parse JSON
app.use(express.json());

// Rate limiting setup
/* const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10000, // Limit each IP to 1000 requests
});
app.use(limiter);
 */
// CORS setup
app.use(
  cors({
    origin: ["https://mern-practice-0lqg.onrender.com", "http://localhost:5000"], // Your frontend's domains
    credentials: true,
  })
);

// Configure the MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions',
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

app.set("trust proxy", 1);

// Configure session middleware

const sessionMiddleware = session({
  
  secret: process.env.SESSION_SECRET, // Replace with a secure secret key
  resave: false, // Prevent unnecessary session resaving
  saveUninitialized: false, // Don't save empty sessions
  store: store,
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 mins
    secure: false ,
    httpOnly:  false ,
    sameSite: 'strict',
  },
});
app.use(sessionMiddleware);

// Share the session with Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/palaute", palauteRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/messages", messageRoutes)
app.use("/api/chats", chatRoutes)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for chat messages
  socket.on('chat message', async ({ senderId, recipientId, message }) => {
    try{
      const chatRoom = [senderId, recipientId].sort().join('_')
      const newMessage = new Message({ sender: senderId, recipient: recipientId, message})
      await newMessage.save();
      socket.join(chatRoom);
      socket.to(chatRoom).emit('chat message', message);
    }
    catch(err){
      console.error('Error saving message', err)
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
