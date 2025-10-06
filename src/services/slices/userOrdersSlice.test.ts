import reducer, { fetchUserOrders, clearUserOrders, setUserOrdersLoading } from './userOrdersSlice';
import { mockOrders } from './__mocks__/orders'


describe('userOrders slice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  test('fetchUserOrders.pending устанавливает loading', () => {
    const action = fetchUserOrders.pending('requestId');
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('fetchUserOrders.fulfilled устанавливает заказы', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = fetchUserOrders.fulfilled(mockOrders, 'requestId');
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
  });

  test('fetchUserOrders.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = fetchUserOrders.rejected(
      { message: 'Ошибка' } as any,
      'requestId',
      undefined,
      'Ошибка загрузки заказов пользователя'
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки заказов пользователя');
  });

  test('clearUserOrders очищает заказы и ошибку', () => {
    const stateWithOrders = { ...initialState, orders: mockOrders, error: 'Ошибка' };
    const action = clearUserOrders();
    const result = reducer(stateWithOrders, action);
    expect(result.orders).toEqual([]);
    expect(result.error).toBeNull();
  });

  test('setUserOrdersLoading устанавливает loading', () => {
    const action = setUserOrdersLoading(true);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
  });
});