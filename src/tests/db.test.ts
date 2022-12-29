import { Ingredient, Dish, Day } from '../interfaces'
import { expect, test } from '@jest/globals';
import differenceInDays from 'date-fns/differenceInDays'

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

test('days.json all dates sequentially correspond to index', () => {
  const days: Day[] = require('../db/days.json');
  days.forEach((day, i) => {
    expect(differenceInDays(new Date(day.date), new Date(days[0].date))).toEqual(i);
  })
});