import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Maximum page numbers to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show condensed pagination for many pages
      if (currentPage <= 4) {
        // Near the start: 1 2 3 4 5 ... 20
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis-end");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end: 1 ... 16 17 18 19 20
        pages.push(1);
        pages.push("ellipsis-start");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... 5 6 7 ... 20
        pages.push(1);
        pages.push("ellipsis-start");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis-end");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (typeof page === "string") {
            // Ellipsis
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
