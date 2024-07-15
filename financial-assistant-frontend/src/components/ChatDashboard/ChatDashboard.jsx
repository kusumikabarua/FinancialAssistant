import React, { useEffect,useState } from "react";
import axios from "axios";
import "./ChatDashboard.css";
import { API_BASE_URL } from "../../config";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,  
  } from "mdb-react-ui-kit";

function ChatDashboard() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [chats, setChats] = useState([]);

  const isLoggedIn = localStorage.getItem("token") ? true : false;

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchChats = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/chat/fetchChats`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div className="App">
          <h1>Financial Assistant</h1>
          <div className="chat-container">
            <div className="chat-box">
              {answer && <div className="answer">{answer}</div>}
            </div>
            <div className="input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <h2>Welcome to the Financial Assistant App</h2>

          <div>
            <a href="/login" className="btn btn-primary mx-2">
              Login
            </a>
            <a href="/register" className="btn btn-secondary mx-2">
              Sign Up
            </a>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <MDBTable className="text-black mb-0">
          <MDBTableHead>
            <tr>
              <th scope="col">Chat</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {chats.map((chat) => (
              <tr className="fw-normal" key={chat._id}>
                <td className="align-middle">
                  <span style={{ fontWeight: "bold" }}>{chat.message}</span>
                  <br />
                  <span style={{ fontSize: "small", color: "gray" }}>
                    {chat.answer}
                  </span>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
    </div>
  );
}

export default ChatDashboard;
