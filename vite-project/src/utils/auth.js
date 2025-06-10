// Authentication utility functions

export const clearAllAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("hrToken");
    localStorage.removeItem("hrData");
};

export const getCurrentUser = () => {
    // Check HR
    const hrToken = localStorage.getItem("hrToken");
    const hrData = localStorage.getItem("hrData");
    if (hrToken && hrData) {
        try {
            return {
                token: hrToken,
                role: 'hr',
                data: JSON.parse(hrData)
            };
        } catch (error) {
            console.error("Error parsing HR data:", error);
            localStorage.removeItem("hrToken");
            localStorage.removeItem("hrData");
        }
    }

    // Check Admin
    const adminToken = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");
    if (adminToken && adminData) {
        try {
            return {
                token: adminToken,
                role: 'admin',
                data: JSON.parse(adminData)
            };
        } catch (error) {
            console.error("Error parsing Admin data:", error);
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminData");
        }
    }

    // Check Student
    const studentToken = localStorage.getItem("studentToken");
    const studentData = localStorage.getItem("studentData");
    if (studentToken && studentData) {
        try {
            return {
                token: studentToken,
                role: 'student',
                data: JSON.parse(studentData)
            };
        } catch (error) {
            console.error("Error parsing Student data:", error);
            localStorage.removeItem("studentToken");
            localStorage.removeItem("studentData");
        }
    }

    return null;
};

export const isAuthenticated = (requiredRole = null) => {
    const user = getCurrentUser();
    if (!user) return false;
    if (requiredRole && user.role !== requiredRole) return false;
    return true;
};

export const logout = () => {
    clearAllAuthData();
    window.location.href = '/';
};