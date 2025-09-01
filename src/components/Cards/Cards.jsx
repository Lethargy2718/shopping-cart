import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../../contexts/CardContext";
import styles from "./Cards.module.css";

export default function Cards({ productArr }) {
    const { cart, favorites, addToCart, toggleFavorite, removeFromCart } = useOutletContext();
    const CardType = useContext(CardContext);

    return (
        <div className={styles.cards}>
            {productArr.map(product =>
                <CardType key={product.id}
                    product={product}
                    favorite={favorites.some(id => id === product.id)}
                    onAddToCart={addToCart}
                    onToggleFavorite={toggleFavorite}
                    onRemoveFromCart={removeFromCart}
                    owned={cart[product.id]}
                />
            )}
        </div>
    )
}