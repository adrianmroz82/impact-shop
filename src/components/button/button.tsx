import styles from "@/components/button/button.module.css";

interface Props {
  clickHandler: () => void;
  text: string;
}

export function Button({ clickHandler, text }: Props) {
  return (
    <button data-testid="button" className={styles.addToCartButton} onClick={clickHandler}>
      {text}
    </button>
  );
}
