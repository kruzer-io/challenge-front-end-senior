import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setSearchQuery } from '../lib/slices/searchSlice';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSearch = () => {
        dispatch(setSearchQuery(query));
    };

    useEffect(() => {
        if (!router.query.search) {
            setQuery('');
        }
    }, [router.query.search]);

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
