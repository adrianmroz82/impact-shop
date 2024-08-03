import { CategoryList } from "@/components/category-list/category-list";
import styles from "./page.module.css";

export default function Category() {
  return (
    <main className={styles.main}>
      <CategoryList />
    </main>
  );
}
