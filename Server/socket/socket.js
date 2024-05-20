// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");
// const app = express();
// const server = http.createServer(app);
import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], method: ["GET,POST"] },
});
const getReceiverSocketId = (receiverSocketEmail) => {
  return userSocketMap[receiverSocketEmail];
};
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connect ", socket.id);
  const userEmail = socket.handshake.query.userEmail;
  if (userEmail != "undefined") {
    userSocketMap[userEmail] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log(userSocketMap);

  socket.on("disconnect", () => {
    delete userSocketMap[userEmail];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(userSocketMap);
  });
});
export { app, io, server, getReceiverSocketId };
//module.exports = { app, io, server, getReceiverSocketId };
