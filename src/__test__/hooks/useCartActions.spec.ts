import { useCartActions } from "@/hooks/useCartActions";
import { useAppDispatch } from "@/lib/hooks";
import { decrementCartQuantity, incrementCartQuantity, removeFromCart } from "@/lib/features/cartSlice";
import { act, renderHook } from "@testing-library/react";

const mockUseAppDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockUseAppDispatch(),
}));

const mockIncrementCartQuantity = jest.fn();
const mockDecrementCartQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();
jest.mock("@/lib/features/cartSlice", () => ({
  incrementCartQuantity: () => mockIncrementCartQuantity(),
  decrementCartQuantity: () => mockDecrementCartQuantity(),
  removeFromCart: () => mockRemoveFromCart(),
}));

describe("useCartActions", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call incrementCartQuantity with the correct id", () => {
    // given
    // when
    const { result } = renderHook(() => useCartActions());
    const { handleIncrementQuantity } = result.current;

    act(() => {
      handleIncrementQuantity(1);
    });

    // then
    expect(dispatch).toHaveBeenCalledWith(incrementCartQuantity(1));
  });

  it("should call decrementCartQuantity with the correct id", () => {
    // given
    // when
    const { result } = renderHook(() => useCartActions());
    const { handleDecrementQuantity } = result.current;

    act(() => {
      handleDecrementQuantity(1);
    });

    // then
    expect(dispatch).toHaveBeenCalledWith(decrementCartQuantity(1));
  });

  it("should call removeFromCart with the correct id", () => {
    // given
    // when
    const { result } = renderHook(() => useCartActions());
    const { handleRemoveItem } = result.current;

    act(() => {
      handleRemoveItem(1);
    });

    // then
    expect(dispatch).toHaveBeenCalledWith(removeFromCart(1));
  });
});
