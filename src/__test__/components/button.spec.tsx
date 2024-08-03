import { render, fireEvent } from "@testing-library/react";
import { Button } from "@/components/button/button";

const buttonTestId = "button";

describe("Button", () => {
  it("should render the Button component", () => {
    // given
    const mockClickHandler = jest.fn();
    const buttonText = "Add to cart";

    // when
    const { getByTestId } = render(<Button clickHandler={mockClickHandler} text={buttonText} />);
    const button = getByTestId(buttonTestId);

    // then
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
  });

  it("should call clickHandler when the button is clicked", () => {
    // given
    const mockClickHandler = jest.fn();
    const buttonText = "Add to cart";

    // when
    const { getByTestId } = render(<Button clickHandler={mockClickHandler} text={buttonText} />);
    const button = getByTestId(buttonTestId);

    fireEvent.click(button);

    // then
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
