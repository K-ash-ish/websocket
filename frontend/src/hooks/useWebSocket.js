import { useState } from "react";
const useWebSocket = () => {
  const [ws, setWs] = useState("");

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
  const sendMessage = (message) => {
    ws.send(message);
  };
  return { openConnection, closeConnection, sendMessage };
};
export default useWebSocket;
