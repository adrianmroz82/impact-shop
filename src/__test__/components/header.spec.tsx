import { fireEvent, render } from "@testing-library/react";
import { Header } from "@/components/header/header";

const headerTestId = "header";
const shoppingCartTestId = "shopping-cart";

const pushFn = jest.fn();

const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("@/components/shopping-cart/shopping-cart", () => ({
  ShoppingCart: jest.fn(() => <div data-testid={shoppingCartTestId} />),
}));

describe("Header", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: pushFn });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    // given
    // when
    const { getByTestId } = render(<Header />);

    // then
    expect(getByTestId(headerTestId)).toBeInTheDocument();
    expect(getByTestId(shoppingCartTestId)).toBeInTheDocument();
  });

  it("should navigate to the category page when the logo is clicked", () => {
    // given

    // when
    const { getByText } = render(<Header />);
    const logo = getByText("Impact Shop");

    // then
    fireEvent.click(logo);
    expect(pushFn).toHaveBeenCalledWith("/category");
  });
});
