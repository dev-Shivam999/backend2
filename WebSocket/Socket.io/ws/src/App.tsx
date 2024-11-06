import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000"); 
interface Chat {
  data: string,
  user: string
}

function App() {
  const [message, setMessage] = useState<Chat[]>([]) 
  const [data, setData] = useState("");

  useEffect(() => {
    
    socket.on("message", (data) => {
     
      setMessage(data); 
    });

    
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (data) {
      socket.emit("message", {data}); 
      setData(""); 
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={sendMessage}>Magic</button>
        <div>{message.map((p,i) => <div key={i}>
          <span>userId :  {"  "}
            {p.user}</span>{"   "}<span> Message : {" "} { p.data}</span></div>)}</div> {/* Display the incoming message */}
      </div>
    </>
  );
}

export default App;
