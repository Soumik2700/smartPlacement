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
import HRDashboard from './components/Student/HRDashboard.jsx';
import StudentLogin from './components/Student/StudentLogin.jsx';
import HrLogin from './components/Student/HrLogin.jsx';
import TpoLogin from './components/Student/TpoLogin.jsx';
import AdminLogin from './components/Student/AdminLogin.jsx';
import AdminDashboard from './components/Student/AdminDashboard.jsx';
import TPODashboard from './components/TPO/TPODashboard.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
        path: "/HRDashboard",
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
