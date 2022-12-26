import days from './db/days.json';
import ingredients from './db/ingredients.json';
import meals from './db/meals.json';

const App = () => {
  //const today = days.find(d => d.date === new Date().toISOString().split('T')[0]);

  //return JSON.stringify(days);

  return (
    <div>
      {JSON.stringify(days)}
      <br></br>
      <p1>the glorious restoration of the gh-pages branch</p1>
    </div>
  )
}

export default App;
