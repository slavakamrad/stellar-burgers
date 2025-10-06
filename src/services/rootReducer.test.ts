import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('тесты для rootReducer', () => {
  it('rootReducer initialization', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toBeDefined();
    expect(store.getState().ingredients).toBeDefined();
    expect(store.getState().burgerConstructor).toBeDefined();
    expect(store.getState().user).toBeDefined();
    expect(store.getState().order).toBeDefined();
    expect(store.getState().userOrders).toBeDefined();
    expect(store.getState().feed).toBeDefined();    
  });
});