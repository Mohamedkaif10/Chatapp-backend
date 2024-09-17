const express = require("express");
const http = require("http");
const connectDB = require("./config/Db");
const userRoutes = require("./routes/userroute");
const { initializeSocket } = require("./functions/socketfunction");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const cors = require("cors");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
connectDB();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);

initializeSocket(io);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
