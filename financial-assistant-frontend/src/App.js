import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/message', { message });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
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
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
