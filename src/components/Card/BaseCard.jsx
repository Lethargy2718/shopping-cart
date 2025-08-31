import { Heart, Minus, Package, Plus, RotateCcw, Trash2 } from "lucide-react";
import StarRating from "../StarRating";
import styles from "./BaseCard.module.css";
import { useState } from "react";

export default function BaseCard({
    product,
    favorite,
    onAddToCart,
    onToggleFavorite,
    onRemoveFromCart,
    owned = 0,
    variant = "default" // "default" or "cart"
}) {
    const iconSize = 20;
    const [quantity, setQuantity] = useState(0);
    const { thumbnail: image, title, price, rating, stock, id } = product;
    const isOutOfStock = stock === 0 && variant === "default";
    const maxQuantity = Math.max(owned, stock);

    const headerConfig = {
        default: (
            <>
                {isOutOfStock && <h2 className={styles.outOfStock}>Out of stock</h2>}
                <button
                    onClick={() => onToggleFavorite(id)}
                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={favorite}
                >
                    <Heart
                        size={iconSize}
                        className={favorite ? styles.fullHeart : ""}
                        stroke={favorite ? "red" : "black"}
                    />
                </button>
            </>
        ),
        cart: (
            <>
                <h2 className={styles.owned}>{`Owned: ${owned}`}</h2>
                <div className={styles.headerBtns}>
                    <button
                        onClick={() => onToggleFavorite(id)}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favorite}
                    >
                        <Heart
                            size={iconSize}
                            className={favorite ? styles.fullHeart : ""}
                            stroke={favorite ? "red" : "black"}
                        />
                    </button>
                    <button
                        onClick={() => onRemoveFromCart(id, owned)}
                        aria-label="Delete from cart"
                    >
                        <Trash2 size={iconSize} />
                    </button>
                </div>
            </>
        )
    };

    const actionButtonsConfig = {
        default: (
            <button
                className={styles.buyBtn}
                disabled={isOutOfStock}
                onClick={() => {
                    onAddToCart(id, quantity);
                    setQuantity(0);
                }}
                aria-label="Add to Cart"
            >
                Add to Cart
            </button>
        ),
        cart: (
            <>
                <button
                    className={`${styles.buyBtn} ${styles.actionBtn}`}
                    onClick={() => {
                        onAddToCart(id, quantity);
                        setQuantity(0);
                    }}
                    aria-label="Add to Cart"
                >
                    Add to Cart
                </button>
                <button
                    className={`${styles.removeBtn} ${styles.actionBtn}`}
                    onClick={() => {
                        onRemoveFromCart(id, quantity);
                        setQuantity(0);
                    }}
                    aria-label="Remove from Cart"
                >
                    Remove from Cart
                </button>
            </>
        )
    };

    return (
        <div className={styles.card}>
            <div className={`${styles.header} ${styles[`header_${variant}`]}`}>
                {headerConfig[variant]}
            </div>

            <img src={image} alt={title} />

            <div className={styles.cardFooter}>
                <p>{title}</p>
                <p>{`$${price}`}</p>
                <StarRating rating={rating} />
                <div className={styles.buySection}>
                    <div className={styles.quantitySection}>
                        <button
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(0)}
                            className={styles.quantityBtn}
                            aria-label="Reset quantity"
                        >
                            <RotateCcw size={iconSize} />
                        </button>

                        <button
                            disabled={isOutOfStock || quantity === 0}
                            onClick={() => setQuantity(Math.max(0, quantity - 1))}
                            className={styles.quantityBtn}
                            aria-label="Decrease quantity by 1"
                        >
                            <Minus size={iconSize} />
                        </button>

                        <label htmlFor={`quantity-${id}`} className="sr-only">
                            Quantity for {title}
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            id={`quantity-${id}`}
                            disabled={isOutOfStock}
                            onChange={(e) => {
                                setQuantity(Math.min(maxQuantity, Number(e.target.value)));
                            }}
                            className={styles.quantityInput}
                            aria-valuenow={quantity}
                        />

                        <button
                            disabled={isOutOfStock || quantity === maxQuantity}
                            onClick={() => setQuantity(Math.min(quantity + 1, maxQuantity))}
                            className={styles.quantityBtn}
                            aria-label="Increase quantity by 1"
                        >
                            <Plus size={iconSize} />
                        </button>

                        <button
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(maxQuantity)}
                            className={styles.quantityBtn}
                            aria-label={`Set quantity to ${variant === "cart" ? "number of all items" : "stock size"}`}
                        >
                            <Package size={iconSize} />
                        </button>
                    </div>

                    {variant === "default" && (
                        <div role="status" aria-live="polite" className="sr-only">
                            {isOutOfStock ? "Out of stock" : `${stock} in stock`}
                        </div>
                    )}

                    {actionButtonsConfig[variant]}
                </div>
            </div>
        </div>
    );
}