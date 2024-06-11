import Link from 'next/link';

const BookCard = ({ book }) => {
    return (
        <div className="border rounded shadow p-4 m-2 w-1/4">
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
