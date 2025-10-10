describe('тесты для Burger constructor', () => {
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

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
  });

  describe('тесты модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(selectors.ingredientCategoryBuns)
        .find(selectors.ingredientItem)
        .first()
        .click();
      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modal).contains('Краторная булка N-200i');
      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');
    });
  });
});
