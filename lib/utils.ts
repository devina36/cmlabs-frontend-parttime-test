import { MealDetail, MealIngredient } from "./types";

// Utility: Extract ingredients from meal detail
export const extractIngredients = (meal: MealDetail): MealIngredient[] => {
  const result: MealIngredient[] = [];

  for (let index = 1; index <= 20; index++) {
    const ingredientKey = `strIngredient${index}` as keyof MealDetail;
    const measureKey = `strMeasure${index}` as keyof MealDetail;

    const ingredientValue = meal[ingredientKey];
    const measureValue = meal[measureKey];

    if (!ingredientValue?.trim()) continue;

    result.push({
      name: ingredientValue.trim(),
      measure: measureValue?.trim() || "",
    });
  }

  return result;
};
