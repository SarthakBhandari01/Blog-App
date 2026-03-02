import { Link, useLocation } from "react-router-dom";
import { PenSquare, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/blogs/blogSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.blogs.searchTerm) || "";

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-600 transition-colors"
          >
            Blogify
          </Link>

          <div className="flex items-center gap-6">
            {isHomePage && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm placeholder-gray-500 focus:outline-none "
                />
              </div>
            )}

            <Link
              to="/new"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                location.pathname === "/new"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <PenSquare className="w-4 h-4" />
              <span>Write</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
