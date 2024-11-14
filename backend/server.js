import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import palauteRoutes from "./routes/palaute.route.js"
import path from "path";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json()); //allows us to accept JSON data in the req.body
app.use(session({
    secret: 'yourSecretKey', //env variable for prodcution
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

const __dirname = path.resolve();

app.use("/api/products", productRoutes )
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}
app.use("/api/users", userRoutes )
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}
app.use("/api/palaute", palauteRoutes )
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}
app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})
app.listen(PORT, () =>{
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

