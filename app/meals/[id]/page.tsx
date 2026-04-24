"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import MealHeader from "@/components/MealHeader";
import RecipeItem from "@/components/RecipeItem";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ErrorMessage from "@/ui/ErrorMessage";
import { fetchMealDetail } from "@/lib/api";
import { Meal, MealDetail } from "@/lib/types";
import Loading from "@/ui/Loading";
import { extractIngredients } from "@/lib/utils";
import Breadcrumb from "@/ui/BreadCrumb";

export default function MealDetailPage() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const mealId = params?.id as string;

  const searchParams = useSearchParams();
  const ingredientName = searchParams.get("ingredient");

  useEffect(() => {
    if (mealId) {
      loadMeal();
    }
  }, [mealId]);

  const loadMeal = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMealDetail(mealId);
      if (!data) {
        setError("Meal not found");
        return;
      }
      setMeal(data);
    } catch (err) {
      setError("Failed to load meal details. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadMeal} />;
  }

  if (!meal) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Meal not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const ingredients = extractIngredients(meal as MealDetail);

  return (
    <div>
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Ingredients", href: "/ingredients" },
            {
              label: ingredientName || "",
              href: `/ingredients/${ingredientName || ""}`,
            },
            { label: meal.strMeal },
          ]}
        />
      </div>

      <MealHeader name={meal.strMeal} thumbnail={meal.strMealThumb} category={meal.strCategory} area={meal.strArea} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Instructions</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{meal.strInstructions}</p>
          </div>

          {/* YouTube Video */}
          {meal.strYoutube && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎥 Video Tutorial</h2>
              <YouTubeEmbed url={meal.strYoutube} />
            </div>
          )}
        </div>

        {/* Right: Ingredients */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <div className="space-y-0">
              {ingredients.map((ingredient, index) => (
                <RecipeItem key={index} ingredient={ingredient.name} measure={ingredient.measure} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
