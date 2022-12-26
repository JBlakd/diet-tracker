import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const baseDbUrl = 'https://raw.githubusercontent.com/JBlakd/diet-tracker/main/src/db/';

  const [days, setDays] = useState([]);
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setDays((await axios.get(`${baseDbUrl}/days.json`)).data);
      setMeals((await axios.get(`${baseDbUrl}/meals.json`)).data);
      setIngredients((await axios.get(`${baseDbUrl}/ingredients.json`)).data);
    };

    fetchAllData().catch(console.error);
  }, [])

  return (
    <div>
      {JSON.stringify(days)}
      <br></br>
      {JSON.stringify(meals)}
      <br></br>
      {JSON.stringify(ingredients)}
      <br></br>
    </div>
  )
}

export default App;
