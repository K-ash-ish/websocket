const express = require("express");
const { WebSocketServer, WebSocket } = require("ws");
const app = express();
const port = 3000;
function onSocketPreError(error) {
  console.log(error);
}

function onSocketPostError(error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("WebSocket Server...");
});

const server = app.listen(port, (req, res) => {
  console.log("Server running at port: ", 3000);
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, header) => {
  socket.on("error", onSocketPreError);
  console.log("onUpgrade req: ", req);
  // perform auth

  wss.handleUpgrade(req, socket, header, (ws) => {
    socket.removeListener("error", onSocketPreError);
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req) => {
  ws.on("error", onSocketPostError);
  ws.on("message", (message, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });
  ws.on("close", () => {
    console.log("Scoket Connection is closed");
  });
});
