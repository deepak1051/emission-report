import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SingleDataRow from './SingleDataRow';
import BarChart from './BarChart';

const Homepage = ({ data, onUpdateData }) => {
  const [filterScope, setFilterScope] = useState('All');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;

  const handleFilterChange = (e) => {
    setFilterScope(e.target.value);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return filterScope === 'All'
      ? data
      : data.filter((row) => row.scope === filterScope);
  }, [filterScope, data]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto mt-10 px-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Emission Data Table
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="scopeFilter" className="mr-2 font-medium text-gray-700">
          Filter by Scope:
        </label>
        <select
          id="scopeFilter"
          value={filterScope}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Scope 1">Scope 1</option>
          <option value="Scope 2">Scope 2</option>
          <option value="Scope 3">Scope 3</option>
        </select>
      </div>

      {/* Data Table */}
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Description
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Scope
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Emission (kg CO2-e)
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row) => (
            <SingleDataRow row={row} key={row.id} onUpdateData={onUpdateData} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Bar Chart */}
      <div className="mt-8 p-10 mb-10">
        <BarChart data={currentPageData} />
      </div>
    </div>
  );
};

export default Homepage;
