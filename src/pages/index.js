"use client";

import { useState } from 'react';
import { allBooks } from 'contentlayer/generated';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BookCard from '../components/BookCard';

export default function Home({ initialBooks }) {
    const [books] = useState(initialBooks);
    const [filteredBooks, setFilteredBooks] = useState(initialBooks);

    const handleSearch = (query) => {
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handleSelectCategory = (category) => {
        const filtered = books.filter((book) => book.category === category);
        setFilteredBooks(filtered);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <SearchBar onSearch={handleSearch} />
                <CategoryFilter onSelectCategory={handleSelectCategory} />
                <div className="flex flex-wrap">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <BookCard key={book.id} book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {
            initialBooks: allBooks,
        },
    };
}
