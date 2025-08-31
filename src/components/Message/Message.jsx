import styles from "./Message.module.css";

export default function Message({ children }) {
    return (
        <section className={styles.message}>
            {children}
        </section>
    )
}