"use client";

import { decrementCartQuantity, incrementCartQuantity, removeFromCart } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // const total = cart.reduce((acc, product) => acc + product.price, 0);

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementCartQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementCartQuantity(id));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((cartItem, idx) => (
          <li key={idx}>
            {cartItem.title} - ${cartItem.price}
            <button onClick={() => handleIncrementQuantity(cartItem.id)}>+</button>
            {cartItem.quantity ?? 1}
            <button onClick={() => handleDecrementQuantity(cartItem.id)}>-</button>
            <button onClick={() => handleRemoveItem(cartItem.id)}>remove</button>
            TOTAL: ${cartItem.price * cartItem.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
