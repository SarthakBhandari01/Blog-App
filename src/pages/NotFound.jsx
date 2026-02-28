import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        {/* Decorative gradient circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">!</span>
          </div>
        </div>

        {/* 404 Heading */}
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-serif font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors font-medium"
        >
          <Home className="w-3 h-3" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
