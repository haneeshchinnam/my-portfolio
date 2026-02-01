import './App.css'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import About from './components/About'
// import Skills from './components/Skills'
// import Contact from './components/Contact'
// import Footer from './components/Footer'
// import Projects from './components/Projects'
import { useEffect, useState } from 'react'
import api from './services/api';
import Login from './screens/Login';
import type { Socket } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import io from "socket.io-client";
// ...existing code...

const SERVER_URL = 'http://localhost:8000';

function App() {

//   const [events, setEvents] = useState<any[]>([]);

//     useEffect(() => {
//         const ws = new WebSocket('ws://localhost:8080/events');  // Connect to Spring Boot WebSocket

//         ws.onopen = () => {
//             console.log('Connected to WebSocket for webhook events');
//         };

//         ws.onmessage = (event) => {
//             console.log('Received event:', event.data);
//             setEvents((prev) => [...prev, event.data]);
//         };

//         ws.onclose = () => {
//             console.log('WebSocket disconnected');
//         };

//         return () => ws.close();
//     }, []);

interface JwtPayload {
  sub: string;        // subject (user id, email, etc.)
  exp: number;        // expiration time
  iat: number;        // issued at
  roles?: string[];   // custom claim (if present in your JWT) // allow extra claims
}

interface Message {
  text: string;
  from: string;
  personal?: boolean;
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};

    const [token, setToken] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [toUserId, setToUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("access-token"); // or sessionStorage
    if (token) {
      const decoded = decodeToken(token);
      setUserId(decoded?.sub || null);
    }
  }, [token]);

  console.log("Current userId:", userId);
  

    const onLogin = async () => {
        await api.post('/auth/login', {
            username: usernameInput,
            password: password,
            email: '123@email.com'
        }).then((response) => {
            console.log('Login response:', response.data);
            setToken(response.data.accessToken);
            localStorage.setItem('access-token', response.data.accessToken);
            const newSocket = io(SERVER_URL, {
      auth: { token: response.data.accessToken },
  reconnection: true,            // Enable auto-reconnect
//   reconnectionAttempts: Infinity, // Retry forever
//   reconnectionDelay: 1000,       // Wait 1s between retries
//   reconnectionDelayMax: 5000,    // Max delay 5s
//   timeout: 20000                 // Connection timeout
    });

    newSocket.on('connect', () => {
      console.log('Connected with socket id', newSocket.id);
    });

    newSocket.on('privateMessage', (data: any) => {
        console.log('Received private message:', data);
      setMessages((prev) => [...prev, {from: data.fromUserId
, text: data.message, personal: true}]);
    });

    newSocket.on('connect_error', (err: any) => {
      console.error('Connection error:', err.message);
    });

    newSocket.on('ping', () => {
        console.log("pong");
        
  newSocket.emit('pong');  // Respond immediately
});

// Detect disconnect and reconnect
newSocket.on('disconnect', (reason: any) => {
  console.log('Disconnected:', reason);
  if (reason === 'io server disconnect') {
    // Server disconnected; try manual reconnect
    newSocket.connect();
  }
  if (reason === 'ping timeout') {
    console.log('Ping timeout detected - reconnecting...');
  }
});

// On reconnect
newSocket.on('reconnect', (attempt: any) => {
  console.log('Reconnected after', attempt, 'attempts');
});

    setSocket(newSocket);
            
        }).catch((error) => {
            localStorage.removeItem('access-token');
            console.error('Login error:', error);
        });
    }

    const sendMessage = () => {
        console.log("Attempting to send message:", message, "to user:", toUserId);
        
    if (socket && toUserId.trim() && message.trim()) {
        console.log("Sending message to", toUserId, ":", message);
        
      socket.emit('privateMessage', { toUserId, message }).addEventListener('error', (err: any) => {
        console.error('Error sending message:', err);
      });
      // Optimistically add to own chat (mark as from self)
      setMessages((prev) => [...prev, { from: userId!, text: message }]);
      setMessage('');
    }
  };

  return (
   <div className="App">
      {/* <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer /> */}
      {/* <div>
            <h2>Received Webhook Events</h2>
            <ul>
                {events.map((ev, index) => (
                    <li key={index}>{ev}</li>
                ))}
            </ul>
        </div> */}
        {token ? <div><p>Logged in as: <strong>{userId}</strong></p>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Send to User ID (e.g., user2)"
              value={toUserId}
              onChange={(e) => setToUserId(e.target.value)}
              style={{ width: '40%', marginRight: '10px' }}
            />
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '40%', marginRight: '10px' }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div style={{ border: '1px solid #eee', padding: '10px', height: '300px', overflowY: 'scroll' }}>
            <h3>Chat Messages</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {messages.map((msg, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{msg.from === userId ? 'You' : msg.from}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div></div> : <Login onLogin={onLogin} setPasswordInput={setPassword} setUsernameInput={setUsernameInput} />}
    </div>
  )
}

export default App
