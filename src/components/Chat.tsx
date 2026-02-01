import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Define types for messages
interface Message {
  text: string;
  from: string;
  personal?: boolean;
}

interface ChatProps {
  mode: 'group' | 'personal';
  targetId: string;
}

const socket: SocketIOClient.Socket = io('http://localhost:8000');

function Chat({ mode, targetId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (mode === 'group' && targetId) {
      socket.emit('join-group', targetId);
    }

    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [mode, targetId]);

  const sendMessage = () => {
    if (input.trim()) {
      if (mode === 'group') {
        socket.emit('group-message', { groupId: targetId, text: input });
      } else {
        socket.emit('personal-message', { to: targetId, text: input });
      }
      setInput('');
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, i) => (
          <p key={i}>{msg.from}: {msg.text}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
