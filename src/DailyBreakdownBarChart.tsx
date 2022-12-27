import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Day, Dish, Ingredient, FoodId } from './interfaces';
import { getFoodName, getMealTotalsOfFoodInDay, randomRGB } from './utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
    legend: {
      display: false
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const DailyBreakdownBarChart = ({ days, dishes, ingredients }: { days: Day[], dishes: Dish[], ingredients: Ingredient[] }) => {
  let allFoodIds = new Set<FoodId>();
  days.forEach(d => {
    d.meals.forEach(m => {
      allFoodIds.add({ id: m.id, isIngredient: m.isIngredient } as FoodId);
    })
  });

  const data = {
    labels: days.map(d => {
      // console.log('date: ', d.date);
      return d.date;
    }),
    // TODO fix same food on same day with different masses always having same kj
    datasets: Array.from(allFoodIds).map(fi => {
      const dailyData = days.map(d => getMealTotalsOfFoodInDay(fi, d, dishes, ingredients));

      return {
        label: getFoodName(fi, dishes, ingredients),
        data: dailyData,
        backgroundColor: randomRGB()
      };
    })
  }

  return <Bar options={options} data={data} />
};

export default DailyBreakdownBarChart;