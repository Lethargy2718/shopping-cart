import Category from "../../routes/category/category";
import styles from "./ProductList.module.css";

export default function ProductList({ productMap, CardType }) {
    return (
        <section className={styles.productList}>
            {
                Object.entries(productMap).map(([category, arr]) => <Category key={category} title={category} productArr={arr} CardType={CardType} />)
            }
        </section>
    )
}
