import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Lazy-loaded routes
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));

// Suspense fallback
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-surface-950">
    <div className="relative flex items-center justify-center w-12 h-12">
      <div className="absolute w-full h-full border-2 border-primary-500/20 rounded-full"></div>
      <div className="absolute w-full h-full border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-sm font-medium text-surface-400 animate-pulse tracking-wide">Loading workspace...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(24, 24, 27, 0.8)',
              color: '#e4e4e7',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.5)',
              borderRadius: '1rem',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#34d399', secondary: '#18181b' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#18181b' },
            },
          }}
        />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
