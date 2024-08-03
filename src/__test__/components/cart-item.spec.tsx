import { render, fireEvent } from "@testing-library/react";
import { CartItem } from "@/components/cart-item/cart-item";
import { CartItem as CartItemProps } from "@/lib/model";

const cartItemDecrementButtonTestId = "cart-item-decrement-button";
const cartItemIncrementButtonTestId = "cart-item-increment-button";
const removeIconTestId = "remove-icon";

jest.mock("lucide-react", () => ({
  X: jest.fn((props) => <div data-testid={removeIconTestId} {...props} />),
}));

const mockUseCartActions = jest.fn();
jest.mock("@/hooks/useCartActions", () => ({
  useCartActions: () => mockUseCartActions(),
}));

describe("CartItem", () => {
  const mockHandleIncrementQuantity = jest.fn();
  const mockHandleDecrementQuantity = jest.fn();
  const mockHandleRemoveItem = jest.fn();

  const cartItem: CartItemProps = {
    id: 1,
    title: "Test Product",
    image: "/images/test-product.jpg",
    price: 99.99,
    quantity: 2,
  };

  beforeEach(() => {
    mockUseCartActions.mockReturnValue({
      handleIncrementQuantity: mockHandleIncrementQuantity,
      handleDecrementQuantity: mockHandleDecrementQuantity,
      handleRemoveItem: mockHandleRemoveItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the CartItem component with the correct details", () => {
    // given
    // when
    const { getByText } = render(<CartItem cartItem={cartItem} />);

    // then
    expect(getByText(cartItem.title)).toBeInTheDocument();
    expect(getByText(`Quantity:`)).toBeInTheDocument();
    expect(getByText(cartItem.quantity.toString())).toBeInTheDocument();
    expect(getByText(`$${cartItem.price.toFixed(2)} each`)).toBeInTheDocument();
    expect(getByText(`Total: $${(cartItem.price * cartItem.quantity).toFixed(2)}`)).toBeInTheDocument();
  });

  it("should call handleIncrementQuantity when the increment button is clicked", () => {
    // given
    // when
    const { getByTestId } = render(<CartItem cartItem={cartItem} />);

    const incrementButton = getByTestId(cartItemIncrementButtonTestId);
    fireEvent.click(incrementButton);

    // then
    expect(mockHandleIncrementQuantity).toHaveBeenCalledWith(cartItem.id);
  });

  it("should call handleDecrementQuantity when the decrement button is clicked", () => {
    // given
    // when
    const { getByTestId } = render(<CartItem cartItem={cartItem} />);

    const decrementButton = getByTestId(cartItemDecrementButtonTestId);
    fireEvent.click(decrementButton);

    // then
    expect(mockHandleDecrementQuantity).toHaveBeenCalledWith(cartItem.id);
  });

  it("should call handleRemoveItem when the remove icon is clicked", () => {
    // given
    // when
    const { getByTestId } = render(<CartItem cartItem={cartItem} />);
    const removeIcon = getByTestId(removeIconTestId);

    fireEvent.click(removeIcon);

    // then
    expect(mockHandleRemoveItem).toHaveBeenCalledWith(cartItem.id);
  });
});
