"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MealList from "@/components/MealList";
import { fetchMealsByIngredient } from "@/lib/api";
import { Meal } from "@/lib/types";
import Breadcrumb from "@/ui/BreadCrumb";

export default function IngredientDetailPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const ingredientName = params?.name ? decodeURIComponent(params.name as string) : "";

  useEffect(() => {
    if (ingredientName) {
      loadMeals();
    }
  }, [ingredientName]);

  const loadMeals = async () => {
    if (!ingredientName) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMealsByIngredient(ingredientName);
      setMeals(data);
    } catch (err) {
      setError(`Failed to load meals with ${ingredientName}. Please try again.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMeal = (id: string) => {
    router.push(`/meals/${id}?ingredient=${ingredientName}`);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Ingredients", href: "/ingredients" },
              { label: ingredientName },
            ]}
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Meals with {ingredientName}</h1>
        <p className="text-gray-600">Discover delicious recipes that feature {ingredientName}</p>
      </div>

      <MealList meals={meals} isLoading={isLoading} error={error} onSelectMeal={handleSelectMeal} onRetry={loadMeals} />
    </div>
  );
}
