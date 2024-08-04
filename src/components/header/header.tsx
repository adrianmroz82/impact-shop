"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "@/components/shopping-cart/shopping-cart";

import styles from "@/components/header/header.module.css";

export function Header() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/category");
  };

  return (
    <header data-testid="header" className={styles.header}>
      <div className={styles.headerContainer}>
        <a className={styles.headerLogo} onClick={handleRedirect}>
          Impact Shop
        </a>
        <nav>
          <ShoppingCart />
        </nav>
      </div>
    </header>
  );
}
