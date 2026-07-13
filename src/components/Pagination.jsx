import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border bg-white shadow-sm disabled:opacity-40 hover:bg-red-50 hover:border-red-300 transition"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl border text-sm font-black shadow-sm transition
            ${currentPage === page
              ? "bg-red-500 text-white border-red-500"
              : "bg-white hover:bg-red-50 hover:border-red-300"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border bg-white shadow-sm disabled:opacity-40 hover:bg-red-50 hover:border-red-300 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}