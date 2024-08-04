import { CategoryList } from "@/components/category-list/category-list";

import styles from "@/app/category/page.module.css";

export default function Category() {
  return (
    <main className={styles.category}>
      <CategoryList />
    </main>
  );
}
