import React from "react";

const AdminPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 md:px-8">
      <p className="text-xs font-bold text-text-muted">
        Trang {currentPage} / {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-border px-3 py-2 text-xs font-black text-text transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Trước
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`min-w-10 rounded-xl px-3 py-2 text-xs font-black transition ${
                page === currentPage
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "border border-border text-text hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-border px-3 py-2 text-xs font-black text-text transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
