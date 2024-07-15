const chatService = require("../services/chatService");
const chat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);
    const chat = await chatService.chat({
      message,
      userId,
    });
    return res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const fetchChats = async (req, res) => {
  try {
    const userId = req.user.id;
   
    const chats = await chatService.fetchChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    chat,
    fetchChats
  };