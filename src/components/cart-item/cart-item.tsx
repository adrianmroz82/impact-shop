import Image from "next/image";
import { X as RemoveIcon } from "lucide-react";
import { useCartActions } from "@/hooks/useCartActions";
import { CartItem as CartItemProps } from "@/lib/model";

import styles from "@/components/cart-item/cart-item.module.css";

interface Props {
  cartItem: CartItemProps;
}

export function CartItem({ cartItem }: Props) {
  const { handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem } = useCartActions();

  const { id, title, image, price, quantity } = cartItem;

  return (
    <li className={styles.container}>
      <Image className={styles.image} src={image} alt={title} width={80} height={80} />
      <div className={styles.itemDetails}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <div className={styles.cartButtons}>
          Quantity:
          <button className={styles.button} onClick={() => handleDecrementQuantity(id)}>
            -
          </button>
          <span>{quantity}</span>
          <button className={styles.button} onClick={() => handleIncrementQuantity(id)}>
            +
          </button>
        </div>
      </div>
      <div className={styles.price}>
        <RemoveIcon className={styles.removeIcon} size={24} onClick={() => handleRemoveItem(id)} />
        <p>${price.toFixed(2)} each</p>
        <p>Total: ${(price * quantity).toFixed(2)}</p>
      </div>
    </li>
  );
}
