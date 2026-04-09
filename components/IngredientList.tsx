"use client";

import {
    useState,
    useMemo,
    useEffect,
    useRef,
    useCallback,
    useEffectEvent,
} from "react";
import SearchBar from "./SearchBar";
import ErrorMessage from "@/ui/ErrorMessage";
import { Ingredient } from "@/lib/types";
import Loading from "@/ui/Loading";
import MealCard from "./MealCard";

const PAGE_SIZE = 15;

interface IngredientListProps {
    ingredients: Ingredient[];
    isLoading: boolean;
    error: string | null;
    onSelectIngredient: (name: string) => void;
    onRetry?: () => void;
}

export default function IngredientList({
    ingredients,
    isLoading,
    error,
    onSelectIngredient,
    onRetry,
}: IngredientListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const filteredIngredients = useMemo(() => {
        return ingredients.filter((ing) =>
            ing.strIngredient.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [ingredients, searchQuery]);

    const countQuaryChange = useEffectEvent(() => {
        setVisibleCount(PAGE_SIZE);
    });
    // Reset visible count setiap kali search query berubah
    useEffect(() => {
        countQuaryChange();
    }, [searchQuery]);

    const visibleIngredients = useMemo(() => {
        return filteredIngredients.slice(0, visibleCount);
    }, [filteredIngredients, visibleCount]);

    const hasMore = visibleCount < filteredIngredients.length;

    const loadMore = useCallback(() => {
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        const timer = setTimeout(() => {
            setVisibleCount((prev) => prev + PAGE_SIZE);
            setIsLoadingMore(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [isLoadingMore]);

    // Intersection Observer untuk trigger load more
    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore, loadMore]);

    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    return (
        <div>
            <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search ingredients..."
            />

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loading />
                </div>
            ) : filteredIngredients.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {searchQuery
                            ? "No ingredients found"
                            : "No ingredients available"}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {visibleIngredients.map((ingredient) => (
                            <MealCard
                                key={ingredient.idIngredient}
                                name={ingredient.strIngredient}
                                image={ingredient.strThumb}
                                onClick={() =>
                                    onSelectIngredient(ingredient.strIngredient)
                                }
                            />
                        ))}
                    </div>

                    {/* Loading spinner saat fetch batch berikutnya */}
                    {isLoadingMore && (
                        <div className="flex justify-center py-8">
                            <Loading />
                        </div>
                    )}

                    {/* Sentinel element untuk Intersection Observer */}
                    {hasMore && !isLoadingMore && (
                        <div
                            ref={loaderRef}
                            className="flex justify-center py-1"
                        />
                    )}
                </>
            )}
        </div>
    );
}
