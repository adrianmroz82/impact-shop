import { render, fireEvent } from "@testing-library/react";
import { ShoppingCart } from "@/components/shopping-cart/shopping-cart";

const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

const mockUseAppSelector = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

// TODO: jest.fn
jest.mock("lucide-react", () => ({
  ShoppingCartIcon: ({ size, className }: { size: number; className: string }) => (
    <svg className={className} width={size} height={size} />
  ),
}));

describe("ShoppingCart", () => {
  it("should display the badge with the number of products in the cart", () => {
    // given
    const firstItemQuantity = 2;
    const secondItemQuantity = 3;
    const totalQuantity = firstItemQuantity + secondItemQuantity;

    mockUseAppSelector.mockReturnValue([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ]);

    // when
    const { getByText } = render(<ShoppingCart />);
    const badge = getByText(totalQuantity.toString());

    // then
    expect(badge).toBeInTheDocument();
  });

  it("should navigate to the cart page when the shopping cart is clicked", () => {
    // given
    const pushFn = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushFn });
    mockUseAppSelector.mockReturnValue([]);

    // when
    const { getByTestId } = render(<ShoppingCart />);
    const shoppingCart = getByTestId("shopping-cart");

    fireEvent.click(shoppingCart);

    // then
    expect(pushFn).toHaveBeenCalledWith("/cart");
  });
});
