import Cards from "../../components/Cards/Cards";
import styles from "./category.module.css";

export default function Category({ title, productArr, CardType }) {

    return (
        <section className={`container ${styles.category}`}>
            <h2 className={styles.title}>{title}</h2>
            <Cards productArr={productArr} CardType={CardType} />
        </section>
    )
}