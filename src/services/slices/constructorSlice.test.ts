import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { mockBun, mockMain, mockSauce } from './__mocks__/burgerConstructor';


const initialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};
describe('тесты для burgerConstructor', () => {
  test('добавляет ингредиент', () => {
    const action = addIngredient(mockMain);
    const result = reducer(initialState, action);

    expect(result.constructorItems.ingredients).toHaveLength(1);
    expect(result.constructorItems.ingredients[0]).toEqual(mockMain);
  });

  test('удаляет ингредиент по id', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockMain, mockSauce]
      }
    };

    const action = removeIngredient('1');
    const result = reducer(stateWithIngredients, action);

    expect(result.constructorItems.ingredients).toHaveLength(1);
    expect(result.constructorItems.ingredients[0].id).toBe('2');
  });

  test('меняет порядок ингредиентов', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockMain, mockSauce]
      }
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const result = reducer(stateWithIngredients, action);

    expect(result.constructorItems.ingredients[0]).toEqual(mockSauce);
    expect(result.constructorItems.ingredients[1]).toEqual(mockMain);
  });
});
