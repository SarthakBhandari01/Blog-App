import { useSelector } from "react-redux";
import { BlogCard } from "../components/BlogCard";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export const Home = () => {
  const posts = useSelector((state) => state.blogs.posts);
  const searchTerm = useSelector((state) => state.blogs.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  const filteredPosts = useMemo(() => {
    const query = searchTerm?.toLowerCase().trim();
    if (!query) return posts;

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    });
  }, [posts, searchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Reset to last valid page if current page exceeds total pages
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get current page's posts
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Handle page change with scroll to top
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        {/* Empty State / Filtered List */}
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
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-3">
              No blogs found
            </h2>
            <p className="text-gray-700">Try a different keyword.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
