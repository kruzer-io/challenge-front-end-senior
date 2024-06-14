import Link from 'next/link';
import { useRouter } from 'next/router';

const Pagination = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const { query } = router;

    const createPageLink = (page) => {
        return {
            pathname: '/',
            query: { ...query, page },
        };
    };

    return (
        <div className="flex justify-center mt-4 pb-[4rem]">
            {currentPage > 1 && (
                <Link href={createPageLink(currentPage - 1)} className="px-4 py-2 mx-1 bg-gray-200 rounded">
                    Previous
                </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => (
                <Link key={i + 1} href={createPageLink(i + 1)}
                    className={`px-4 py-2 mx-1 ${
                        i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    } rounded`}
                >
                    {i + 1}
                </Link>
            ))}
            {currentPage < totalPages && (
                <Link href={createPageLink(currentPage + 1)}
                  className="px-4 py-2 mx-1 bg-gray-200 rounded"
                >
                    Next
                </Link>
            )}
        </div>
    );
};

export default Pagination;
