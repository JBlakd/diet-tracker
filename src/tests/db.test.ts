import { Ingredient, Dish } from '../interfaces'
import { expect, test } from '@jest/globals';

test('dishes.json all id correspond to index', () => {
  const dishes: Dish[] = require('../db/dishes.json');
  dishes.forEach((dish, i) => {
    expect(dish.id).toEqual(i);
  })
});

test('ingredients.json all id correspond to index', () => {
  const ingredients: Ingredient[] = require('../db/ingredients.json');
  ingredients.forEach((ingredient, i) => {
    expect(ingredient.id).toEqual(i);
  })
});
