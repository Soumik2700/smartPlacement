import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

// Components
import LandingPage from './components/LandingPage.jsx';
import Register from './components/Register.jsx';
import HeroSection from './components/HeroSection.jsx';
import StudentDashboard from './components/Student/StudentDashboard.jsx';
import HRDashboard from './components/HR/HRDashboard.jsx';
import StudentLogin from './components/Student/StudentLogin.jsx';
import HrLogin from './components/HR/HrLogin.jsx';
import TpoLogin from './components/TPO/TpoLogin.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import TPODashboard from './components/TPO/TPODashboard.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HeroSection />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Register />
      },
      // Protected Routes
      {
        path: "/studentDashboard/:id",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/HRDashboard/:id",
        element: (
          <ProtectedRoute requiredRole="hr">
            <HRDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/TPODashboard",
        element: (
          <ProtectedRoute requiredRole="tpo">
            <TPODashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/adminDashboard",
        element: (
          // <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          // </ProtectedRoute>
        )
      },
      // Login Routes (Public)
      {
        path: "/StudentLogin",
        element: <StudentLogin />
      },
      {
        path: "/HrLogin",
        element: <HrLogin />
      },
      {
        path: "/TpoLogin",
        element: <TpoLogin />
      },
      {
        path: "/AdminLogin",
        element: <AdminLogin />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
