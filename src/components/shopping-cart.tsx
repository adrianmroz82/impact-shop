"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

import styles from "@/components/shopping-cart.module.css";

export function ShoppingCart() {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const productsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.shoppingCartContainer} onClick={() => router.push("/cart")}>
      <ShoppingCartIcon size={32} className={styles.shoppingCartIcon} />
      {productsInCart > 0 && <div className={styles.badge}>{productsInCart}</div>}
    </div>
  );
}
