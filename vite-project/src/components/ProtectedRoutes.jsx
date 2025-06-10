import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const location = useLocation();

    console.log("ProtectedRoute - Required role:", requiredRole);
    console.log("ProtectedRoute - Current location:", location.pathname);

    // Check for HR authentication from localStorage
    const checkHRAuth = () => {
        const hrToken = localStorage.getItem("hrToken");
        const hrData = localStorage.getItem("hrData");
        
        console.log("Checking HR auth:", { hrToken: !!hrToken, hrData: !!hrData });
        
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
                localStorage.removeItem("hrToken");
                localStorage.removeItem("hrData");
                return null;
            }
        }
        return null;
    };

    // Check for Student authentication from localStorage
    const checkStudentAuth = () => {
        const studentToken = localStorage.getItem("studentToken");
        const studentData = localStorage.getItem("studentData");
        
        console.log("Checking Student auth:", { studentToken: !!studentToken, studentData: !!studentData });
        
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
                localStorage.removeItem("studentToken");
                localStorage.removeItem("studentData");
                return null;
            }
        }
        return null;
    };

    // Check for Admin authentication from localStorage
    const checkAdminAuth = () => {
        const adminToken = localStorage.getItem("adminToken");
        const adminData = localStorage.getItem("adminData");
        
        console.log("Checking Admin auth:", { adminToken: !!adminToken, adminData: !!adminData });
        
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
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminData");
                return null;
            }
        }
        return null;
    };

    // Check for TPO authentication from localStorage
    const checkTPOAuth = () => {
        const tpoToken = localStorage.getItem("tpoToken");
        const tpoData = localStorage.getItem("tpoData");
        
        console.log("Checking TPO auth:", { tpoToken: !!tpoToken, tpoData: !!tpoData });
        
        if (tpoToken && tpoData) {
            try {
                const parsedTPOData = JSON.parse(tpoData);
                return {
                    token: tpoToken,
                    role: 'tpo',
                    data: parsedTPOData
                };
            } catch (error) {
                console.error("Error parsing TPO data:", error);
                localStorage.removeItem("tpoToken");
                localStorage.removeItem("tpoData");
                return null;
            }
        }
        return null;
    };

    // Check authentication based on required role first, then check all
    let currentUser = null;
    
    if (requiredRole) {
        // Check specific role first
        switch (requiredRole) {
            case 'hr':
                currentUser = checkHRAuth();
                break;
            case 'student':
                currentUser = checkStudentAuth();
                break;
            case 'admin':
                currentUser = checkAdminAuth();
                break;
            case 'tpo':
                currentUser = checkTPOAuth();
                break;
        }
    } else {
        // Check all roles if no specific role required
        currentUser = checkHRAuth() || checkAdminAuth() || checkStudentAuth() || checkTPOAuth();
    }

    console.log("Current user:", currentUser);

    // If no authentication found, redirect to appropriate login
    if (!currentUser) {
        const loginRoutes = {
            student: '/StudentLogin',
            hr: '/HrLogin',
            admin: '/AdminLogin',
            tpo: '/TpoLogin'
        };
        
        const redirectTo = requiredRole ? loginRoutes[requiredRole] : '/StudentLogin';
        console.log("No auth found, redirecting to:", redirectTo);
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If specific role required and user doesn't have that role, redirect to their dashboard
    if (requiredRole && currentUser.role !== requiredRole) {
        const dashboardMap = {
            student: `/studentDashboard/${currentUser.data?.id || currentUser.data?._id || 'default'}`,
            hr: '/HRDashboard',
            admin: '/adminDashboard',
            tpo: '/TPODashboard'
        };
        const redirectTo = dashboardMap[currentUser.role] || '/';
        console.log("Wrong role, redirecting to:", redirectTo);
        return <Navigate to={redirectTo} replace />;
    }

    console.log("Access granted, rendering children");
    return children;
};

export default ProtectedRoute;
