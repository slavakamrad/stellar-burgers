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

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );

      window.localStorage.setItem('accessToken', 'Bearer test-token');
      window.localStorage.setItem('refreshToken', 'test-refreshToken');

      cy.visit('/');
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
    });

    describe('Создание заказа', () => {
      beforeEach(() => {
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
          'createOrder'
        );
        cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
          'login'
        );
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
          'getUser'
        );
        cy.visit('/');
        cy.intercept('GET', 'api/ingredients', {
          fixture: 'ingredients.json'
        }).as('getIngredients');
        cy.wait('@getIngredients');
      });

      afterEach(() => {
        cy.clearLocalStorage();
      });

      it('Оформление заказа и отображение номера', () => {
        cy.get(selectors.ingredientCategoryBuns)
          .get(selectors.ingredientItem)
          .contains('Добавить')
          .click();

        cy.get(selectors.ingredientCategoryMains)
          .next('ul')
          .find(selectors.ingredientItem)
          .first()
          .find('button')
          .contains('Добавить')
          .click();

        cy.get(selectors.orderButton).click();

        cy.url().then((url) => {
          if (url.includes('/login')) {
            cy.get('input[type=email]').type('slavakamrad@megamail.com');
            cy.get('input[type=password]').type('password');
            cy.get('button[type=submit]').click();
            cy.wait('@login');
            cy.get(selectors.orderButton).click();
          }
        });

        cy.wait('@createOrder');

        cy.get(selectors.modal).should('exist');
        cy.get(selectors.modal).contains('90975');

        cy.get(selectors.modalClose).click();
        cy.get(selectors.modal).should('not.exist');

        cy.get(selectors.constructorBunTop).should('not.exist');
        cy.get(selectors.constructorIngredient).should('have.length', 0);
      });
    });
  });
});
