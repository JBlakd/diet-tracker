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
import { Day, Dish, Ingredient, FoodId, FoodAmount } from './interfaces';
import { getFoodName, getMealTotalsOfFoodInDay, randomRGB } from './utils';
import differenceInDays from 'date-fns/differenceInDays'

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
  let allFoodAmounts: FoodAmount[] = [];
  days.forEach(d => {
    d.meals.forEach(m => {
      m.date = d.date;
      allFoodAmounts.push(m);
    })
  });

  console.log('allFoodAmounts: ', allFoodAmounts);

  const datasets = allFoodAmounts.map(fa => {
    // dailyData should have same length as the number of days == labels.length
    // dailyData should contain the nuumber of kilojoules for that FoodAmount eaten on that day 
    let dailyData = new Array(days.length).fill(0);
    const curFaDaysIndex = fa.date ? differenceInDays(new Date(fa.date), new Date(days[0].date)) : -1;
    dailyData[curFaDaysIndex] = getMealTotalsOfFoodInDay(fa, days[curFaDaysIndex], dishes, ingredients);
    // console.log('dailydata:', dailyData);
    return {
      label: getFoodName(fa, dishes, ingredients),
      data: dailyData.map(dd => dd.kj),
      backgroundColor: randomRGB()
    };
  });

  // console.log('datasets: ', datasets);

  const data = {
    labels: days.map(d => d.date),
    // datasets should have same length as allFoodAmounts
    datasets: datasets
  }

  return <Bar options={options} data={data} />
};

export default DailyBreakdownBarChart;