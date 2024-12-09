import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-zinc-400 ">
      <div className="container mx-auto flex  flex-wrap p-5 flex-col md:flex-row items-center justify-between ">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Emission Tracker</span>
        </Link>

        <Link to="/add">
          <button className="inline-flex items-center bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 rounded text-base mt-4 md:mt-0">
            Add
          </button>
        </Link>
      </div>
    </header>
  );
}
