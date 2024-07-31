import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
};

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, image } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ id, title, price, qty: 1, image });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementCartQuantity: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
      }
    },
    decrementCartQuantity: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementCartQuantity, decrementCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;