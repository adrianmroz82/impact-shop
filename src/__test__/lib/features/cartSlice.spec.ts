import cartReducer, {
  addToCart,
  removeFromCart,
  incrementCartQuantity,
  decrementCartQuantity,
} from "@/lib/features/cartSlice";
import { Product, CartItem } from "@/lib/model";

describe("cartSlice", () => {
  const initialState: CartItem[] = [];

  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    description: "Test Description",
    image: "/test.jpg",
    price: 100,
    category: "electronics",
  };

  it("should handle adding a product to the cart", () => {
    // given
    // when
    const state = cartReducer(initialState, addToCart(mockProduct));

    // then
    expect(state).toEqual([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ]);
  });

  it("should handle adding a product that already exists in the cart", () => {
    // given
    const initialStateWithProduct: CartItem[] = [
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ];

    // when
    const state = cartReducer(initialStateWithProduct, addToCart(mockProduct));

    // then
    expect(state).toEqual([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 2,
        image: mockProduct.image,
      },
    ]);
  });

  it("should handle removing a product from the cart", () => {
    // given
    const initialStateWithProduct: CartItem[] = [
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ];

    // when
    const state = cartReducer(initialStateWithProduct, removeFromCart(mockProduct.id));

    // then
    expect(state).toEqual([]);
  });

  it("should handle incrementing cart item quantity", () => {
    // given
    const initialStateWithProduct: CartItem[] = [
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ];

    // when
    const state = cartReducer(initialStateWithProduct, incrementCartQuantity(mockProduct.id));

    // then
    expect(state).toEqual([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 2,
        image: mockProduct.image,
      },
    ]);
  });

  it("should handle decrementing cart item quantity", () => {
    // given
    const initialStateWithProduct: CartItem[] = [
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 2,
        image: mockProduct.image,
      },
    ];

    // when
    const state = cartReducer(initialStateWithProduct, decrementCartQuantity(mockProduct.id));

    // then
    expect(state).toEqual([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ]);
  });

  it("should not decrement quantity below 1", () => {
    // given
    const initialStateWithProduct: CartItem[] = [
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ];

    // when
    const state = cartReducer(initialStateWithProduct, decrementCartQuantity(mockProduct.id));

    // then
    expect(state).toEqual([
      {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        quantity: 1,
        image: mockProduct.image,
      },
    ]);
  });
});
