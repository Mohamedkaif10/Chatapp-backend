const jwt = require("jsonwebtoken");
const User = require("../models/user");

let connectedUsers = [];

const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;
    connectedUsers.push({ id: user.id, username: user.username });

    socket.join(user.id);

    next();
  } catch (error) {
    next(new Error("Authentication error: " + error.message));
  }
};

const initializeSocket = (io) => {
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`${socket.user.username} connected`);

    socket.on("chatMessage", (msg) => {
      const messageData = {
        username: socket.user.username,
        message: msg,
        timestamp: new Date(),
      };

      io.emit("message", messageData);
      console.log("Broadcasting message: ", messageData);
    });

    socket.on("privateMessage", ({ recipientId, message }) => {
      console.log(
        `Private message from ${socket.user.username} to user ${recipientId}: ${message}`
      );

      io.to(recipientId).emit("privateMessage", {
        from: socket.user.username,
        message,
        timestamp: new Date(),
      });
    });
    socket.on("typing", (recipientId) => {
      io.to(recipientId).emit("typing", socket.user.username);
    });

    socket.on("stopTyping", (recipientId) => {
      io.to(recipientId).emit("stopTyping", socket.user.username);
    });
    socket.on("disconnect", () => {
      console.log(`${socket.user.username} disconnected`);
      connectedUsers = connectedUsers.filter(
        (user) => user.id !== socket.user.id
      );
    });
  });
};
const getConnectedUsers = () => {
  return connectedUsers;
};

module.exports = { initializeSocket, getConnectedUsers };
