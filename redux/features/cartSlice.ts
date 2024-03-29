import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  brand: string;
  name: string;
  price: number;
  size: string;
  additional: string;
  photo: string;
  quantity: number;
}

export const cart = createSlice({
  name: "cart",
  initialState: [] as Product[],
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const itemExists = state.find(
        (item: Product) =>
          item._id === action.payload._id &&
          item.additional === action.payload.additional &&
          item.size === action.payload.size
      );
      if (itemExists) {
        itemExists.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      const item = state.find(
        (item: Product) =>
          item._id === action.payload._id &&
          item.additional === action.payload.additional &&
          item.size === action.payload.size
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      const item = state.find(
        (item: Product) =>
          item._id === action.payload._id &&
          item.additional === action.payload.additional &&
          item.size === action.payload.size
      );
      if (item) {
        if (item.quantity === 1) {
          const index = state.findIndex(
            (item: Product) =>
              item._id === action.payload._id &&
              item.additional === action.payload.additional &&
              item.size === action.payload.size
          );
          state.splice(index, 1);
        } else {
          item.quantity--;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const index = state.findIndex(
        (item: Product) =>
          item._id === action.payload._id &&
          item.additional === action.payload.additional &&
          item.size === action.payload.size
      );
      state.splice(index, 1);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cart.actions;

export default cart.reducer;
