import { ReactNode } from "react";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

const headerTestId = "header";
const navigationBarTestId = "navigation-bar";
const storeProviderTestId = "store-provider";

jest.mock("@/components/header/header", () => ({
  Header: jest.fn(() => <header data-testid={headerTestId}>Header Component</header>),
}));

jest.mock("@/components/navigation-bar/navigation-bar", () => ({
  NavigationBar: jest.fn(() => <nav data-testid={navigationBarTestId} />),
}));

jest.mock("@/app/store-provider", () => ({
  StoreProvider: jest.fn(({ children }) => <div data-testid={storeProviderTestId}>{children}</div>),
}));

const renderRootLayout = (children: ReactNode) => render(<RootLayout>{children}</RootLayout>);

describe("RootLayout", () => {
  it("should render Header and NavigationBar components", () => {
    // given
    // when
    const { getByTestId } = renderRootLayout(<div>Test Content</div>);

    // then
    expect(getByTestId(headerTestId)).toBeInTheDocument();
    expect(getByTestId(navigationBarTestId)).toBeInTheDocument();
    expect(getByTestId(storeProviderTestId)).toBeInTheDocument();
  });

  it("should render children within the <main> element", () => {
    // given
    const childContentTestId = "child-content";

    // when
    const { getByTestId } = renderRootLayout(<div data-testid={childContentTestId}>Child Content</div>);

    // then
    expect(getByTestId(childContentTestId)).toBeInTheDocument();
  });
});
