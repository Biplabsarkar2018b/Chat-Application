// Import required modules
import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from 'cors';
import "dotenv/config";
import router from "./routes/UserRouter.js";

// Create an instance of the Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema for chat messages
const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

// Create a model based on the schema
const Message = mongoose.model("Message", messageSchema);

// Set up Socket.IO
const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
const io = new Server(server);

// Socket.IO connection logic
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for new messages
  socket.on("newMessage", (data) => {
    // Save the message to the database
    const message = new Message(data);
    message.save();

    // Broadcast the message to all connected clients
    io.emit("newMessage", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
// Create an endpoint for sending new messages
app.post("/messages", (req, res) => {
  const { user, message } = req.body;

  // Emit the new message event to Socket.IO
  io.emit("newMessage", { user, message });

  // Save the message to the database
  const newMessage = new Message({ user, message });
  newMessage.save();

  res.status(201).json({ success: true, message: "Message sent successfully" });
});

// Create an endpoint for retrieving all messages
app.get("/messages", async (req, res) => {
  // Retrieve all messages from the database
  try {
    const messages = await Message.find();

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(404).json("Error Occured")
  }
});
// Set up basic route for testing
app.get("/", (req, res) => {
  res.send("Server is running");
});
