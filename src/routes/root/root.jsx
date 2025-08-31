import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./root.module.css";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
    const [data, setData] = useState([]);

    const [cart, setCart] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/?limit=30")
            .then(res => res.json())
            .then(data => setData(data.products));
    }, []);

    function addToCart(id, quantity) {
        if (quantity <= 0) return;

        const product = data.find(p => p.id === id);
        if (!product) return;

        if (quantity > product.stock) {
            quantity = product.stock;
            if (quantity === 0) {
                toast.info(`${product.title} is out of stock.`);
                return;
            }
        }

        setCart(oldCart => {
            const newCart = { ...oldCart };
            const currentQty = newCart[id] || 0;
            newCart[id] = currentQty + quantity;
            return newCart;
        });

        setData(data.map(p =>
            p.id === id
                ? { ...p, stock: p.stock - quantity }
                : p
        ));

        toast.success(`${quantity} x ${product.title} added to cart!`);
    }

    function removeFromCart(id, quantity) {
        if (quantity <= 0) return;

        const currentQty = cart[id] || 0;
        if (currentQty === 0) return;

        if (quantity > currentQty) quantity = currentQty;

        setCart(oldCart => {
            const newCart = { ...oldCart };
            if (quantity === currentQty) {
                delete newCart[id];
            } else {
                newCart[id] = currentQty - quantity;
            }
            return newCart;
        });

        setData(data.map(p =>
            p.id === id
                ? { ...p, stock: p.stock + quantity }
                : p
        ));

        const product = data.find(p => p.id === id);
        if (product) toast.info(`${quantity} x ${product.title} removed from cart.`);
    }

    function toggleFavorite(id) {
        setFavorites(currFavorites =>
            currFavorites.includes(id)
                ? currFavorites.filter(currId => currId !== id)
                : [...currFavorites, id]
        );
    }

    return (
        <div className={styles.root}>
            <Header favorites={favorites.length} cart={Object.keys(cart).length} />
            <main className={styles.main}>
                <Outlet context={{ data, setData, cart, addToCart, removeFromCart, toggleFavorite, favorites }} />
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}
