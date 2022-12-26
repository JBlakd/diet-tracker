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

interface Meal {
  id: string;
  name: string;
  ingredients: FoodAmount[];
  waterGrams: number;
}

interface Day {
  date: Date;
  meals: FoodAmount[];
}

function App() {
  const baseDbUrl: string = 'https://raw.githubusercontent.com/JBlakd/diet-tracker/main/src/db/';

  const [days, setDays] = useState<Day[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setDays((await axios.get(`${baseDbUrl}/days.json`)).data);
      setMeals((await axios.get(`${baseDbUrl}/meals.json`)).data);
      setIngredients((await axios.get(`${baseDbUrl}/ingredients.json`)).data);
    };

    fetchAllData().catch(console.error);
  }, [])

  return (
    <div className="App">
      {JSON.stringify(days)}
      <br></br>
      {JSON.stringify(meals)}
      <br></br>
      {JSON.stringify(ingredients)}
      <br></br>
    </div>
  );
}

export default App;
