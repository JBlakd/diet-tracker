import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ingredient, Dish, MealTotals, Day, DayBreakdown } from './interfaces'
import { getIngredientTotals, getDishTotals } from './utils';
import DailyBreakdownBarChart from './DailyBreakdownBarChart';
import CSS from 'csstype';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

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

      // console.log("dishesResponse.data:", dishesResponse.data);

      setDays(daysResponse.data);
      setDishes(dishesResponse.data);
      setIngredients(ingredientsResponse.data);
    };

    fetchAllData().catch(console.error);
  }, [])

  useEffect(() => {
    const daysCopy = (new Array<Day>()).concat(days).reverse();
    setDaysBreakdown(daysCopy.map(d => getDayBreakdown(d, dishes, ingredients)));
  }, [days, dishes, ingredients])

  // console.log("ingredients:", ingredients);
  // console.log("dishes:", dishes);

  const chartContainerStyles: CSS.Properties = {
    height: '60vh',
    // width: '100vw',
  }

  return (
    <div className="App">
      <Container className="text-center">
        <Row>
          <Col><h1>Ivan's daily diet breakdown</h1></Col>
        </Row>
        <Row>
          <Col>
            <div style={chartContainerStyles}>
              <DailyBreakdownBarChart days={days} dishes={dishes} ingredients={ingredients} />
            </div>
          </Col>
        </Row>
        <Row className="fw-bold">
          <Col>Date</Col> <Col>KJ</Col> <Col>Protein (g)</Col> <Col>Fibre (g)</Col>
        </Row>
        {daysBreakdown.map(dbd => (
          <Row key={dbd.date.toString()}>
            <Col>{dbd.date.toString()}</Col> <Col>{Math.round(dbd.totalKj)}</Col> <Col>{Math.round(dbd.totalProtein)}</Col> <Col>{Math.round(dbd.totalFibre)}</Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default App;


