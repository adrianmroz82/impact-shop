import { render } from "@testing-library/react";
import Cart from "@/app/cart/page";
import { CartItem } from "@/lib/model";

const mockUseAppSelector = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

jest.mock("@/components/empty-cart/empty-cart", () => ({
  EmptyCart: jest.fn(() => <div>Empty Cart</div>),
}));

jest.mock("@/components/cart-item/cart-item", () => ({
  CartItem: jest.fn(({ cartItem }) => <div>{cartItem.title}</div>),
}));

describe("Cart page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render EmptyCart when cart is empty", () => {
    // given
    mockUseAppSelector.mockReturnValue([]);

    // when
    const { getByText } = render(<Cart />);

    // then
    expect(getByText("Empty Cart")).toBeInTheDocument();
  });

  it("should render cart items when cart is not empty", () => {
    // given
    const firstItemTitle = "Product 1";
    const secondItemTitle = "Product 2";

    const mockCart: CartItem[] = [
      { id: 1, title: firstItemTitle, price: 10, quantity: 2, image: "" },
      { id: 2, title: secondItemTitle, price: 20, quantity: 1, image: "" },
    ];

    const totalPrice = mockCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    mockUseAppSelector.mockReturnValue(mockCart);

    // when
    const { getByText } = render(<Cart />);

    // then
    expect(getByText(firstItemTitle)).toBeInTheDocument();
    expect(getByText(secondItemTitle)).toBeInTheDocument();
    expect(getByText(`Total Price: $${totalPrice.toFixed(2)}`)).toBeInTheDocument();
  });
});
