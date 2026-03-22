# 🚀 JobTrackr – Job Application Analytics Dashboard

A modern **React dashboard application** for tracking job applications, visualizing analytics, and managing your job search efficiently.

Built with a focus on **real-world SaaS product design**, clean architecture, and scalable frontend practices.

---

## 📸 Preview

![Dashboard Preview](./screenshot.png)

---

## ✨ Features

### 🔐 Authentication

- User registration & login
- Secure authentication with Firebase
- Protected routes

### 📊 Dashboard Analytics

- Total applications, interviews, offers, and rejections
- Interactive charts:
  - Applications by status
  - Monthly application trends

- Real-time stats updates

### 📋 Job Management (CRUD)

- Add job applications
- Edit existing entries
- Delete applications
- Track job status:
  - Applied
  - Interview
  - Offer
  - Rejected

### 🔎 Filtering & Search

- Filter by status
- Search by company or position
- Sort applications

### 🌐 API Integration

- Fetch trending job roles
- Display latest remote job listings

### 🎨 Modern UI/UX

- Clean SaaS-style dashboard
- Dark mode design
- Responsive layout (mobile-friendly)
- Reusable UI components

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router

### State & Data

- Context API
- Custom Hooks

### Backend / Services

- Firebase Authentication
- Firebase Firestore

### Data Visualization

- Recharts

### API Requests

- Axios

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # App pages (Dashboard, Login, etc.)
├── context/        # Global state (Auth, Jobs)
├── hooks/          # Custom hooks
├── services/       # API & Firebase logic
├── utils/          # Helper functions
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bittmoon/jobtracker.git
cd jobtracker
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### 4. Run the development server

```bash
npm run dev
```

---

## 🚀 Deployment

You can deploy this project easily using:

- Vercel
- Netlify

### Example (Vercel)

```bash
npm run build
```

Then upload the `dist` folder or connect your GitHub repo.

---

## 🧠 Key Learning Outcomes

This project demonstrates:

- Building a **scalable React architecture**
- Managing global state with Context API
- Implementing **authentication flows**
- Creating reusable UI components
- Integrating third-party APIs
- Data visualization with charts
- Building real-world dashboard UX

---

## 🔥 Future Improvements

- Drag & drop Kanban board for job tracking
- Dark/light theme toggle
- Export data to CSV
- Advanced analytics (conversion rates)
- Notifications system

---

## 👨‍💻 Author

Ahmed Elbarbary

- GitHub: https://github.com/bittmoon
- Portfolio: https://barbaryportfolio.netlify.app
- LinkedIn: https://linkedin.com/in/ahmed-elbarbary-03873b326

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
