import Category from "@/app/page";
import { render } from "@testing-library/react";

const categoryListTestId = "category-list";

jest.mock("@/components/category-list/category-list", () => ({
  CategoryList: jest.fn(() => <div data-testid={categoryListTestId} />),
}));

describe("Category Page", () => {
  it("should render the Category page", () => {
    // given
    // when
    const { getByTestId } = render(<Category />);

    // then
    expect(getByTestId(categoryListTestId)).toBeInTheDocument();
  });
});
