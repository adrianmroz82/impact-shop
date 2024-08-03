import { mockCategory, mockProducts } from "@/__test__/sharedMocks";
import { getProductsByCategory } from "@/lib/api/get-products";

global.fetch = jest.fn();

const BASE_URL = "https://fakestoreapi.com/products";

describe("getProductsByCategory", () => {
 

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
