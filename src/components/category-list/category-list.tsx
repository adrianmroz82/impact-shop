import Link from "next/link";
import { getCategories } from "@/lib/api/get-categories";

import styles from "@/components/category-list/category-list.module.css";

export async function CategoryList() {
  const categories = await getCategories();

  return (
    <div className={styles.categoryListContainer}>
      <h2>Discover our Collection</h2>
      <ul className={styles.categoryGrid}>
        {categories.map((category) => (
          <li key={category} className={styles.categoryItem}>
            <Link className={styles.link} href={`/category/${encodeURIComponent(category)}`}>
              <div className={styles.categoryBox}>{category.toUpperCase()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
