class FoodColourMap {
  private static instance: FoodColourMap;

  // qualitative colour to a bunch of HEX colours
  private immutableMap: Map<string, string[]> = new Map([
    ['grape', ['#483d8b', '#6a5acd', '#7b68ee', '#8470ff']],
    ['water', ['#4169e1', '#1e90ff', '#4682b4']],
    ['wheat', ['#ffc125', '#eead0e', '#ffd700']],
    ['tomato', ['#ee5c42', '#cd3700', '#ee4000', '#ee2c2c']],
    ['redMeat', ['#8b0000', '#8b2500', '#8b3626']],
    ['white', ['#f2f2f2', '#e8e8e8', '#fcfcfc',]],
    ['darkGreen', ['#2e8b57', '#548b54', '#008b45']]
  ]);

  // Whenever a particular colour is used, pop the last element  from the colours array
  // When a colours array is exhausted, generate a new one using the immutable array, using a randomised version of the original
  // https://sebhastian.com/shuffle-array-javascript/
  private mutableMap = new Map(this.immutableMap);

  private constructor() { }

  public static getInstance(): FoodColourMap {
    if (!FoodColourMap.instance) {
      FoodColourMap.instance = new FoodColourMap();
    }

    return FoodColourMap.instance;
  }


  public someBusinessLogic() {
  }
}

export default FoodColourMap;