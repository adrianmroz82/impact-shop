import { render } from "@testing-library/react";
import { StoreProvider } from "@/app/store-provider";

const mockMakeStore = jest.fn();
jest.mock("@/lib/store", () => ({
  makeStore: () => mockMakeStore(),
}));

describe("StoreProvider", () => {
  const mockStore = {
    getState: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    mockMakeStore.mockReturnValue(mockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create the store instance and provide it to the children", () => {
    // given
    const text = "Test Child";

    // when
    const { getByText } = render(
      <StoreProvider>
        <div>{text}</div>
      </StoreProvider>
    );

    // then
    expect(mockMakeStore).toHaveBeenCalledTimes(1);
    expect(getByText(text)).toBeInTheDocument();
  });

  it("should only create the store instance once", () => {
    // given
    // when
    const { rerender } = render(
      <StoreProvider>
        <div>Test Child</div>
      </StoreProvider>
    );

    // then
    expect(mockMakeStore).toHaveBeenCalledTimes(1);

    // when
    rerender(
      <StoreProvider>
        <div>Test Child Updated</div>
      </StoreProvider>
    );

    // then
    expect(mockMakeStore).toHaveBeenCalledTimes(1);
  });
});
