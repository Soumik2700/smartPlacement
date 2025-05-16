import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add login logic here
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account? <a href="/register" className="text-indigo-600 font-medium">Register</a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
