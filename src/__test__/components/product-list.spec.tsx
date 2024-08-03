import { fireEvent, render } from "@testing-library/react";
import { ProductList } from "@/components/product-list/product-list";
import { Category, Product } from "@/lib/model";

const categoryHeaderTestId = "category-header";
const categoryDescriptionTestId = "category-description";

const mockUseAppDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockUseAppDispatch(),
}));

const mockAddToCart = jest.fn();
jest.mock("@/lib/features/cartSlice", () => ({
  addToCart: () => mockAddToCart(),
}));

// TODO: jest.fn
jest.mock("@/components/button/button", () => ({
  Button: ({ clickHandler, text }: { clickHandler: () => void; text: string }) => (
    <button onClick={clickHandler}>{text}</button>
  ),
}));

describe("ProductList", () => {
  const mockDispatch = jest.fn();

  // todo: move to shared?
  const products: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      image: "/images/product1.jpg",
      category: "electronics",
      description: "Product 1 description",
    },
    {
      id: 2,
      title: "Product 2",
      price: 150,
      image: "/images/product2.jpg",
      category: "electronics",
      description: "Product 2 description",
    },
  ];

  const category: Category = "electronics";

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ProductList component correctly", () => {
    // given
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
