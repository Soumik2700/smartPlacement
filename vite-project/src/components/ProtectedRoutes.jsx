import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Check for HR authentication from localStorage if user context is not available
    const checkHRAuth = () => {
        const hrToken = localStorage.getItem("hrToken");
        const hrData = localStorage.getItem("hrData");
        
        if (hrToken && hrData) {
            try {
                const parsedHrData = JSON.parse(hrData);
                return {
                    token: hrToken,
                    role: 'hr',
                    data: parsedHrData
                };
            } catch (error) {
                console.error("Error parsing HR data:", error);
                return null;
            }
        }
        return null;
    };

    // Check for Student authentication from localStorage if user context is not available
    const checkStudentAuth = () => {
        const studentToken = localStorage.getItem("token") || localStorage.getItem("studentToken");
        const studentData = localStorage.getItem("userData") || localStorage.getItem("studentData");
        
        if (studentToken && studentData) {
            try {
                const parsedStudentData = JSON.parse(studentData);
                return {
                    token: studentToken,
                    role: 'student',
                    data: parsedStudentData
                };
            } catch (error) {
                console.error("Error parsing Student data:", error);
                return null;
            }
        }
        return null;
    };

    // Check for Admin authentication from localStorage if user context is not available
    const checkAdminAuth = () => {
        const adminToken = localStorage.getItem("adminToken");
        const adminData = localStorage.getItem("adminData");
        
        if (adminToken && adminData) {
            try {
                const parsedAdminData = JSON.parse(adminData);
                return {
                    token: adminToken,
                    role: 'admin',
                    data: parsedAdminData
                };
            } catch (error) {
                console.error("Error parsing Admin data:", error);
                return null;
            }
        }
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // If no user from context, check localStorage for different user types
    let currentUser = user;
    if (!currentUser) {
        const hrAuth = checkHRAuth();
        const studentAuth = checkStudentAuth();
        const adminAuth = checkAdminAuth();
        
        currentUser = hrAuth || studentAuth || adminAuth;
    }

    if (!currentUser) {
        // Redirect to appropriate login page based on required role
        const loginRoutes = {
            student: '/StudentLogin',
            hr: '/HrLogin',
            admin: '/AdminLogin'
        };
        
        const redirectTo = requiredRole ? loginRoutes[requiredRole] : '/StudentLogin';
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const dashboardMap = {
            student: `/studentDashboard/${currentUser.data?.id || currentUser.data?._id || 'default'}`,
            hr: '/HRDashboard',
            admin: '/adminDashboard'
        };
        return <Navigate to={dashboardMap[currentUser.role] || '/'} replace />;
    }

    return children;
};

export default ProtectedRoute;
