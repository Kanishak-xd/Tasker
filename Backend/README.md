# Backend - Tasker

Node.js + Express backend API.

## Setup

```bash
npm install
npm start
```

The server will run on http://localhost:3000

## Environment Variables

Create a `.env` file in the Backend directory with:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tasker
JWT_SECRET=your-secret-key-here
```

## API Endpoints

### Authentication

- `POST /register` - Register a new user
- `POST /login` - Login and get JWT token

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- dotenv

