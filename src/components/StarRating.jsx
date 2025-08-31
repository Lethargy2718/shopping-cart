import { Star } from "lucide-react";

export default function StarRating({ rating }) {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <Star key={i} fill={i <= fullStars ? "#FFD700" : "none"} color="black" strokeWidth={0.15} />
        )
    }

    return (
        <div style={{ display: "flex" }}>
            {stars}
        </div>
    )
}



