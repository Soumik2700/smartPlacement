import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 mx-auto">
              <span className="text-6xl">😵</span>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            {error?.status || '404'}
          </h1>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {error?.statusText || error?.message || "The page you're looking for seems to have vanished into the digital void!"}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-150"></div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              to="/"
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🏠 Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-300"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-20 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-white bg-opacity-20 rounded-full animate-float delay-500"></div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;