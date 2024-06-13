// src/pages/cart.js

import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../lib/slices/cartSlice';
import Link from 'next/link';

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Carrinho de Compras</h1>
            {cart.items.length === 0 ? (
                <p>O carrinho está vazio. <Link href="/" className="text-blue-500 hover:underline">Voltar às compras</Link></p>
            ) : (
                <div>
                    <ul>
                        {cart.items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <p className="text-gray-700">{item.quantity} x R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => removeFromCartHandler(item.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">Total: R$ {cart.totalAmount.toFixed(2)}</h2>
                        <button onClick={clearCartHandler} className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg">
                            Limpar Carrinho
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 mt-4 ml-2 rounded-lg">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
