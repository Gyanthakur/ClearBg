import React, { useState } from 'react';
import { testimonialsData } from '../assets/assets';

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of testimonials per page
  const maxVisiblePages = 3; // Maximum number of visible middle page numbers

  // Calculate the total number of pages
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  // Determine the testimonials to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTestimonials = testimonialsData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to generate visible pages
  const getVisiblePages = () => {
    const visiblePages = [];
    const firstPage = 1;
    const lastPage = totalPages;

    // Always include the first page
    visiblePages.push(firstPage);

    // Calculate the range of middle pages
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2);
    let end = Math.min(start + maxVisiblePages - 1, lastPage - 1);

    // Adjust the range if near the start or end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(2, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    // Always include the last page
    if (lastPage > 1) {
      visiblePages.push(lastPage);
    }

    return visiblePages;
  };

  return (
    <div className=''>
      {/* -----------title----------- */}
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Customer Testimonials</h1>

      {/* Testimonials Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>
        {currentTestimonials.map((item, index) => (
          <div className='bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700' key={index}>
            <p className='text-4xl text-gray-500'>”</p>
            <p className='text-sm text-gray-500'>{item.text}</p>
            <div className='flex items-center gap-3 mt-5'>
              <img className='w-9 rounded-full' src={item.image} alt="" />
              <div>
                <p>{item.author}</p>
                <p className='text-xm text-gray-600'>{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center mt-6 gap-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400'
        >
          Previous
        </button>

        {/* Pagination with dynamic ellipsis */}
        {getVisiblePages().map((page, index) => {
          if (index > 0 && page !== getVisiblePages()[index - 1] + 1) {
            return (
              <span key={`ellipsis-${index}`} className='px-2'>...</span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
