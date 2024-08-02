import Link from "next/link";
import { fetchCategories } from "@/lib/api";

import styles from "@/components/category-list/category-list.module.css";

export default async function CategoryList() {
  const categories = await fetchCategories();

  return (
    <div className={styles.categoryListContainer}>
      <h2>Discover our Collection</h2>
      <ul className={styles.categoryGrid}>
        {categories.map((category) => (
          <li key={category} className={styles.categoryItem}>
            <Link href={`/category/${encodeURIComponent(category)}`}>
              <div className={styles.categoryBox}>{category}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
