interface Ingredient {
  id: number;
  name: string;
  description: string;
  kjPer100Grams: number;
  proteinPer100Grams: number;
  fibrePer100Grams: number;
  foodColour: string;
}

interface FoodAmount {
  id: number;
  g: number;
  isIngredient: boolean;
  date?: Date;
}

interface FoodId {
  id: number;
  isIngredient: boolean;
}

interface Dish {
  id: string;
  name: string;
  ingredients: FoodAmount[];
  waterGrams: number;
  foodColour: string;
}

interface MealTotals {
  name: string;
  kj: number;
  protein: number;
  fibre: number;
  mass: number;
  isIngredient: boolean;
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

export type { Ingredient, FoodAmount, FoodId, Dish, MealTotals, Day, DayBreakdown }