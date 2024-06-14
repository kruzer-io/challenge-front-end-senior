import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { allBooks } from 'contentlayer/generated';
import CategoryFilter from '../components/CategoryFilter';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BOOKS_PER_PAGE = 8;

export default function Home({ initialBooks, currentPage, totalPages, selectedCategory }) {
    const router = useRouter();
    const searchQuery = useSelector((state) => state.search);
    const [filteredBooks, setFilteredBooks] = useState(initialBooks);
    const [paginatedBooks, setPaginatedBooks] = useState(initialBooks);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = (query) => {
        const filtered = allBooks.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
        router.push({
            pathname: '/',
            query: { ...router.query, search: query, page: 1 },
        });
    };

    const handleSelectCategory = (category) => {
        let filtered;
        if (selectedCategory === category) {
            filtered = allBooks;
            router.push({
                pathname: '/',
                query: { ...router.query, category: undefined, page: 1 },
            });
        } else {
            filtered = allBooks.filter((book) => book.category === category);
            router.push({
                pathname: '/',
                query: { ...router.query, category, page: 1 },
            });
        }
        setFilteredBooks(filtered);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    useEffect(() => {
        let filtered = allBooks;

        if (searchQuery) {
            filtered = filtered.filter((book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter((book) => book.category === selectedCategory);
        }

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => parseFloat(a.price.replace('R$', '').replace(',', '.')) - parseFloat(b.price.replace('R$', '').replace(',', '.')));
        } else {
            filtered.sort((a, b) => parseFloat(b.price.replace('R$', '').replace(',', '.')) - parseFloat(a.price.replace('R$', '').replace(',', '.')));
        }

        setFilteredBooks(filtered);
    }, [searchQuery, selectedCategory, sortOrder]);

    useEffect(() => {
        const start = (currentPage - 1) * BOOKS_PER_PAGE;
        const end = start + BOOKS_PER_PAGE;
        setPaginatedBooks(filteredBooks.slice(start, end));
    }, [filteredBooks, currentPage, sortOrder]);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <CategoryFilter onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />

                <div>
                    <label htmlFor="sortOrder" className="mr-2">Ordenar por preço:</label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="border rounded p-2">
                        <option value="asc">Ascendente</option>
                        <option value="dsc">Descendente</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-[4rem]">
                {paginatedBooks.map((book) => (
                    <div key={book.id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <BookCard key={book.id} book={book}/>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
    );
}

export async function getServerSideProps(context) {
    const page = context.query.page ? parseInt(context.query.page, 10) : 1;
    const searchQuery = context.query.search || '';
    const selectedCategory = context.query.category || '';
    let filteredBooks = allBooks;

    if (searchQuery) {
        filteredBooks = filteredBooks.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (selectedCategory) {
        filteredBooks = filteredBooks.filter((book) => book.category === selectedCategory);
    }

    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
    const initialBooks = filteredBooks.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);

    return {
        props: {
            initialBooks,
            currentPage: page,
            totalPages,
            searchQuery,
            selectedCategory,
        },
    };
}
