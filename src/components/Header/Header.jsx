import { Heart, Search, ShoppingCart } from "lucide-react";
import IconText from "../IconText/IconText";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header({ favorites, cart }) {
    return (
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
                        <li>
                            <button className={styles.categoryBtn}>
                                <Link to="/shop">Shop</Link>
                            </button>
                        </li>
                        {/* <li>
                            <button className={styles.categoryBtn}>Categories</button>
                        </li> */}
                        <li className={styles.cart}>
                            <IconText Icon={ShoppingCart} number={cart} route="/cart" />
                        </li>
                        <li className={styles.heart} >
                            <IconText Icon={Heart} number={favorites} route="/shop/favorites" />
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    )
}