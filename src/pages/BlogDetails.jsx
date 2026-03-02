import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit2, Trash2, Heart } from "lucide-react";
import { useState } from "react";
import { likePost, unlikePost, deletePost } from "../features/blogs/blogSlice";
import ConfirmDialog from "../components/ConfirmDialog";
import { useNotificationContext } from "../contexts/NotificationContext";
import { NotFound } from "./NotFound";

export const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogs.posts);
  const likedBlogs = useSelector((state) => state.blogs.likedBlogs || []);
  const post = posts.find((p) => p.id === id);
  const liked = likedBlogs.includes(id);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showNotification } = useNotificationContext();

  const handleLike = () => {
    if (!liked) {
      dispatch(likePost(id));
    } else {
      dispatch(unlikePost(id));
    }
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    navigate("/");
    showNotification("Blog deleted successfully", "success");
  };

  if (!post) {
    return <NotFound />;
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Action Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/edit/${post.id}`)}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              title="Edit Blog"
              type="button"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              title="Delete Blog"
              type="button"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-[680px] mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 py-6 border-b border-gray-200 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {" · "}
              {Math.ceil(post.content.split(" ").length / 200)} min read
            </p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
            {post.content}
          </p>
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center gap-6 py-6 border-y border-gray-200">
          <button
            onClick={handleLike}
            type="button"
            className={`flex items-center gap-2 transition-all cursor-pointer ${
              liked ? "text-red-600" : "text-gray-600 hover:text-red-600"
            }`}
          >
            <Heart className={`w-6 h-6 ${liked ? "fill-red-600" : ""}`} />
            <span className="font-medium">{post.likes}</span>
          </button>
        </div>
      </article>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
