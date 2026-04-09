import { Ingredient, Meal, ListResponse, LookupResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all ingredients
export const fetchIngredients = async (): Promise<Ingredient[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
        if (!response.ok) throw new Error("Failed to fetch ingredients");
        const data: ListResponse<Ingredient> = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        throw error;
    }
};

// Fetch meals by ingredient
export const fetchMealsByIngredient = async (
    ingredientName: string,
): Promise<Meal[]> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredientName)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch meals");
        const data: LookupResponse = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error fetching meals by ingredient:", error);
        throw error;
    }
};

// Fetch meal detail by ID
export const fetchMealDetail = async (mealId: string): Promise<Meal | null> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch meal detail");
        const data: LookupResponse = await response.json();
        return data.meals?.[0] || null;
    } catch (error) {
        console.error("Error fetching meal detail:", error);
        throw error;
    }
};
