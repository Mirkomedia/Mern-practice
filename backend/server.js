import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import palauteRoutes from "./routes/palaute.route.js";
import path from "path";
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';
import sessionRoutes from "./routes/session.route.js";
import cors from "cors";

dotenv.config();

// Initialize MongoDBStore with the session library
const MongoDBStore = connectMongoDBSession(session);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use(
  cors({
    origin: "https://mern-practice-0lqg.onrender.com", // Your frontend's domain
    credentials: true, // Allow cookies to be sent
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

//debugging middleware, might delete later
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "HttpOnly; Secure; SameSite=None");
  next();
});
app.use((req, res, next) => {
  console.log("Cookies in response:", res.getHeaders()["set-cookie"]);
  next();
});
app.set("trust proxy", 1);
// Configure session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // Replace with a secure secret key
  resave: false, // Prevent unnecessary session resaving
  saveUninitialized: false, // Don't save empty sessions
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true, // Set to true in production (requires HTTPS)
    httpOnly: true,
    sameSite: 'none'
  },
});

app.use(sessionMiddleware);

const __dirname = path.resolve();

// Routes setup
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/palaute", palauteRoutes);
app.use("/api/session", sessionRoutes)

// Serve frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
