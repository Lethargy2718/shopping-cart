import { useOutletContext } from "react-router-dom";
import styles from "./Cards.module.css";

export default function Cards({ productArr, CardType }) {
    const { cart, favorites, addToCart, toggleFavorite, removeFromCart } = useOutletContext();

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