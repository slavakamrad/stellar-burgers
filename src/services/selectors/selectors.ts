import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TIngredient, TOrder } from '@utils-types';
import { FeedState } from '../slices/feedSlice';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.ingredients;

export const selectBuns = createSelector(
  [selectIngredients],
  (ingredients): TIngredient[] =>
    ingredients.filter((ingredient) => ingredient.type === 'bun')
);

export const selectMains = createSelector(
  [selectIngredients],
  (ingredients): TIngredient[] =>
    ingredients.filter((ingredient) => ingredient.type === 'main')
);

export const selectSauces = createSelector(
  [selectIngredients],
  (ingredients): TIngredient[] =>
    ingredients.filter((ingredient) => ingredient.type === 'sauce')
);

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;

export const selectIngredientById = (
  state: RootState,
  id: string
): TIngredient | undefined =>
  state.ingredients.ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

export const selectIngredientsLoading = (state: RootState): boolean =>
  state.ingredients.loading;

export const selectIngredientsError = (state: RootState): string | null =>
  state.ingredients.error;

export const selectOrder = (state: RootState) => state.order.order;
export const selectCurrentOrder = (state: RootState): TOrder | null =>
  state.order.currentOrder;
export const selectOrderLoading = (state: RootState): boolean =>
  state.order.loading;
export const selectOrderError = (state: RootState): string | null =>
  state.order.error;

export const selectFeed = (state: { feed: FeedState }) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
export const selectFeedLoading = (state: { feed: FeedState }): boolean =>
  state.feed.loading;
export const sselectFeedError = (state: { feed: FeedState }): string | null =>
  state.feed.error;
