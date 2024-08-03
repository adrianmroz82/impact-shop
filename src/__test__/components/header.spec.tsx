import { render } from "@testing-library/react";
import { Header } from "@/components/header/header";

const headerTestId = "header";
const shoppingCartTestId = "shopping-cart";

jest.mock("@/components/shopping-cart/shopping-cart", () => ({
  ShoppingCart: jest.fn(() => <div data-testid={shoppingCartTestId} />),
}));

describe("Header", () => {
  it("should render the header", () => {
    // given
    // when
    const { getByTestId } = render(<Header />);

    // then
    expect(getByTestId(headerTestId)).toBeInTheDocument();
    expect(getByTestId(shoppingCartTestId)).toBeInTheDocument();
  });
});
