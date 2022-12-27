import { FoodId, Dish, Ingredient, Day, MealTotals } from "./interfaces"

const getFoodName = (food: FoodId, dishes: Dish[], ingredients: Ingredient[]): string => {
  return food.isIngredient ? ingredients[food.id].name : dishes[food.id].name;
}

const isFoodPresentInDay = (food: FoodId, day: Day): boolean => {
  day.meals.forEach(m => {
    if (m.id === food.id && m.isIngredient === food.isIngredient) {
      return true;
    }
  })

  return false
}

const getMealTotalsOfFoodInDay = (food: FoodId, day: Day, dishes: Dish[], ingredients: Ingredient[]): number => {
  let kj = 0;

  day.meals.forEach(m => {
    if (m.id === food.id && m.isIngredient === food.isIngredient) {
      const totals = food.isIngredient ? getIngredientTotals(m.g, ingredients[m.id]) : getDishTotals(m.g, dishes[m.id], ingredients);
      // console.log(`day ${day.date} meal ${totals.name} kj ${totals.kj}`);
      kj = totals.kj;
    }
  })

  return kj;
}


const getDishTotals = (grams: number, dish: Dish, ingredients: Ingredient[]): MealTotals => {
  let totals: MealTotals = {
    name: dish.name,
    kj: 0,
    protein: 0,
    fibre: 0,
    mass: dish.waterGrams,
    isIngredient: false
  }

  dish.ingredients.forEach(i => {
    const fullIngredient: Ingredient = ingredients[i.id];
    totals.kj += (i.g / 100) * fullIngredient.kjPer100Grams;
    totals.protein += (i.g / 100) * fullIngredient.proteinPer100Grams;
    totals.fibre += (i.g / 100) * fullIngredient.fibrePer100Grams;
    totals.mass += i.g;
  });

  // console.log(`grams for ${dish.name}: ${grams}`)
  // console.log('dish before mass scaling: ', totals);

  totals.kj *= (grams / totals.mass);
  totals.protein *= (grams / totals.mass);
  totals.fibre *= (grams / totals.mass);
  totals.mass = grams;

  return totals;
}

// get MealTotals of a given grams of ingredient
const getIngredientTotals = (grams: number, ingredient: Ingredient): MealTotals => {
  let totals: MealTotals = {
    name: ingredient.name,
    kj: 0,
    protein: 0,
    fibre: 0,
    mass: 0,
    isIngredient: true
  }

  totals.kj += (grams / 100) * ingredient.kjPer100Grams;
  totals.protein += (grams / 100) * ingredient.proteinPer100Grams;
  totals.fibre += (grams / 100) * ingredient.fibrePer100Grams;
  totals.mass += grams;

  return totals;
}

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export { getFoodName, isFoodPresentInDay, getIngredientTotals, getDishTotals, getMealTotalsOfFoodInDay, randomRGB };