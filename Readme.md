
# Chat Application Backend

This is the backend for the **Real-Time Chat Application** using **Node.js**, **Express**, **Socket.IO**, and **MongoDB**. The backend handles user authentication, real-time messaging via websockets, and managing private and group chats.

## Features

- **User Authentication**: Users can register and login using JWT-based authentication.
- **Group Chat**: Supports global chat for all connected users.
- **Private Chat**: Allows users to send direct messages to specific online users.
- **Online Users List**: Tracks and displays users currently online.
- **Typing Indicator**: Notifies when a user is typing in real-time.
- **JWT Authentication Middleware**: Protects routes and websocket connections with JWT verification.

## Technologies Used

- **Node.js**: Backend server runtime.
- **Express**: Web framework for Node.js.
- **Socket.IO**: For real-time, bi-directional communication between clients and server.
- **MongoDB**: NoSQL database to store user information.
- **JWT (JSON Web Token)**: For secure user authentication.
- **Bcrypt**: To hash and compare passwords.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your local machine.
- **MongoDB** installed locally or a connection string to a MongoDB Atlas cluster.
- **Socket.IO** installed for real-time messaging.

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/mohamedkaif10/chat-backend.git
cd chat-backend
```

### 2. Install Dependencies

Once you're in the project directory, install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```bash
# .env
PORT=8000
MONGO_URI=your_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace the `MONGO_URI` with your MongoDB connection string if you are using a cloud-based MongoDB service like MongoDB Atlas.

### 4. Run the Application

To start the backend server, run the following command:

```bash
npm run dev
```

This will start the server on `http://localhost:8000`.

### 5. Socket.IO Integration

Ensure that your frontend client is connecting to the correct endpoint (by default `http://localhost:8000`). The backend will handle real-time messaging via **Socket.IO**.

## API Endpoints

### User Registration

- **POST** `/api/users/register`
  
  Registers a new user.

  **Request Body**:

  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### User Login

- **POST** `/api/users/login`
  
  Authenticates a user and returns a JWT token.

  **Request Body**:

  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### Get Online Users

- **GET** `/api/users/online-users`

  Returns a list of online users who are currently connected to the chat.

## WebSocket Events

The backend uses **Socket.IO** to handle real-time communication between users.

### Events

- **`connect`**: Establishes a connection with the server.
- **`disconnect`**: Handles user disconnection from the server.
- **`chatMessage`**: Broadcasts messages to the global chat.
- **`privateMessage`**: Sends direct messages to specific users.
- **`typing`**: Notifies when a user is typing in real-time.
- **`stopTyping`**: Notifies when a user stops typing.

### Authentication with WebSockets

The backend verifies the JWT token sent by the client through Socket.IO when a connection is established. This ensures that only authenticated users can participate in the chat.


## Troubleshooting

### Socket Connection Issues

- Ensure the backend server is running and reachable at the correct endpoint.
- Check the `ENDPOINT` variable in the frontend to make sure it matches the backend URL.

### Token Issues

- Ensure the JWT token is properly generated and stored in `localStorage` on the frontend.
- Verify that the token is included in the headers of requests and sent through Socket.IO for authentication.

