import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
}

interface Dish {
  id: string;
  name: string;
  ingredients: FoodAmount[];
  waterGrams: number;
}

interface DishTotals {
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

const getDishTotals = (dish: Dish, ingredients: Ingredient[]) => {
  let totals: DishTotals = {
    kj: 0,
    protein: 0,
    fibre: 0,
    mass: dish.waterGrams
  }

  dish.ingredients.forEach(i => {
    const fullIngredient: Ingredient = ingredients[i.id];
    totals.kj += (i.g / 100) * fullIngredient.kjPer100Grams;
    totals.protein += (i.g / 100) * fullIngredient.proteinPer100Grams;
    totals.fibre += (i.g / 100) * fullIngredient.fibrePer100Grams;
    totals.mass += i.g;
  });

  console.log(`${dish.name} has ${totals.kj} total kilojoules`)
  return totals;
}

const getDayBreakdown = (day: Day | undefined, dishes: Dish[], ingredients: Ingredient[]): DayBreakdown => {
  if (day === undefined || dishes.length === 0 || ingredients.length === 0) {
    return { date: new Date(), totalKj: 0, totalProtein: 0, totalFibre: 0 };
  }

  let kilojoulesForDay: number = 0;
  let proteinForDay: number = 0;
  let fibreForDay: number = 0;

  day.meals.forEach(m => {
    const curMealDishTotals = getDishTotals(dishes[m.id], ingredients);

    kilojoulesForDay += (m.g / curMealDishTotals.mass) * curMealDishTotals.kj;
    proteinForDay += (m.g / curMealDishTotals.mass) * curMealDishTotals.protein;
    fibreForDay += (m.g / curMealDishTotals.mass) * curMealDishTotals.fibre;
  })

  return {
    date: day.date,
    totalKj: kilojoulesForDay,
    totalProtein: proteinForDay,
    totalFibre: fibreForDay
  };
}

const App = () => {
  const baseDbUrl: string = 'https://raw.githubusercontent.com/JBlakd/diet-tracker/main/src/db/';

  const [days, setDays] = useState<Day[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [todayBreakdown, setTodayBreakdown] = useState<DayBreakdown>({ date: new Date(), totalKj: 0, totalProtein: 0, totalFibre: 0 });

  useEffect(() => {
    const fetchAllData = async () => {
      setDays((await axios.get(`${baseDbUrl}/days.json`)).data);
      setDishes((await axios.get(`${baseDbUrl}/dishes.json`)).data);
      setIngredients((await axios.get(`${baseDbUrl}/ingredients.json`)).data);
    };

    if (days.length === 0 || dishes.length === 0 || ingredients.length === 0) {
      fetchAllData().catch(console.error);
    }

    setTodayBreakdown(getDayBreakdown(days.at(-1), dishes, ingredients));

  }, [days, dishes, ingredients])

  return (
    <div className="App">
      <h1>Today's breakdown</h1>
      {JSON.stringify(todayBreakdown)}
    </div>
  );
}

export default App;
