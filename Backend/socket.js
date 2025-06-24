const { Server } = require("socket.io");
const userModal = require("./models/UserModel");
const captainModel = require("./models/CaptionModal");

let io = null;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log(`Socket connected: ${socket.id}`);
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      // console.log(`userType ${userType} joined as userId${userId}`);
      if (userType === "user") {
        await userModal.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
      if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      // console.log(
      //   `captain ${userId} updated location to ${location.ltd} ${location.lang}`
      // );
      if (!location || !location.ltd || !location.lang) {
        return socket.emit("error", { message: "Invalid location data" });
      }
      // console.log(`user ${userId} updated location to ${location}`);
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lang: location.lang,
        },
      });
    });
    socket.on("disconnect", () => {
      // console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocket(socketId, message) {
  // console.log( `Sending message to socket ${socketId} with message ${message.data}`);
  if (io) {
    io.to(socketId).emit(message.event, message.data);
  }
}

function broadcastMessage(event, message) {
  if (io) {
    io.emit(event, message);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocket,
  broadcastMessage,
};
