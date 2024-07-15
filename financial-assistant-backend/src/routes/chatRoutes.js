const express= require("express");
const authenticateToken = require("../middleware/authenticateToken");
const chatController = require("../controllers/chatController")
const router = express.Router();
router.post("/",authenticateToken,chatController.chat) ;
router.get("/fetchChats",authenticateToken,chatController.fetchChats) ;
module.exports =router;