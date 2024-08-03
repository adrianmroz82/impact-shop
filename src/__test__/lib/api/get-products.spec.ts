import { getProductsByCategory } from "@/lib/api/get-products";
import { Category, Product } from "@/lib/model";

global.fetch = jest.fn();

const BASE_URL = "https://fakestoreapi.com/products";

describe("getProductsByCategory", () => {
  const mockCategory: Category = "electronics";
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      description: "Test description 1",
      image: "/path/to/image1",
      price: 10,
      category: "electronics",
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
    jest.clearAllMocks();
  });

  it("should fetch products successfully", async () => {
    // given
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    // when
    const products = await getProductsByCategory(mockCategory);

    expect(products).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/category/${mockCategory}`);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array and log an error on failure", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          json: () => Promise.reject("Failed to parse JSON"),
        }) as unknown as Promise<Response>
    );

    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    // when
    const products = await getProductsByCategory(mockCategory);

    // then
    expect(products).toEqual([]);
    expect(consoleError).toHaveBeenCalledWith(expect.any(Error));

    consoleError.mockRestore();
  });
});
