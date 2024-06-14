import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto max-w-screen-lg flex justify-between items-center">
                <Link href="/" className="">
                    <Image src="/img/logo.svg" alt="Kruzer Bookstore" width={132} height={52} />
                </Link>
                <div className="flex gap-4 items-center">
                    <SearchBar />
                    <Link href="/cart" className="relative text-gray-300 hover:text-white mx-4">
                        <Image src="/img/cart.svg" alt="Meu Carrinho" width={24} height={24} />
                        <span className="`block w-4 h-4 absolute -right-2 -bottom-2 bg-customRed rounded-full
                            text-2xs text-white text-center font-mono leading-4">
                            {cart.items.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
