

# 📘 GoTask Frontend

GoTask is a powerful and clean Task Management Application built using the **MERN stack**. This is the **frontend** of the project, developed using **React**, **Tailwind CSS**, and **Axios**. It allows users to manage tasks with features like task creation, editing, deletion, filtering, and status updates.

---

## 🧩 Tech Stack & Dependencies

- **React** – Frontend UI library
- **Axios** – For HTTP requests to backend API
- **Tailwind CSS** – For utility-first styling
- **React Icons** – For modern icon integration
- **React Toastify** – For toast notifications
- **React Router DOM (optional)** – For client-side routing (if used)

---

## ✨ Features

- 🔐 Token-based authentication support
- ➕ Create new tasks with title, description, priority, and status
- 📝 Edit existing tasks with live state update
- ❌ Delete tasks
- ✅ Filter tasks by **Not Started**, **In Progress**, and **Completed**
- 📦 Smooth UI transitions using conditional rendering
- 📱 Fully responsive design using Tailwind CSS

---

## 🛠️ How to Run the Frontend Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/gotask-frontend.git
cd gotask-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend Server
```bash
npm run dev
```

The app will run on [http://localhost:5173](http://localhost:5173)

---


## 📌 Notes

- Make sure your **backend** server (GoTask backend) is also running on port `3000` (or update `.env` accordingly).
- Token authentication is handled via `localStorage`.
- Task state is managed locally through React `useState`.

---

