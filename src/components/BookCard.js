import Link from 'next/link';

const BookCard = ({ book }) => {
    return (
        <div className="border rounded shadow p-4 w-full">
            <img src={`/img/books/${book.image}`} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-700">{book.author}</p>
            <p className="text-gray-700">{book.price}</p>
            <Link href={`/book/${book.id}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    );
};

export default BookCard;
