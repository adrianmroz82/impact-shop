import { render, fireEvent } from "@testing-library/react";
import { EmptyCart } from "@/components/empty-cart/empty-cart";

const emptyCartTestId = "empty-cart";

const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("@/components/button/button", () => ({
  Button: jest.fn(({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>),
}));

describe("EmptyCart", () => {
  it("should render the EmptyCart component correctly", () => {
    // given
    // when
    const { getByTestId } = render(<EmptyCart />);

    // then
    expect(getByTestId(emptyCartTestId)).toBeInTheDocument();
  });

  it("should navigate to the homepage when the button is clicked", () => {
    // given
    const pushFn = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushFn });

    // when
    const { getByRole } = render(<EmptyCart />);
    const button = getByRole("button", { name: /go back to shopping/i });

    fireEvent.click(button);

    // then
    expect(pushFn).toHaveBeenCalledWith("/");
  });
});
