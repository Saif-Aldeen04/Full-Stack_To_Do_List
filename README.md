# 🧩 Node.js Auth App (Express + MongoDB)

A small full-stack Node.js project demonstrating user signup/login with session-based authentication, protected routes, and a clean EJS-based UI.

---

## 📖 About This Repository  

This repository contains a simple authentication system built with Node.js, Express, EJS templates, and MongoDB (Mongoose).

It is designed for:

- Beginners learning how to build a full-stack Node.js app with auth
- Developers wanting a basic template for login/signup flows
- People who want a simple example of sessions, protected routes, and MongoDB user storage

---

## 🧠 What You’ll Find Here

- ✅ User signup and login with hashed passwords
- ✅ Session-based authentication (express-session)
- ✅ Protected routes that require login
- ✅ EJS views for rendering server-side HTML
- ✅ Basic UI for authentication pages

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- MongoDB running locally or a MongoDB Atlas URI

### Install

```bash
npm install
```

### Configure

Create a `.env` file at the project root with:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db-name
SESSION_SECRET=some_secret_value
```

### Run

```bash
npm start
```

Then open: `http://localhost:3000`

---

## 🧱 Project Structure

```bash
nodejs-auth-app/
├── app.js
├── package.json
├── models/
│   └── User.js
├── public/
│   ├── auth.css
│   ├── style.css
│   └── logic/
│       ├── authLogin.js
│       ├── authSignup.js
│       └── main.js
└── views/
    ├── home.ejs
    ├── login.ejs
    └── signup.ejs
```

---

## 🎯 Project Goals

- Build a working authentication flow using Express and MongoDB
- Learn session management with `express-session`
- Understand how to protect routes behind login
- Provide a minimal, clean starter template for future projects

---

## 👤 Author

**Seif Aldeen**  

---

## 📌 Notes

- This project is intentionally simple and meant for learning.
- Feel free to expand it with features like email verification, password reset, or JWT tokens.
