import { fireEvent, render, waitFor } from "@testing-library/react";
import { CartToast } from "@/components/cart-toast/cart-toast";
import { CartItem } from "@/lib/model";

const closeIconTestId = "close-icon";

const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

const mockUseAppSelector = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

jest.mock("lucide-react", () => ({
  CircleCheckIcon: () => <svg />,
  X: jest.fn((props) => <div data-testid={closeIconTestId} {...props} />),
}));

describe("CartToast", () => {
  const push = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render nothing when cart is empty", () => {
    // given
    mockUseAppSelector.mockImplementation(() => []);

    // when
    const { container } = render(<CartToast />);

    // then
    expect(container.firstChild).toBeNull();
  });

  it("should render the cart toast when there are items in the cart", () => {
    // given
    const mockCart: CartItem[] = [
      { id: 1, title: "Title 1", price: 10, quantity: 2, image: "/" },
      { id: 2, title: "Title 2", price: 20, quantity: 1, image: "/" },
    ];

    mockUseAppSelector.mockReturnValue(mockCart);

    // when
    const { getByText } = render(<CartToast />);

    // then
    expect(getByText(/Item has been added to cart/i)).toBeInTheDocument();
    expect(getByText(mockCart[0].title)).toBeInTheDocument();
    expect(getByText(`$${mockCart[0].price}`)).toBeInTheDocument();
  });

  it("should hide the cart toast after 4 seconds", async () => {
    const mockCart: CartItem[] = [
      { id: 1, title: "Title 1", price: 10, quantity: 2, image: "/" },
      { id: 2, title: "Title 2", price: 20, quantity: 1, image: "/" },
    ];

    mockUseAppSelector.mockReturnValue(mockCart);

    const { getByTestId, queryByTestId } = render(<CartToast />);
    expect(getByTestId("top-section-title")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(queryByTestId("top-section-title")).not.toBeInTheDocument();
      },
      { timeout: 4500 }
    );
  });

  it('should navigate to the cart page when "View cart" button is clicked', () => {
    // given
    const mockCart: CartItem[] = [
      { id: 1, title: "Title 1", price: 10, quantity: 2, image: "/" },
      { id: 2, title: "Title 2", price: 20, quantity: 1, image: "/" },
    ];

    mockUseAppSelector.mockReturnValue(mockCart);

    const { getByText } = render(<CartToast />);
    const button = getByText(/View cart/i);

    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith("/cart");
  });

  it("should close the toast when the close icon is clicked", () => {
    // given
    const mockCart: CartItem[] = [
      { id: 1, title: "Title 1", price: 10, quantity: 2, image: "/" },
      { id: 2, title: "Title 2", price: 20, quantity: 1, image: "/" },
    ];

    mockUseAppSelector.mockReturnValue(mockCart);

    // when
    const { getByTestId, queryByTestId } = render(<CartToast />);
    const closeIcon = getByTestId(closeIconTestId);

    // then
    expect(getByTestId("top-section-title")).toBeInTheDocument();

    // when
    fireEvent.click(closeIcon);

    // then
    expect(queryByTestId("top-section-title")).not.toBeInTheDocument();
  });
});
