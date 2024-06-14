import Link from 'next/link';
import Image from 'next/image';

const BookCard = ({ book }) => {
    return (
        <div className="rounded w-full bg-white">
            <Link href={`/book/${book.id}`}>
                <Image src={`/img/books/${book.image}`} alt={book.title} width={256} height={300} className="max-w-full h-[300px] object-cover rounded" />
                <h2 className="px-3 my-2 line-clamp-1">{book.title}</h2>
                <hr className="border-customBorder mx-3" />
                <p className="px-3 py-2 font-bold">{book.price}</p>
            </Link>
        </div>
    );
};

export default BookCard;
