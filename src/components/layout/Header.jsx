import { BellIcon } from '@heroicons/react/24/outline';
import SearchInput from '../common/SearchInput';
import { useSearch } from '../../hooks/useSearch';

export default function Header() {
  const { query, handleSearch } = useSearch();

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="w-72">
          <SearchInput 
            value={query}
            onChange={handleSearch}
            placeholder="Search projects, tasks, or team members..."
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors">
            <BellIcon className="h-6 w-6 text-gray-500" />
          </button>
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}