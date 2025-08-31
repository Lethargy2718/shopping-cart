import { Link } from "react-router-dom";
import styles from "./IconText.module.css";

export default function IconText({ Icon, number, label, route, className }) {
    return (
        <Link to={route} className={`${styles.iconText} ${className}`} aria-label={`Go to ${label}`}>
            <Icon aria-hidden="true" />
            <p>{number}</p>
        </Link>
    )
}