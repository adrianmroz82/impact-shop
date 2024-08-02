"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X as RemoveIcon } from "lucide-react";
import { decrementCartQuantity, incrementCartQuantity, removeFromCart } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import styles from "@/app/cart/page.module.css";
import { Button } from "@/components/button/button";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementCartQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementCartQuantity(id));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function NoItemsInCart() {
    return (
      <div className={styles.noItemsContainer}>
        <h2>There are no items in your cart</h2>
        <Button clickHandler={() => router.push("/")} text="Go back to shopping" />
      </div>
    );
  }

  return (
    <>
      <h3 className={styles.title}>Cart</h3>
      <div className={styles.container}>
        {cart.length === 0 ? (
          <NoItemsInCart />
        ) : (
          <>
            <ul className={styles.list}>
              {cart.map((cartItem) => (
                <li key={cartItem.id} className={styles.listItem}>
                  <Image className={styles.image} src={cartItem.image} alt={cartItem.title} width={80} height={80} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{cartItem.title}</h3>
                    <div className={styles.controls}>
                      Quantity:
                      <button className={styles.button} onClick={() => handleDecrementQuantity(cartItem.id)}>
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button className={styles.button} onClick={() => handleIncrementQuantity(cartItem.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.price}>
                    <RemoveIcon className={styles.removeIcon} size={24} onClick={() => handleRemoveItem(cartItem.id)} />
                    <p>${cartItem.price.toFixed(2)} each</p>
                    <p>Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>
          </>
        )}
      </div>
    </>
  );
}
