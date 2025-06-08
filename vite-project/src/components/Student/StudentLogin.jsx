import { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || `/studentDashboard`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      console.log('Attempting login with:', { email });

      const response = await axios.post('http://localhost:5100/students/login', {
        email: email.trim(),
        password: password
      });

      const data = response.data;
      console.log('Login response:', data);

      if (response.status === 200) {
        // Successful login
        const userData = {
          id: data.student.id || data.student._id,
          name: data.student.name,
          email: data.student.email,
          role: 'student',
          college: data.student.college,
          skills: data.student.skills || [],
          placementStatus: data.student.placementStatus,
          appliedJobs: data.student.appliedJobs || [],
          notifications: data.student.notifications || [],
          events: data.student.events || [],
          certifications: data.student.certifications || []
        };

        // Use auth context to login
        login(userData, data.token);

        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });

        // Redirect after short delay
        setTimeout(() => {
          navigate(`${from}/${data?.student?.id}`, { replace: true });
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Login failed. Please try again.';

      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl p-6">
          <CardContent>
            <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6 flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6" /> Student Login
            </h2>

            {/* Message Display */}
            {message.text && (
              <div className={`p-3 rounded-md text-sm border mb-4 ${message.type === 'success'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : message.type === 'error'
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (message.text) setMessage({ type: '', text: '' });
                  }}
                  placeholder="student@example.com"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (message.text) setMessage({ type: '', text: '' });
                  }}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-800">Register</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
