// App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Mengganti URL sesuai dengan URL server Anda

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Menghandle event 'message' dari server
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      // Membersihkan event listener ketika komponen unmount
      socket.off('message');
    };
  }, [messages]);

  const sendMessage = () => {
    // Mengirim pesan ke server
    socket.emit('message', input);
    setInput('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
