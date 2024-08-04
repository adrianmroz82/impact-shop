import { fireEvent, render } from "@testing-library/react";
import { ProductList } from "@/components/product-list/product-list";
import { mockCategory, mockProducts } from "@/__test__/sharedMocks";

const categoryHeaderTestId = "category-header";
const categoryDescriptionTestId = "category-description";
const cartToastTestId = "cart-toast";

const mockUseAppDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockUseAppDispatch(),
}));

const mockAddToCart = jest.fn();
jest.mock("@/lib/features/cartSlice", () => ({
  addToCart: () => mockAddToCart(),
}));

jest.mock("@/components/button/button", () => ({
  Button: ({ clickHandler, text }: { clickHandler: () => void; text: string }) => (
    <button onClick={clickHandler}>{text}</button>
  ),
}));

jest.mock("@/components/cart-toast/cart-toast", () => ({
  CartToast: () => <div data-testid={cartToastTestId} />,
}));

describe("ProductList", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ProductList component correctly", () => {
    // given
    const products = mockProducts;
    const category = mockCategory;

    // when
    const { getByTestId, getByText } = render(<ProductList products={products} category={category} />);
    const categoryHeader = getByTestId(categoryHeaderTestId);
    const categoryDescription = getByTestId(categoryDescriptionTestId);

    // then
    expect(categoryHeader).toBeInTheDocument();
    expect(categoryDescription).toBeInTheDocument();

    products.forEach((product) => {
      const productTitle = getByText(product.title);
      const productPrice = getByText(`$${product.price}`);

      expect(productTitle).toBeInTheDocument();
      expect(productPrice).toBeInTheDocument();
    });
  });

  it("should dispatch addToCart action when 'Add to cart' button is clicked", () => {
    // given
    const products = mockProducts;
    const category = mockCategory;

    // when
    const { queryAllByText } = render(<ProductList products={products} category={category} />);

    products.forEach((product) => {
      const addButton = queryAllByText("Add to cart");
      fireEvent.click(addButton[0]);

      // then
      expect(mockDispatch).toHaveBeenCalledWith(mockAddToCart(product));
    });
  });
});
