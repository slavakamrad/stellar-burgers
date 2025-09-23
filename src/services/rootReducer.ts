import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingridientsSlice';
import burgerConstructorReducer from './slices/constructorSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
