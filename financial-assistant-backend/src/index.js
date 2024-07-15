require("dotenv").config({path :"src/.env"});
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const cors =require("cors");
app.use(cors());
app.use(express.json());


app.use("/api/chat",chatRoutes);
app.use("/api/users",authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Couldnt connect to MongoDB",err));
app.listen(PORT, (req, res) => {
  console.log("Server Listening as port 4000");
});
app.get("/", (req, res) => {
  res.send("Backend server is running");
});