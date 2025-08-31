import { useState } from "react";
import { Heart, Search, ShoppingCart, Menu, X, Store } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import IconText from "../IconText/IconText";

export default function Header({ favorites, cart }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.headerContainer}`}>
                    <h1>
                        <Link to="/">Cartful</Link>
                    </h1>

                    <div className={styles.searchContainer}>
                        <input type="search" />
                        <button>
                            <Search />
                        </button>
                    </div>

                    <nav className={styles.nav}>
                        <ul>
                            <li className={styles.store}>
                                <IconText Icon={Store} number={"Shop"} route="/shop" label="shop" className={styles.iconLink} />

                            </li>
                            <li className={styles.cart}>
                                <IconText Icon={ShoppingCart} number={cart} route="/cart" label="cart" className={styles.iconLink} />
                            </li>
                            <li className={styles.heart}>
                                <IconText Icon={Heart} number={favorites} route="/shop/favorites" label="favorites" className={styles.iconLink} />
                            </li>
                        </ul>
                    </nav>

                    <button className={styles.burger} onClick={() => setSidebarOpen(true)} aria-expanded={sidebarOpen} aria-label="Open sidebar" aria-controls="sidebar">
                        <Menu size={28} />
                    </button>
                </div>
            </header>

            <div
                className={`${styles.overlay} ${sidebarOpen ? styles.show : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`} hidden={!sidebarOpen} id="sidebar">
                <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
                    <X size={28} />
                </button>

                <div className={styles.sidebarContent}>
                    <div className={styles.searchContainer}>
                        <input type="search" />
                        <button>
                            <Search />
                        </button>
                    </div>

                    <nav>
                        <ul className={styles.sidebarLinks}>
                            <li className={styles.store}>
                                <Link to="/shop" onClick={() => setSidebarOpen(false)}>
                                    <Store />
                                    Shop
                                </Link>
                            </li>
                            <li className={styles.cart}>
                                <Link to="/cart" onClick={() => setSidebarOpen(false)}>
                                    <ShoppingCart />
                                    Cart
                                </Link>
                            </li>
                            <li className={styles.heart}>
                                <Link to="/shop/favorites" onClick={() => setSidebarOpen(false)}>
                                    <Heart />
                                    Favorites
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
