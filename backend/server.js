// const express = require("express");
// const url = require("url");
// const { WebSocketServer, WebSocket } = require("ws");
// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// function onSocketPreError(error) {
//   console.log(error);
// }

// function onSocketPostError(error) {
//   console.log(error);
// }
// // api routes
// app.get("/", (req, res) => {
//   res.send("WebSocket Server...");
// });
// app.post("/api/login", (req, res) => {
//   // console.log(req.body);
//   const { username, password } = req.body;
//   if (username === "user1" && password === "bar") {
//     res.status(200).json({ redirectUrl: "/chatroom/2" });
//   }
// });

// const server = app.listen(port, (req, res) => {
//   console.log("Server running at port: ", 3000);
// });
// // webScoket server init
// const wss = new WebSocketServer({ noServer: true });
// const clientWsConnections = []; // uniqueClientId's
// server.on("upgrade", (req, socket, header) => {
//   socket.on("error", onSocketPreError);
//   // perform auth

//   wss.handleUpgrade(req, socket, header, (ws) => {
//     socket.removeListener("error", onSocketPreError);
//     wss.emit("connection", ws, req);
//   });
// });
// //id's for new client
// let id = 0;
// wss.on("connection", (ws, req) => {
//   ws.id = ++id;
//   clientWsConnections.push(ws);
//   console.log(clientWsConnections);
//   clientWsConnections.forEach((ws) => console.log(ws.id));
//   ws.on("error", onSocketPostError);
//   ws.on("message", (message, isBinary) => {
//     // wss.clients.forEach((client) => {
//     //   if (client.readyState === WebSocket.OPEN) {
//     //     console.log(client);
//     //   }
//     // });
//     clientWsConnections.forEach((client) => {
//       console.log(client);
//       if (client.id === 1 && client.readyState === WebSocket.OPEN) {
//         console.log("in");
//         client.send(message, { binary: isBinary });
//       }
//     });
//     console.log("message: ", message.toString());
//   });
//   ws.on("close", () => {
//     console.log("Active Clients: ", clientWsConnections);
//     console.log("Scoket Connection is closed");
//   });
// });
