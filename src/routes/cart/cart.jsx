import { useOutletContext } from "react-router-dom";
import Message from "../../components/Message/Message"
import ProductList from "../../components/ProductList/ProductList";
import { CartCard } from "../../components/Card"
import { CardContext } from "../../contexts/CardContext"

export default function Cart() {
    const { data, cart } = useOutletContext();
    if (Object.keys(cart).length === 0) return <Message><h1>No Items in Cart</h1></Message>

    const cartIds = Object.keys(cart);
    const productMap = data.reduce((acc, item) => {
        if (!cartIds.includes(String(item.id))) return acc;
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push({ ...item, quantity: cart[item.id] });
        return acc;
    }, {});

    return (
        <CardContext value={CartCard}>
            <ProductList productMap={productMap} />
        </CardContext>
    )
}
