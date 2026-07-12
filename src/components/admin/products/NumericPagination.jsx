export default function NumericPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.slice(0, 15);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-0">
      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 font-bold rounded-lg transition-all ${
            currentPage === number
              ? "bg-neos text-black"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
