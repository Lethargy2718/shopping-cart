import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Card } from "../src/components/Card";

describe("Card Component", () => {
    let product;
    let onAddToCart;
    let onToggleFavorite;

    beforeEach(() => {
        onAddToCart = vi.fn();
        onToggleFavorite = vi.fn();

        product = {
            id: 0,
            thumbnail: null,
            title: "Product",
            price: "10",
            rating: "2",
            stock: 20,
        };
    });

    function setup() {
        return {
            user: userEvent.setup(),
            ...render(<Card
                product={product}
                favorite={false}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
            />),
        }
    }

    describe("Quantity Controls", () => {
        it("increments quantity when the increase button is clicked", async () => {
            const { user } = setup();

            const increaseBtn = screen.getByRole("button", { name: /increase/i });
            const quantityInput = screen.getByLabelText(/quantity for/i);

            expect(quantityInput).toHaveValue(0);

            await user.click(increaseBtn);
            expect(quantityInput).toHaveValue(1);

            await user.click(increaseBtn);
            expect(quantityInput).toHaveValue(2);
        });

        it("decrements quantity but never below 0", async () => {
            const { user } = setup();

            const increaseBtn = screen.getByRole("button", { name: /increase/i });
            const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
            const quantityInput = screen.getByLabelText(/quantity for/i);

            await user.click(increaseBtn);
            await user.click(increaseBtn);
            expect(quantityInput).toHaveValue(2);

            await user.click(decreaseBtn);
            expect(quantityInput).toHaveValue(1);

            await user.click(decreaseBtn);
            expect(quantityInput).toHaveValue(0);

            await user.click(decreaseBtn);
            expect(quantityInput).toHaveValue(0);
        });

        it("resets quantity to 0 when reset button is clicked", async () => {
            const { user } = setup();

            const increaseBtn = screen.getByRole("button", { name: /increase/i });
            const resetBtn = screen.getByRole("button", { name: /reset/i });
            const quantityInput = screen.getByLabelText(/quantity for/i);

            await user.click(increaseBtn);
            await user.click(increaseBtn);
            expect(quantityInput).toHaveValue(2);

            await user.click(resetBtn);
            expect(quantityInput).toHaveValue(0);
        });

        it("sets quantity to stock when stock button is clicked", async () => {
            const { user } = setup();

            const stockBtn = screen.getByRole("button", { name: /set quantity to/i });
            const quantityInput = screen.getByLabelText(/quantity for/i);

            expect(quantityInput).toHaveValue(0);
            await user.click(stockBtn);
            expect(quantityInput).toHaveValue(product.stock);
        });

        it("accepts typing quantity and doesn't exceed limits", async () => {
            const { user } = setup();

            const quantityInput = screen.getByLabelText(/quantity for/i);

            await user.type(quantityInput, "5");
            expect(quantityInput).toHaveValue(5);

            await user.clear(quantityInput);
            await user.type(quantityInput, "50"); // above stock
            expect(quantityInput).toHaveValue(product.stock);

            await user.clear(quantityInput);
            await user.type(quantityInput, "-3"); // below 0
            expect(quantityInput).toHaveValue(3);
        });
    });

    describe("Favorites", () => {
        it("toggles favorite when favorite button is clicked", async () => {
            const { user } = setup();

            const favoriteBtn = screen.getByRole("button", { name: /favorite/i });

            await user.click(favoriteBtn);
            expect(onToggleFavorite).toHaveBeenCalledTimes(1);
            expect(onToggleFavorite).toHaveBeenCalledWith(product.id);
        });
    });

    describe("Add to Cart", () => {
        it("calls onAddToCart with the correct quantity", async () => {
            const { user } = setup();

            const quantityInput = screen.getByLabelText(/quantity for/i);
            const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

            await user.type(quantityInput, "3");
            await user.click(addToCartBtn);

            expect(onAddToCart).toHaveBeenCalledTimes(1);
            expect(onAddToCart).toHaveBeenCalledWith(product.id, 3);
        });
    });

    describe("Stock Messages", () => {
        it("does not show 'out of stock' when product has stock", () => {
            setup();
            const messages = screen.queryAllByText(/out of stock/i);
            expect(messages.length).toBe(0);
        });

        it("shows 'out of stock' when product has no stock", () => {
            product.stock = 0;
            setup();
            const messages = screen.getAllByText(/out of stock/i);
            expect(messages.length).toBeGreaterThan(0);
        });
    });
});
