"use client";

import Image from "next/image";
import { Category, Product } from "@/lib/model";
import { addToCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/button/button";
import { CartToast } from "@/components/cart-toast/cart-toast";

import styles from "@/components/product-list/product-list.module.css";

interface Props {
  products: Product[];
  category: Category;
}

export function ProductList({ products, category }: Props) {
  const dispatch = useAppDispatch();
  const numberOfItems = products.length;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.categoryContainer}>
      <h2 data-testid="category-header" className={styles.categoryHeader}>
        Category: {category}
      </h2>
      <p data-testid="category-description" className={styles.categoryDescription}>
        found {numberOfItems} items
      </p>
      <ul className={styles.productsContainer}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productBox}>
              <div className={styles.productImageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={256}
                  height={256}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <div data-testid="product-title" className={styles.productTitle}>
                  {product.title}
                </div>
                <div data-testid="product-price" className={styles.productPrice}>
                  ${product.price}
                </div>
                <Button clickHandler={() => handleAddToCart(product)} text="Add to cart" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CartToast />
    </div>
  );
}
