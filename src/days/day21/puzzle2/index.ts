interface Allergen {
  name: string;
  possibleIngredients: Array<string>;
}

interface Ingredient {
  name: string;
  count: number;
}

interface FoodData {
  ingredients: Array<Ingredient>;
  allergens: Array<Allergen>;
}

const removeDuplicates = (a: Array<string>) =>
  [...new Set(a)];

const intersect = (a: Array<string>, b: Array<string>): Array<string> =>
  a.filter(elem => b.includes(elem));

export const mergeAllergens = (
  allergens: Array<Allergen>,
  newAllergens: Array<Allergen>
): void => {
  for (const newAllergen of newAllergens) {
    const existingAllergen = allergens.find(i => i.name === newAllergen.name);
    if (existingAllergen) {
      existingAllergen.possibleIngredients =
        intersect(existingAllergen.possibleIngredients, newAllergen.possibleIngredients);
    } else {
      allergens.push(newAllergen);
    }
  }
};

export const parseData = (data: Array<string>): FoodData => {
  const regex = /^(.+) \(contains (.+)\)$/;
  const ingredients: Array<string> = [];
  const allergens: Array<Allergen> = [];

  for (const foodData of data) {
    const matches = foodData.match(regex);
    if (!matches) {
      throw new Error(`Invalid food data: ${foodData}`);
    }
    const ingredientNames = matches[1].split(" ");
    const allergenNames = matches[2].split(", ");
    ingredientNames.forEach(name => ingredients.push(name));
    const newAllergens: Array<Allergen> = allergenNames.map(name => ({
      name,
      possibleIngredients: [...ingredientNames]
    }))

    mergeAllergens(allergens, newAllergens);
  }

  const ingredientCounts = ingredients.reduce((acc: Array<Ingredient>, name) => {
    const existingIngredient = acc.find(i => i.name === name);
    if (existingIngredient) {
      existingIngredient.count++;
    } else {
      acc.push({ name, count: 1 });
    }
    return acc;
  }, []);

  return {
    ingredients: ingredientCounts,
    allergens
  };
};

const stripKnownIngredients = (allergens: Array<Allergen>): void => {
  const processedIngredientNames = new Set<string>();

  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i < allergens.length; i++) {
      const allergen = allergens[i];
      if (
        allergen.possibleIngredients.length === 1 &&
        !processedIngredientNames.has(allergen.possibleIngredients[0])
      ) {
        const ingredientName = allergen.possibleIngredients[0];
        processedIngredientNames.add(ingredientName);
        hasChanged = true;
        for (let j = 0; j < allergens.length; j++) {
          if (j !== i) {
            allergens[j].possibleIngredients = allergens[j].possibleIngredients.filter(i => i !== ingredientName);
          }
        }
        break;
      }
    }
  }
};

const solution = (data: Array<string>): string => {
  const foodData = parseData(data);
  stripKnownIngredients(foodData.allergens);
  foodData.allergens.sort((a, b) => a.name < b.name ? -1 : 1);
  const allergenIngredients = foodData.allergens.map(a => a.possibleIngredients[0]);
  return `${allergenIngredients.join(",")}`;
};

export default solution;
