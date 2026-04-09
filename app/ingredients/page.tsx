"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import IngredientList from "@/components/IngredientList";
import Breadcrumb from "@/ui/BreadCrumb";
import { fetchIngredients } from "@/lib/api";
import { Ingredient } from "@/lib/types";

export default function IngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        loadIngredients();
    }, []);

    const loadIngredients = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchIngredients();
            setIngredients(data);
        } catch (err) {
            setError("Failed to load ingredients. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectIngredient = (name: string) => {
        router.push(`/ingredients/${encodeURIComponent(name)}`);
    };

    return (
        <div>
            <div className="mb-6">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Ingredients" },
                    ]}
                />
                <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">
                    Ingredients
                </h1>
                <p className="text-gray-600">
                    Browse all available ingredients and discover delicious
                    meals
                </p>
            </div>

            <IngredientList
                ingredients={ingredients}
                isLoading={isLoading}
                error={error}
                onSelectIngredient={handleSelectIngredient}
                onRetry={loadIngredients}
            />
        </div>
    );
}
