import { Card } from "../../components/Card";
import Message from "../../components/Message/Message";
import ProductList from "../../components/ProductList/ProductList";
import { useOutletContext } from "react-router-dom";
import { CardContext } from "../../contexts/CardContext";

export default function Favorites() {
    const { data, favorites } = useOutletContext();
    if (favorites.length === 0) return <Message><h1>No Favorites</h1></Message>
    if (data.length === 0) return <Message><h1>Loading...</h1></Message>

    const productMap = data.reduce((acc, item) => {
        if (!favorites.includes(item.id)) return acc;
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <CardContext value={Card}>
            <ProductList productMap={productMap} />
        </CardContext>
    )
}