"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

import styles from "@/components/shopping-cart.module.css";

export function ShoppingCart() {
  const router = useRouter();
  const cartCount = useAppSelector((state) => state.cart.length);

  return (
    <div className={styles.shoppingCartContainer}>
      <ShoppingCartIcon size={32} onClick={() => router.push("/checkout")} className={styles.shoppingCartIcon} />
      {cartCount > 0 && <div className={styles.badge}>{cartCount}</div>}
    </div>
  );
}
