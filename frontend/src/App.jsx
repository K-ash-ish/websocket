import { useState } from "react";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const [message, setMessage] = useState("");
  const { openConnection, closeConnection, sendMessage } = useWebSocket();

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <div>
        <button onClick={openConnection}>Open Connection</button>
        <button onClick={closeConnection}>Close Connection</button>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={() => sendMessage(message)}>Send</button>
        </div>
        <div>Messages: </div>
      </div>
    </div>
  );
}

export default App;
