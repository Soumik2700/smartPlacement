import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/StudentLogin" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const dashboardMap = {
            student: '/studentDashboard',
            hr: '/HRDashboard',
            admin: '/adminDashboard'
        };
        return <Navigate to={dashboardMap[user.role] || '/'} replace />;
    }

    return children;
};

export default ProtectedRoute;
