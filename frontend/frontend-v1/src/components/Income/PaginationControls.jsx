import React from "react";

function PaginationControls({
  currentPage,
  totalPages,
  paginate,
  prevPage,
  nextPage,
}) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-700 text-white rounded"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`px-3 py-1 mx-1 ${
            currentPage === index + 1
              ? "bg-gray-400 text-white"
              : "bg-gray-300 text-black"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 mx-1 bg-gray-700 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
