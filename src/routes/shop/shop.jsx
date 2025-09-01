import { Card } from "../../components/Card";
import Message from "../../components/Message/Message";
import ProductList from "../../components/ProductList/ProductList";
import { useOutletContext } from "react-router-dom";
import { CardContext } from "../../contexts/CardContext";

export default function Shop() {
    const { data } = useOutletContext();
    if (data.length === 0) return <Message><h1>Loading...</h1></Message>

    const productMap = data.reduce((acc, item) => {
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

