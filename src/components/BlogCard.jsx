import { Link } from "react-router-dom";

export const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/${post.id}`}
      className="block py-8 border-b border-gray-200 hover:opacity-70 transition-opacity group"
    >
      <div className="flex gap-8">
        {/* Content */}
        <div className="flex-1">
          {/* Author & Meta */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2 line-clamp-2 group-hover:underline">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {post.content.substring(0, 180)}...
          </p>

          {/* Footer Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
              {post.category}
            </span>
            <span>
              {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
            <span>❤️ {post.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
