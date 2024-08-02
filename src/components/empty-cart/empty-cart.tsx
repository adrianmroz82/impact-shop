import { useRouter } from "next/navigation";
import { Button } from "../button/button";

export function EmptyCart() {
  const router = useRouter();

  return (
    <>
      <h2>There are no items in your cart</h2>
      <Button clickHandler={() => router.push("/")} text="Go back to shopping" />
    </>
  );
}
