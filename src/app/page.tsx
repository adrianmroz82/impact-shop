import CategoryList from "@/components/category-list";
import styles from "./page.module.css";
import { ShoppingCart } from "@/components/shopping-card";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}></div>

      <CategoryList />
    </main>
  );
}
