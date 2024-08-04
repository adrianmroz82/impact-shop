import { fireEvent, render } from "@testing-library/react";
import { NavigationBar } from "@/components/navigation-bar/navigation-bar";

const navigationBarTestId = "navigation-bar";

const mockUseRouter = jest.fn();
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
  usePathname: () => mockUsePathname(),
}));

describe("NavigationBar", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      back: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render go back button URL is not base ('/category')", () => {
    // given
    mockUsePathname.mockReturnValue("/some-other-path");

    // when
    const { getByTestId } = render(<NavigationBar />);
    const button = getByTestId(navigationBarTestId);

    // then
    expect(button).toBeInTheDocument();
  });

  it("should not render go back button when on base URL ('/category')", () => {
    // given
    mockUsePathname.mockReturnValue("/category");

    // when
    const { container } = render(<NavigationBar />);

    // then
    expect(container.firstChild).toBeNull();
  });

  it("should call router.back when the go back button is clicked", () => {
    // given
    mockUsePathname.mockReturnValue("/some-other-path");

    // when
    const { getByTestId } = render(<NavigationBar />);
    const button = getByTestId(navigationBarTestId);

    // then
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockUseRouter).toHaveBeenCalledTimes(1);
  });
});
