# 🧠 Task Management System

A feature-rich task management system built to demonstrate real-world software development skills with a focus on team collaboration, task lifecycle management, and clean architecture.

---

## 🌟 Objective

Build a robust application that showcases proficiency in full-stack development, problem-solving, and handling real-world scenarios through effective task and team management features.

---

## 📂 Assignment Overview

This system is tailored for small teams to:

- Create and manage tasks
- Assign tasks to teammates
- Track progress and deadlines
- Collaborate efficiently

---

## 🧹 Core Features

### ✅ User Authentication

- Secure registration and login
- Password hashing and session/token management (e.g., JWT)
- User sessions with security best practices

### ✅ Task Management

- Create tasks with:
  - Title
  - Description
  - Due Date
  - Priority
  - Status (To Do, In Progress, Completed, etc.)
- Full CRUD operations

### ✅ Team Collaboration

- Assign tasks to other users
- Notification system (e.g., in-app or email) on task assignment

### ✅ Dashboard

Users can view:

- Tasks assigned to them
- Tasks they created
- Overdue tasks

### ✅ Search and Filter

- Search tasks by title or description
- Filter by:
  - Status
  - Priority
  - Due Date

---

## ⚙️ Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Frontend      | Next.js           |
| Backend       | Node.js + NestJS / Express |
| Database      | MongoDB / PostgreSQL |
| Deployment    | Vercel / Netlify / Railway / Render |
| Auth & Security | JWT, Bcrypt        |
| Version Control | Git + GitHub/GitLab |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

#SetUp Backend

cd backend
npm install
# Environment variables
cp .env.example .env
npm run start:dev


#SetUp Frontend

cd frontend
npm install
npm run dev
