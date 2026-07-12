import { useState } from "react";
import { FaArrowUp, FaBox } from "react-icons/fa";
import NumericPagination from "../products/NumericPagination";

export default function HighStockReport({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const highStock = products.filter((p) => p.stock >= 50);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = highStock.slice(indexOfFirstItem, indexOfLastItem);

  if (highStock.length === 0) return null;

  return (
    <div className="p-6 pb-5 border border-gray-800 bg-strong rounded-2xl">
      <div className="flex items-center gap-2 mb-4 text-green-500">
        <FaArrowUp size={24} />
        <FaBox size={24} />
        <h2 className="text-xl font-black uppercase">
          Stock Elevado ({highStock.length})
        </h2>
      </div>

      <ul className="space-y-2 min-h-55">
        {currentItems.map((prod) => (
          <li
            key={prod.id}
            className="flex justify-between p-3 text-sm border border-gray-800 rounded-lg bg-fondo"
          >
            <span className="font-bold text-white">{prod.name}</span>
            <span className="font-black text-green-500">
              Stock: {prod.stock}
            </span>
          </li>
        ))}
      </ul>

      {highStock.length > itemsPerPage && (
        <NumericPagination
          currentPage={currentPage}
          totalItems={highStock.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
