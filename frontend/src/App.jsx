import { useState } from "react";

function App() {
  const [ws, setWs] = useState("");
  const [message, setMessage] = useState("");
  const openConnection = () => {
    const openWs = new WebSocket("ws://localhost:3000");
    openWs.addEventListener("error", () => {
      console.log("Error From openWs : ");
    });

    openWs.addEventListener("open", () => {
      console.log("WebSocket connection open");
    });
    openWs.addEventListener("close", () => {
      console.log("WebSocket connection close");
    });
    openWs.addEventListener("message", (msg) => {
      console.log("message:", msg, msg.data);
    });
    setWs(openWs);
  };
  const closeConnection = () => {
    ws.close();
  };
  const sendMessage = () => {
    ws.send(message);
  };

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

          <button onClick={sendMessage}>Send</button>
        </div>
        <div>Messages: </div>
      </div>
    </div>
  );
}

export default App;
