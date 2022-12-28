import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ingredient, Dish, MealTotals, Day, DayBreakdown } from './interfaces'
import { getIngredientTotals, getDishTotals } from './utils';
import DailyBreakdownBarChart from './DailyBreakdownBarChart';
import CSS from 'csstype';

const getDayBreakdown = (day: Day | undefined, dishes: Dish[], ingredients: Ingredient[]): DayBreakdown => {
  if (day === undefined || dishes.length === 0 || ingredients.length === 0) {
    return { date: new Date(), totalKj: 0, totalProtein: 0, totalFibre: 0 };
  }

  let kilojoulesForDay: number = 0;
  let proteinForDay: number = 0;
  let fibreForDay: number = 0;

  day.meals.forEach(m => {
    const curMealTotals: MealTotals = m.isIngredient ? getIngredientTotals(m.g, ingredients[m.id]) : getDishTotals(m.g, dishes[m.id], ingredients);

    // console.log(curMealTotals);

    kilojoulesForDay += curMealTotals.kj;
    proteinForDay += curMealTotals.protein;
    fibreForDay += curMealTotals.fibre;
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
  const [daysBreakdown, setDaysBreakdown] = useState<DayBreakdown[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const [daysResponse, dishesResponse, ingredientsResponse] = await axios.all([
        axios.get(`${baseDbUrl}/days.json`),
        axios.get(`${baseDbUrl}/dishes.json`),
        axios.get(`${baseDbUrl}/ingredients.json`)
      ]);

      setDays(daysResponse.data);
      setDishes(dishesResponse.data);
      setIngredients(ingredientsResponse.data);
    };

    fetchAllData().catch(console.error);
  }, [])

  useEffect(() => {
    setDaysBreakdown(days.map(d => getDayBreakdown(d, dishes, ingredients)));
  }, [days, dishes, ingredients])

  console.log("days:", days);

  const chartContainerStyles: CSS.Properties = {
    padding: '2rem',
    height: '50vh',
    width: '80vw',
  }

  return (
    <div className="App">
      <h1>Daily diet breakdown</h1>
      <div style={chartContainerStyles}>
        <DailyBreakdownBarChart days={days} dishes={dishes} ingredients={ingredients} />
      </div>
      {daysBreakdown.map(dbd => <div key={dbd.date.toString()}>{JSON.stringify(dbd)}<br></br></div>)}
    </div>
  );
}

export default App;
