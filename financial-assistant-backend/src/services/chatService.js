const Chat = require("../models/Chat");
const axios = require("axios");
require("dotenv").config({path :"../../.env"});
const chat = async (userId,message) => {
  try {
    const answer=await getOpenAIResponse(message);
    const chat = await Chat.create({userId:userId,message: message, answer:answer});
    return chat;
  } catch (error) {
    throw error;
  }
};
const getOpenAIResponse= async(message)=>{
    const apiUrl = process.env.CHAT_GPT_URL;
    const apiKey = process.env.YOUR_OPENAI_API_KEY;
  
    try {
      const response = await axios.post(
        apiUrl,
        {
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": message}],
          "max_tokens": 10
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
        }
      );
  
      const answer = response.data.choices[0].message.content.trim();
     return answer;
    } catch (error) {
      console.error("Error fetching response from ChatGPT:", error);
      res.status(500).json({ error: "Failed to fetch response from ChatGPT" });
    }
  
}

const fetchChats= async (userIdFromToken) => {
  try {
    let chats = await Chat.findAll({userId:userIdFromToken});
   
    
    return chats;
  } catch (error) {
    throw error;
  }
};
module.exports = {
    chat  ,
    fetchChats  
  };