"use client";

import Badge from "@/ui/Badge";

interface RecipeItemProps {
  ingredient: string;
  measure: string;
}

export default function RecipeItem({ ingredient, measure }: RecipeItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      <span className="text-gray-900 font-medium">{ingredient}</span>
      <Badge variant="secondary">{measure || "To taste"}</Badge>
    </div>
  );
}
