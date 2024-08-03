import { ReactNode } from "react";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

const headerTestId = "header";
const breadcrumbsTestId = "breadcrumbs";

jest.mock("@/components/header/header", () => ({
  Header: jest.fn(() => <header data-testid={headerTestId}>Header Component</header>),
}));

jest.mock("@/components/breadcrumbs/breadcrumbs", () => ({
  Breadcrumbs: jest.fn(() => <nav data-testid={breadcrumbsTestId}>Breadcrumbs Component</nav>),
}));

const renderRootLayout = (children: ReactNode) => render(<RootLayout>{children}</RootLayout>);

describe("RootLayout", () => {
  it("should render Header and Breadcrumbs components", () => {
    // given
    // when
    const { getByTestId } = renderRootLayout(<div>Test Content</div>);

    // then
    expect(getByTestId(headerTestId)).toBeInTheDocument();
    expect(getByTestId(breadcrumbsTestId)).toBeInTheDocument();
  });

  it("should render children within the <main> element", () => {
    // given
    const childContentTestId = "child-content";

    // when
    const { getByTestId } = renderRootLayout(<div data-testid={childContentTestId}>Child Content</div>);

    // then
    expect(getByTestId(childContentTestId)).toBeInTheDocument();
  });

  it("should apply the font class to <html> element", () => {
    const { container } = renderRootLayout(<div>Test Content</div>);

    // Check if the <html> element contains the font class
    expect(container.querySelector("html")).toHaveClass("satoshi-light"); // Adjust class name as needed
  });
});
