import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { allBooks } from 'contentlayer/generated';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BOOKS_PER_PAGE = 8;

export default function Home({ initialBooks, currentPage, totalPages, searchQuery, selectedCategory }) {
    const router = useRouter();
    const [filteredBooks, setFilteredBooks] = useState(initialBooks);
    const [paginatedBooks, setPaginatedBooks] = useState(initialBooks);

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

        setFilteredBooks(filtered);
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        const start = (currentPage - 1) * BOOKS_PER_PAGE;
        const end = start + BOOKS_PER_PAGE;
        setPaginatedBooks(filteredBooks.slice(start, end));
    }, [filteredBooks, currentPage]);

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

    return (
        <>
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            <CategoryFilter onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
            <div className="flex flex-wrap">
                {paginatedBooks.map((book) => (
                    <div key={book.id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <BookCard key={book.id} book={book} />
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
    const initialBooks = filteredBooks;

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
