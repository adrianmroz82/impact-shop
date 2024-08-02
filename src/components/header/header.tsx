import { ShoppingCart } from "@/components/shopping-cart/shopping-cart";

import styles from "@/components/header/header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a className={styles.headerLogo} href="/">
          Impact Shop
        </a>
        <nav>
          <ShoppingCart />
        </nav>
      </div>
    </header>
  );
}
