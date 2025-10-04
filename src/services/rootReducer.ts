import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingridientsSlice';
import burgerConstructorReducer from './slices/constructorSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';
import userOrders from './slices/userOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  order: orderReducer,
  userOrders: userOrders,
  feed: feedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
