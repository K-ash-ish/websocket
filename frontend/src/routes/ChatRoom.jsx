import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const { userid } = useParams();
  console.log(userid);
  const { openWsConnection, closeWsConnection, sendMessage } = useWebSocket();
  return (
    <div>
      <h1>WebSocket Demo</h1>
      <div>
        <button onClick={openWsConnection}>Open Connection</button>
        <button onClick={closeWsConnection}>Close Connection</button>
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

export default ChatRoom;
