import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../lib/slices/searchSlice';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearchQuery(query));
    };

    return (
        <div className="flex justify-center my-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por nome ou ISBN"
                className="border rounded-l px-4 py-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white rounded-r px-4 py-2">
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
