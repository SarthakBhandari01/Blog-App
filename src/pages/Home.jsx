import { useSelector } from "react-redux";
import { BlogCard } from "../components/BlogCard";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";

export const Home = () => {
  const posts = useSelector((state) => state.blogs.posts);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Blogs
          </h1>
          <p className="text-lg text-gray-600">
            Discover Blogs, thinking, and expertise from writers on any topic.
          </p>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <PenSquare className="w-12 h-12 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-3">
              No Blogs yet
            </h2>
            <p className="text-gray-700 mb-8">
              Start writing your first Blog to share with the world.
            </p>
            <Link
              to="/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              <PenSquare className="w-4 h-4" />
              Write a Blog
            </Link>
          </div>
        ) : (
          /* Blog List */
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
