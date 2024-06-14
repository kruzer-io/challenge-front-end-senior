import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from "next/image";

const Navbar = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto max-w-screen-lg flex justify-between items-center">
                <Image src="/img/logo.svg" alt="Kruzer Bookstore" width={132} height={52} />
                <div>
                    <Link href="/cart" className="text-gray-300 hover:text-white mx-4">
                        Cart ({cart.items.length})
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
