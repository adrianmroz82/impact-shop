import { render, screen } from "@testing-library/react";
import { CategoryList } from "@/components/category-list/category-list";
import { Category } from "@/lib/model";

const mockGetCategories = jest.fn();
jest.mock("@/lib/api/get-categories", () => ({
  getCategories: () => mockGetCategories(),
}));

describe("CategoryList", () => {
  const categories: Category[] = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  beforeEach(() => {
    mockGetCategories.mockResolvedValue(categories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the CategoryList component with the correct categories", async () => {
    // given
    const jsx = await CategoryList();

    // when
    render(jsx);

    // then
    for (const category of categories) {
      expect(await screen.findByText(category.toUpperCase())).toBeInTheDocument();
    }
  });

  it("should render links with the correct href", async () => {
    // given
    const jsx = await CategoryList();

    // when
    render(jsx);

    // then
    for (const category of categories) {
      const linkElement = await screen.findByText(category.toUpperCase());
      expect(linkElement.closest("a")).toHaveAttribute("href", `/category/${encodeURIComponent(category)}`);
    }
  });
});
