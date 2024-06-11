import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex justify-center my-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or ISBN"
                className="border rounded-l px-4 py-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white rounded-r px-4 py-2">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
