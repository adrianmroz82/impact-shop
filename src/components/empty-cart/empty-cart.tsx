import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button/button";

export function EmptyCart() {
  const router = useRouter();

  return (
    <div data-testid="empty-cart">
      <h2>There are no items in your cart</h2>
      <Button clickHandler={() => router.push("/")} text="Go back to shopping" />
    </div>
  );
}
