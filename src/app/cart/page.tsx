"use client";

import { useAppSelector } from "@/lib/hooks";
import { EmptyCart } from "@/components/empty-cart/empty-cart";
import { CartItem } from "@/components/cart-item/cart-item";

import styles from "@/app/cart/page.module.css";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={styles.container}>
        <h3>Cart</h3>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <ul className={styles.list}>
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>
          </ul>
        )}
      </div>
    </>
  );
}
