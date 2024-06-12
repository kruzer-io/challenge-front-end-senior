import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { allBooks } from 'contentlayer/generated';

export default function BookDetail({ book }) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">
                Voltar
            </Link>
            <div className="flex">
                <Image src={book.image} alt={book.title} width={300} height={400} className="rounded-lg" />
                <div className="ml-8">
                    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-lg font-semibold">{book.price}</p>
                    <p className="text-gray-600 mb-4">{book.author}</p>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                        <p>{book.description}</p>
                    </div>
                    <p className="text-gray-600">Autores - {book.author}</p>
                    <p className="text-gray-600">Número de Páginas - {book.pages}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = allBooks.map((book) => ({
        params: { id: book.id.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const book = allBooks.find((book) => book.id.toString() === params.id);
    return { props: { book } };
}
