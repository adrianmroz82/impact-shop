"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheckIcon, X as CloseIcon } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/button/button";

import styles from "@/components/cart-toast/cart-toast.module.css";

export function CartToast() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (quantity > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [quantity]);

  const handleRedirect = () => {
    router.push("/cart");
  };

  const handleVisibility = () => {
    setVisible((visible) => !visible);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.topSection}>
        <CircleCheckIcon className={styles.checkIcon} />
        <span data-testid="top-section-title">Item has been added to cart</span>
      </div>
      {cart.map(({ id, title, image, price }) => (
        <div className={styles.notificationContent} key={id}>
          <Image src={image} alt={title} width={60} height={60} />
          <div className={styles.itemDetails}>
            <div className={styles.itemTitle}>{title}</div>
            <div className={styles.itemPrice}>${price}</div>
          </div>
        </div>
      ))}
      <CloseIcon data-testid="close-icon" className={styles.closeIcon} size={20} onClick={handleVisibility} />
      <div className={styles.viewCartButton}>
        <Button text={`View cart (${quantity})`} clickHandler={handleRedirect} />
      </div>
    </div>
  );
}
