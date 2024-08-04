"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

import styles from "@/components/shopping-cart/shopping-cart.module.css";

export function ShoppingCart() {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const numOfProductsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleRedirect = () => {
    router.push("/cart");
  };

  return (
    <div data-testid="shopping-cart" className={styles.shoppingCartContainer} onClick={handleRedirect}>
      <ShoppingCartIcon size={32} className={styles.shoppingCartIcon} />
      {numOfProductsInCart > 0 && <div className={styles.badge}>{numOfProductsInCart}</div>}
    </div>
  );
}
