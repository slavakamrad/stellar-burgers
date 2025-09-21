// services/slices/userOrdersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface UserOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  wsConnected: boolean;
  wsError: string | null;
}

const initialState: UserOrdersState = {
  orders: [],
  loading: false,
  error: null,
  wsConnected: false,
  wsError: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    wsUserConnectionStart: (state, action: PayloadAction<string>) => {
      state.wsConnected = true;
      state.wsError = null;
    },
    wsUserConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.wsError = null;
    },
    wsUserConnectionError: (state, action: PayloadAction<string>) => {
      state.wsConnected = false;
      state.wsError = action.payload;
    },
    wsUserConnectionClosed: (state) => {
      state.wsConnected = false;
      state.wsError = null;
    },
    wsUserGetMessage: (state, action: PayloadAction<{ success: boolean; orders: TOrder[] }>) => {
      if (action.payload.success) {
        state.orders = action.payload.orders;
      }
      state.loading = false;
    },
    clearUserOrders: (state) => {
      state.orders = [];
    }
  }
});

export const {
  wsUserConnectionStart,
  wsUserConnectionSuccess,
  wsUserConnectionError,
  wsUserConnectionClosed,
  wsUserGetMessage,
  clearUserOrders
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;