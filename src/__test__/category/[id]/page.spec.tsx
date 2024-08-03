import { render, screen } from "@testing-library/react";
import { Category, Product as ProductType } from "@/lib/model";
import { mockCategory, mockProducts } from "@/__test__/sharedMocks";
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
