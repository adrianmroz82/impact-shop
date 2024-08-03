import { render, screen } from "@testing-library/react";
import { Category, Product as ProductType } from "@/lib/model";
import Product from "@/app/category/[id]/page";

const mockGetProductsByCategory = jest.fn();
jest.mock("@/lib/api/get-products", () => ({
  getProductsByCategory: () => mockGetProductsByCategory(),
}));

jest.mock("@/components/product-list/product-list", () => ({
  ProductList: ({ products, category }: { products: ProductType[]; category: Category }) => (
    <div>
      <div data-testid="category">{category}</div>
      {products.map((product: ProductType) => (
        <div key={product.id} data-testid="product">
          {product.title}
        </div>
      ))}
    </div>
  ),
}));

describe("Product Page", () => {
  // TODO: move to shared mocks
  const mockCategory: Category = "electronics";
  const mockProducts: ProductType[] = [
    {
      id: 1,
      title: "Product 1",
      description: "Test description 1",
      image: "/path/to/image1",
      price: 10,
      category: "jewelery",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Test description 2",
      image: "/path/to/image2",
      price: 20,
      category: "electronics",
    },
  ];

  beforeEach(() => {
    mockGetProductsByCategory.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch products by category and render ProductList", async () => {
    // given
    const jsx = await Product({ params: { id: encodeURIComponent(mockCategory) } });

    // when
    render(jsx);

    // then
    const productElements = await screen.findAllByTestId("product");
    expect(productElements).toHaveLength(mockProducts.length);
    expect(productElements[0]).toHaveTextContent(mockProducts[0].title);
    expect(productElements[1]).toHaveTextContent(mockProducts[1].title);
  });
});
