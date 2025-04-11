# 📇 Contact Manager API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** to manage user authentication and personal contact lists. Users can securely register, log in, and perform CRUD operations on their own contacts.

------

## 📌 Project Info

- **Name**: contacts-backend-api
- **Author**: Ashish Vora
- **Version**: 1.0.0
- **License**: ISC

------

## 🚀 Features

- 🔐 **JWT Authentication** – Register/Login & secure private routes
- 👤 **User Profile** – Access current logged-in user
- 📇 **Contact CRUD** – Create, Read, Update, Delete personal contacts
- 💾 **MongoDB Integration** – Data persistence using Mongoose
- 🧰 **Custom Middleware** – Token validation and error handling
- 📦 **Environment Config** – Secure and flexible environment via `.env`

------

## 📁 Folder Structure

```
├── config/
│   └── dbConnection.js         # MongoDB connection setup
├── constants.js                # HTTP status codes/messages
├── controllers/
│   ├── contact.controller.js   # Contact logic
│   └── user.controller.js      # (add for user logic)
├── middleware/
│   ├── errorHandler.js         # Central error handling
│   └── validateTokenHandler.js # Token verification
├── models/
│   ├── contact.model.js        # Contact schema
│   └── user.model.js           # (add for user schema)
├── routes/
│   ├── contact.routes.js       # Contact routes (protected)
│   └── user.routes.js          # Auth & user routes
├── server.js                   # App entry point
├── package.json
└── .env                        # Environment variables
```

------

## ⚙️ Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/ashishvora1997/contact-crud-with-auth.git
cd contact-crud-with-auth
```

### 2. Install Dependencies

```
npm install
```

------

## 🧪 Scripts

| Script   | Command       | Description                |
| -------- | ------------- | -------------------------- |
| Start    | `npm start`   | Run app in production      |
| Dev Mode | `npm run dev` | Run app with Nodemon (dev) |
| Test     | `npm test`    | Placeholder test script    |

------

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following:

```
PORT=5001
CONNECTION_STRING=your_mongo_connection_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

------

## 🔐 Auth Routes (`/api/users`)

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a user     |
| POST   | `/login`    | Login and get token |
| GET    | `/current`  | Get current user    |

------

## 📇 Contact Routes (`/api/contacts`)

> ⚠️ Protected by JWT. Add `Authorization: Bearer <token>` to headers.

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| GET    | `/`      | Get all user contacts |
| POST   | `/`      | Create a new contact  |
| GET    | `/:id`   | Get contact by ID     |
| PUT    | `/:id`   | Update contact by ID  |
| DELETE | `/:id`   | Delete contact by ID  |

------

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**
- **Nodemon** (for development)

------

## 🧱 Sample MongoDB Schema

```
{
  user_id: ObjectId,     // Linked to User
  name: String,
  email: String,
  phone: String
}
```

------

## ❗ Error Handling

Centralized and consistent error responses:

- `400` – Bad Request
- `401` – Unauthorized
- `403` – Forbidden
- `404` – Not Found
- `500` – Server Error

------

## 📄 License

Licensed under the ISC License © Ashish Vora