class FoodColourMap {
  private static instance: FoodColourMap;

  // qualitative colour to a bunch of HEX colours
  private immutableMap: Map<string, string[]> = new Map([
    ['grape', ['#483d8b', '#6a5acd', '#7b68ee', '#8470ff']],
    ['water', ['#4169e1', '#1e90ff', '#4682b4']],
    ['wheat', ['#ffc125', '#eead0e', '#ffd700']],
    ['tomato', ['#ee5c42', '#cd3700', '#ee4000', '#ee2c2c']],
    ['redMeat', ['#8b0000', '#8b2500', '#8b3626']],
    ['white', ['#f2f2f2', '#e8e8e8', '#fcfcfc', '#f0f8ff']],
    ['darkGreen', ['#2e8b57', '#548b54', '#008b45']],
    ['orange', ['#ff8c00', '#ff7f00', '#ee7600']],
    ['brown', ['#8b4726', '#a0522d', '#8b5a2b', '#8b7355']],
    ['beige', ['#faebd7', '#ffefdb', '#ffe4c4', '#ffebcd']]
  ]);

  // private mutableMap: Map<string, string[]>;

  private constructor() {
    // this.mutableMap = new Map(this.immutableMap);
  }

  public static getInstance(): FoodColourMap {
    if (!FoodColourMap.instance) {
      FoodColourMap.instance = new FoodColourMap();
    }

    return FoodColourMap.instance;
  }

  // Whenever a particular colour is used, pop the last element  from the colours array
  // When a colours array is exhausted, generate a new one using the immutable array, using a randomised version of the original
  public getFoodColour(qualitativeColour: string): string {
    // console.log(`mutablemap has ${qualitativeColour}: ${this.mutableMap.has(qualitativeColour)}`);
    // console.log(`immutablemap has ${qualitativeColour}: ${this.immutableMap.has(qualitativeColour)}`);
    if (qualitativeColour === undefined || !this.immutableMap.has(qualitativeColour)) {
      // console.log(`from ${qualitativeColour} generated #00FFFFFF`);
      return '#00FFFFFF'; // transparent
    }

    const colourArray = this.immutableMap.get(qualitativeColour)!;
    const retVal: string = colourArray[Math.floor(Math.random() * colourArray.length)];
    // if (this.mutableMap.get(qualitativeColour)!.length === 0) {
    //   // repopulate mutableMap's depleted array with a randomised one from immutableMap
    //   this.mutableMap.set(qualitativeColour, this.immutableMap.get(qualitativeColour)!.sort(() => Math.random() - 0.5));
    // }

    // console.log(`from ${qualitativeColour} generated ${retVal}`);

    return retVal;
  }
}

export default FoodColourMap;