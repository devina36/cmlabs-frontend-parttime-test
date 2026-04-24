"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchIngredients } from "@/lib/api";
import { Ingredient } from "@/lib/types";
import { FiArrowRight } from "react-icons/fi";
import { BiSolidBowlHot, BiSolidBowlRice, BiSolidCookie } from "react-icons/bi";
import Image from "next/image";
import Loading from "@/ui/Loading";
import MealCard from "@/components/MealCard";

export default function Home() {
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
      setIngredients(data.slice(0, 8));
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
      <div className="text-center pb-12">
        <div className="relative w-full h-80 md:h-100 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Meal Image"
            className="w-full h-full static object-cover rounded-lg"
            width={400}
            height={400}
          />

          <div className="absolute top-0 w-full h-full flex flex-col gap-4 items-center justify-center bg-black/40 text-white p-4">
            <div className="flex gap-6 text-accent justify-center items-center">
              <BiSolidBowlHot size={24} />
              <BiSolidBowlRice size={24} />
              <BiSolidCookie size={24} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-90">Discover Delicious Meals</h1>
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto">
              Explore thousands of recipes by selecting your favorite ingredients. Find your next culinary adventure
              today!
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Ingredients</h2>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={loadIngredients}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-5">
            <Loading />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {ingredients.map((ingredient) => (
                <MealCard
                  key={ingredient.idIngredient}
                  name={ingredient.strIngredient}
                  image={ingredient.strThumb}
                  onClick={() => handleSelectIngredient(ingredient.strIngredient)}
                />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/ingredients"
                className="inline-flex items-center gap-2 px-4 py-3 bg-transparent text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                View All Ingredients
                <FiArrowRight size={20} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
