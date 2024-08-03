import { getCategories } from "@/lib/api/get-categories";
import { Category } from "@/lib/model";

describe("getCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch categories successfully", async () => {
    // given
    const mockCategories: Category[] = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        }) as unknown as Promise<Response>
    );

    // when
    const categories = await getCategories();

    // then
    expect(categories).toEqual(mockCategories);
  });

  it("should return an empty array and log an error on failure", async () => {
    // given
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          json: () => Promise.reject("Failed to parse JSON"),
        }) as unknown as Promise<Response>
    );

    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    // when
    const categories = await getCategories();

    // then
    expect(categories).toEqual([]);
    expect(consoleError).toHaveBeenCalledWith(expect.any(Error));

    consoleError.mockRestore();
  });
});
