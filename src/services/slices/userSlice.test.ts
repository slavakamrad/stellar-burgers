import reducer, {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logout,
  setUser,
  clearUser,
  setAuthChecked
} from './userSlice';
import {
  mockUser,
  mockLoginData,
  mockRegisterData,
  mockUpdateData
} from './__mocks__/user';

describe('тесты для userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  test('setUser устанавливает пользователя', () => {
    const action = setUser(mockUser);
    const result = reducer(initialState, action);
    expect(result.user).toEqual(mockUser);
  });

  test('clearUser очищает пользователя', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = clearUser();
    const result = reducer(stateWithUser, action);
    expect(result.user).toBeNull();
  });

  test('setAuthChecked устанавливает проверку авторизации', () => {
    const action = setAuthChecked();
    const result = reducer(initialState, action);
    expect(result.isAuthChecked).toBe(true);
  });

  test('loginUser.pending устанавливает loading', () => {
    const action = loginUser.pending('requestId', mockLoginData);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  test('loginUser.fulfilled устанавливает пользователя', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = loginUser.fulfilled(mockUser, 'requestId', mockLoginData);
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.user).toEqual(mockUser);
  });

  test('loginUser.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = loginUser.rejected(
      new Error('Ошибка'),
      'requestId',
      mockLoginData
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка');
  });

  test('registerUser.pending устанавливает loading', () => {
    const action = registerUser.pending('requestId', mockRegisterData);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  test('getUser.fulfilled устанавливает пользователя и проверку авторизации', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = getUser.fulfilled(mockUser, 'requestId');
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  test('updateUser.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = updateUser.rejected(
      new Error('Ошибка'),
      'requestId',
      mockUpdateData
    );
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка');
  });

  test('logout.fulfilled очищает пользователя', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = logout.fulfilled(undefined, 'requestId');
    const result = reducer(stateWithUser, action);
    expect(result.user).toBeNull();
  });
});
