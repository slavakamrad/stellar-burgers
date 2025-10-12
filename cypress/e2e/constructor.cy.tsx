const selectors = {
  ingredientCategoryBuns: '[data-cy=ingredient-category-buns]',
  ingredientCategoryMains: '[data-cy=ingredient-category-mains]',
  ingredientCategorySauces: '[data-cy=ingredient-category-sauces]',
  ingredientItem: '[data-cy=ingredient-item]',
  ingredientAddButton: 'button:contains("Добавить")',
  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',
  constructorIngredient: '[data-cy=constructor-ingredient]',
  modal: '[data-cy=modal]',
  modalClose: '[data-cy=modal-close]',
  modalOverlay: '[data-cy=modal-overlay]',
  orderButton: '[data-cy=order-button]'
};

describe('тесты для Burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
  });

  describe('тест добавления ингредиентов', () => {
    it('Добавление булки в конструктор', () => {
      cy.get(selectors.ingredientCategoryBuns)
        .get(selectors.ingredientItem)
        .contains('Добавить')
        .click();
      cy.get(selectors.constructorBunTop).should('exist');
      cy.get(selectors.constructorBunBottom).should('exist');
    });

    it('Добавление ингредиента в конструктор', () => {
      cy.get(selectors.ingredientCategoryMains)
        .next('ul')
        .find(selectors.ingredientItem)
        .first()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get(selectors.constructorIngredient).should('exist');
    });

    it('Добавление соуса в конструктор', () => {
      cy.get(selectors.ingredientCategorySauces)
        .next('ul')
        .find(selectors.ingredientItem)
        .first()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get(selectors.constructorIngredient).should('exist');
    });
  });

  describe('тесты модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(selectors.ingredientCategoryBuns)
        .get(selectors.ingredientItem)
        .eq(0)
        .click();
      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modal).contains('Краторная булка N-200i');
      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');
    });
  });
});
