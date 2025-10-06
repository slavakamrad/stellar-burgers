import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';


const mockBun: TConstructorIngredient = {
  id: 'bun-1',
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

const mockMain: TConstructorIngredient = {
  id: '1',
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

const mockSauce: TConstructorIngredient = {
  id: '2',
  _id: "643d69a5c3f7b9001cfa0942",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
};

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
})
});