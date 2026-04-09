"use client";

import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import MealCard from "./MealCard";
import Spinner from "@/ui/Loading";
import ErrorMessage from "@/ui/ErrorMessage";
import { Meal } from "@/lib/types";
import Loading from "@/ui/Loading";

interface MealListProps {
    meals: Meal[];
    isLoading: boolean;
    error: string | null;
    onSelectMeal: (id: string) => void;
    onRetry?: () => void;
}

export default function MealList({
    meals,
    isLoading,
    error,
    onSelectMeal,
    onRetry,
}: MealListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMeals = useMemo(() => {
        return meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [meals, searchQuery]);

    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    return (
        <div>
            <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search meals..."
            />

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loading />
                </div>
            ) : filteredMeals.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {searchQuery ? "No meals found" : "No meals available"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMeals.map((meal) => (
                        <MealCard
                            key={meal.idMeal}
                            name={meal.strMeal}
                            image={meal.strMealThumb}
                            onClick={() => onSelectMeal(meal.idMeal)}
                            className="h-50!"
                            imageFit="cover"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
