"use client";

import Image from "next/image";
import { Category, Product } from "@/lib/model";
import { addToCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import styles from "@/components/products-list.module.css";

interface Props {
  products: Product[];
  category: Category;
}

export function ProductsList({ products, category }: Props) {
  const dispatch = useAppDispatch();
  const numberOfItems = products.length;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.categoryContainer}>
      <h2>
        Category: {category}, found {numberOfItems} items
      </h2>
      <ul className={styles.productGrid}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productBox}>
              <Image src={product.image} alt={product.title} width={500} height={500} className={styles.productImage} />
              <div className={styles.productInfo}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>${product.price}</div>
                <button className={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
