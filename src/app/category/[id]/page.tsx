import Image from "next/image";
import { fetchProductsByCategory } from "@/app/lib/api";
import { Category } from "@/app/lib/model";

import styles from "@/components/product-list.module.css";

interface Props {
  params: {
    id: string;
  };
}

export default async function Product({ params }: Props) {
  const category = decodeURIComponent(params.id) as Category;
  const products = await fetchProductsByCategory(category);
  const count = products.length;

  return (
    <div className={styles.categoryContainer}>
      <h2>
        Category: {category}, found {count} items
      </h2>
      <ul className={styles.productGrid}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productBox}>
              <Image src={product.image} alt={product.title} width={500} height={500} className={styles.productImage} />
              <div className={styles.productInfo}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>${product.price}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
