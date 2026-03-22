# JobTrackr – Job Application Analytics Dashboard

A modern React dashboard application for tracking job applications, visualizing analytics, and managing your job search efficiently.

Built with a focus on real-world SaaS product design, clean architecture, and scalable frontend practices.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?logo=firebase)

## Features

### 🔐 Authentication
- User registration & login with Firebase Auth
- Protected dashboard routes
- Persistent auth state
- Secure logout

### 📊 Dashboard
- Overview stats with animated cards
- Pie chart — application status distribution
- Bar chart — monthly applications
- API-driven trending job roles & latest remote listings
- Recent applications feed

### 📝 Applications CRUD
- Add, edit, and delete job applications
- Responsive table (desktop) & card (mobile) views
- Modal forms with validation
- Fields: company, position, status, location, date applied
- Real-time Firestore persistence

### 🔍 Filtering
- Filter by status (Applied, Interview, Rejected, Offer)
- Search by company name
- Date range filtering
- One-click clear filters

### 📈 Analytics
- Bar chart: applications per month
- Donut chart: status distribution with labels
- Area chart: cumulative growth over time
- Key metrics: response rate, offer rate, avg/month
- Status breakdown with progress bars

### 🌐 API Integration
- Remotive API for remote job listings
- Trending job roles aggregation
- Latest tech jobs with direct links

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 8 | Build tool |
| Tailwind CSS 4 | Styling |
| React Router 7 | Routing |
| Firebase Auth | Authentication |
| Cloud Firestore | Database |
| Recharts | Charts & analytics |
| Axios | HTTP requests |
| Lucide React | Icons |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChartCard.jsx    # Chart wrapper
│   ├── DashboardLayout.jsx  # Main layout with sidebar
│   ├── FilterBar.jsx    # Application filters
│   ├── JobTable.jsx     # Responsive data table
│   ├── Modal.jsx        # Add/edit application modal
│   ├── Navbar.jsx       # Top navigation bar
│   ├── ProtectedRoute.jsx  # Auth guard
│   ├── Sidebar.jsx      # Side navigation
│   └── StatCard.jsx     # Stats display card
├── context/
│   └── AuthContext.jsx  # Firebase auth state management
├── hooks/
│   └── useApplications.js  # Firestore CRUD hook
├── pages/
│   ├── AnalyticsPage.jsx    # Charts & metrics
│   ├── ApplicationsPage.jsx # CRUD + filtering
│   ├── DashboardPage.jsx    # Overview dashboard
│   ├── LoginPage.jsx        # Auth - login
│   └── RegisterPage.jsx     # Auth - register
├── services/
│   ├── apiService.js        # Remotive API integration
│   ├── applicationService.js # Firestore operations
│   ├── firebase.config.js   # Firebase credentials
│   └── firebase.js          # Firebase initialization
├── utils/
│   └── helpers.js           # Formatters, aggregators, constants
├── App.jsx                  # Router & providers
├── index.css                # Global styles & design system
└── main.jsx                 # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication and Firestore enabled

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/jobtrackr.git
cd jobtrackr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Email/Password** authentication under Authentication > Sign-in method
3. Create a **Cloud Firestore** database (start in test mode for development)
4. Copy your project's Firebase config values
5. Create a `.env` file from the template:

```bash
cp .env.example .env
```

6. Fill in your Firebase credentials in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Set up Firestore indexes

Create the following composite index in Firestore:

- **Collection:** `applications`
- **Fields:** `userId` (Ascending), `createdAt` (Descending)

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables in the Vercel dashboard (Settings > Environment Variables)
4. Deploy — Vercel auto-detects Vite projects

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add your environment variables in Site Settings > Environment Variables
5. Add a `_redirects` file in the `public` folder for SPA routing:

```
/*    /index.html   200
```

6. Deploy

## Firestore Security Rules

For production, update your Firestore rules to restrict access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{docId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

👨‍💻 Author 

Ahmed Elbarbary

GitHub: https://github.com/bittmoon
Portfolio: https://barbaryportfolio.netlify.app
LinkedIn: https://linkedin.com/in/ahmed-elbarbary-03873b326
⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
