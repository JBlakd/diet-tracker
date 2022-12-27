interface Ingredient {
  id: number;
  name: string;
  description: string;
  kjPer100Grams: number;
  proteinPer100Grams: number;
  fibrePer100Grams: number;
}

interface FoodAmount {
  id: number;
  g: number;
  isIngredient: boolean;
}

interface Dish {
  id: string;
  name: string;
  ingredients: FoodAmount[];
  waterGrams: number;
}

interface MealTotals {
  kj: number;
  protein: number;
  fibre: number;
  mass: number;
}

interface Day {
  date: Date;
  meals: FoodAmount[];
}

interface DayBreakdown {
  date: Date;
  totalKj: number;
  totalProtein: number;
  totalFibre: number;
}

export type { Ingredient, FoodAmount, Dish, MealTotals, Day, DayBreakdown }