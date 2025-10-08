import reducer, { fetchIngredients } from './ingridientsSlice';
import { mockBun, mockMain, mockSauce } from './__mocks__/burgerConstructor';

const mockIngredients = [mockBun, mockMain, mockSauce];

describe('тесты для ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  test('fetchIngredients.pending устанавливает loading', () => {
    const action = fetchIngredients.pending('requestId');
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('fetchIngredients.fulfilled устанавливает ингредиенты', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = fetchIngredients.fulfilled(mockIngredients, 'requestId');
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.ingredients).toEqual(mockIngredients);
  });

  test('fetchIngredients.rejected устанавливает ошибку', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const action = {
      type: 'ingredients/fetchIngredients/rejected',
      payload: 'Failed to fetch ingredients',
      error: { message: 'Rejected' }
    };
    const result = reducer(stateWithLoading, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Failed to fetch ingredients');
  });
});
