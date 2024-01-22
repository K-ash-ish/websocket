const express = require("express");
const url = require("url");
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
const clientWsConnections = []; // uniqueClientId's
server.on("upgrade", (req, socket, header) => {
  socket.on("error", onSocketPreError);
  // perform auth

  wss.handleUpgrade(req, socket, header, (ws) => {
    socket.removeListener("error", onSocketPreError);
    wss.emit("connection", ws, req);
  });
});
//id's for new client
let id = 0;
wss.on("connection", (ws, req) => {
  ws.id = id++;
  clientWsConnections.push({ id: ws.id, socket: ws });
  console.log(clientWsConnections, ws.id);
  ws.on("error", onSocketPostError);
  ws.on("message", (message, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(client);
      }
    });
    clientWsConnections.forEach((client) => {
      console.log(client);
      if (client.id === 1 && client.readyState === WebSocket.OPEN) {
        console.log("in");
        client.send(message);
      }
    });
    console.log("message: ", message.toString());
  });
  ws.on("close", () => {
    console.log("Active Clients: ", clientWsConnections);
    console.log("Scoket Connection is closed");
  });
});
