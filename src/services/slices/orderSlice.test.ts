import reducer, { createOrder, fetchOrderByNumber, clearOrder, clearCurrentOrder } from './orderSlice';
import { mockOrder } from './__mocks__/orders'
 

describe('test orderSlice', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null,
    currentOrder: null
  };

  test('createOrder.pending устанавливает loading', () => {
    const action = createOrder.pending('requestId', ['ing1', 'ing2']);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('createOrder.fulfilled устанавливает заказ', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = createOrder.fulfilled(mockOrder, 'requestId', ['ing1', 'ing2']);
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.order).toEqual(mockOrder);
  });

  test('createOrder.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = createOrder.rejected(
      { message: 'Ошибка' } as any,
      'requestId',
      ['ing1', 'ing2'],
      'Ошибка при создании заказа'
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка при создании заказа');
  });

  test('fetchOrderByNumber.pending устанавливает loading', () => {
    const action = fetchOrderByNumber.pending('requestId', 12345);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('fetchOrderByNumber.fulfilled устанавливает текущий заказ', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = fetchOrderByNumber.fulfilled(mockOrder, 'requestId', 12345);
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.currentOrder).toEqual(mockOrder);
  });

  test('fetchOrderByNumber.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = fetchOrderByNumber.rejected(
      { message: 'Ошибка' } as any,
      'requestId',
      12345,
      'Ошибка загрузки заказа'
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки заказа');
  });

  test('clearOrder очищает заказ и ошибку', () => {
    const stateWithOrder = { ...initialState, order: mockOrder, error: 'Ошибка' };
    const action = clearOrder();
    const result = reducer(stateWithOrder, action);
    expect(result.order).toBeNull();
    expect(result.error).toBeNull();
  });

  test('clearCurrentOrder очищает текущий заказ', () => {
    const stateWithCurrentOrder = { ...initialState, currentOrder: mockOrder };
    const action = clearCurrentOrder();
    const result = reducer(stateWithCurrentOrder, action);
    expect(result.currentOrder).toBeNull();
  });
});