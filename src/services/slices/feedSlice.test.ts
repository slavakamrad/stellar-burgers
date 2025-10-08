import { mockFeedData } from './__mocks__/feed';
import reducer, { getFeeds, clearFeed } from './feedSlice';


describe('тесты для feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('getFeeds.pending устанавливает loading', () => {
    const action = getFeeds.pending('requestId');
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('getFeeds.fulfilled устанавливает данные фида', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = getFeeds.fulfilled(mockFeedData, 'requestId');
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual(mockFeedData.orders);
    expect(result.total).toBe(100);
    expect(result.totalToday).toBe(10);
  });

  test('getFeeds.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = getFeeds.rejected(
      { message: 'Ошибка' } as any,
      'requestId',
      undefined,
      'Ошибка загрузки ленты заказов'
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки ленты заказов');
  });

  test('clearFeed очищает данные фида', () => {
    const stateWithData = { 
      ...initialState, 
      orders: mockFeedData.orders,
      total: mockFeedData.total,
      totalToday: mockFeedData.totalToday
    };
    const action = clearFeed();
    const result = reducer(stateWithData, action);
    expect(result.orders).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalToday).toBe(0);
  });
});