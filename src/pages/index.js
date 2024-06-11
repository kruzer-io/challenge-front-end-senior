// src/pages/index.js
"use client"; // Adicione essa linha no topo do arquivo

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BookCard from '../components/BookCard';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBooks(data);
            setFilteredBooks(data);
        };

        fetchBooks();
    }, []);

    const handleSearch = (query) => {
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handleSelectCategory = (category) => {
        // Implemente a lógica de filtragem de categorias aqui
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <SearchBar onSearch={handleSearch} />
                <CategoryFilter onSelectCategory={handleSelectCategory} />
                <div className="flex flex-wrap">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
}
