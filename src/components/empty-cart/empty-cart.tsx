import { useRouter } from "next/navigation";
import { Button } from "@/components/button/button";

export function EmptyCart() {
  const router = useRouter();

  const handleRedirect = () => {
    router.back();
  };

  return (
    <div data-testid="empty-cart">
      <h2>There are no items in your cart</h2>
      <Button clickHandler={handleRedirect} text="Go back to shopping" />
    </div>
  );
}
