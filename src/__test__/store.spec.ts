import { addToCart, removeFromCart, incrementCartQuantity, decrementCartQuantity } from "@/lib/features/cartSlice";
import { RootState, makeStore } from "@/lib/store";
import { mockProducts } from "@/__test__/sharedMocks";

describe("Redux Store", () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
  });

  it("should configure the store with the cart slice", () => {
    // given
    const state: RootState = store.getState();

    // then
    expect(state.cart).toBeDefined();
  });

  it("should handle addToCart action", () => {
    // given
    const product = mockProducts[0];
    store.dispatch(addToCart(product));

    // when
    const state: RootState = store.getState();

    // then
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Product 1",
        price: 10,
        image: "/path/to/image1",
        quantity: 1,
      })
    );
  });

  it("should handle removeFromCart action", () => {
    // given
    const product = mockProducts[0];
    store.dispatch(addToCart(product));
    store.dispatch(removeFromCart(1));

    // when
    const state: RootState = store.getState();

    // then
    expect(state.cart).toHaveLength(0);
  });

  it("should handle incrementCartQuantity action", () => {
    // given
    const product = mockProducts[0];
    store.dispatch(addToCart(product));
    store.dispatch(incrementCartQuantity(1));

    // when
    const state: RootState = store.getState();

    // then
    expect(state.cart[0].quantity).toBe(2);
  });

  it("should handle decrementCartQuantity action", () => {
    // given
    const product = mockProducts[0];

    store.dispatch(addToCart(product));
    store.dispatch(decrementCartQuantity(2));

    // when
    const state: RootState = store.getState();

    // then
    expect(state.cart[0].quantity).toBe(1);
  });
});
