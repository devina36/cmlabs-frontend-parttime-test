"use client";

import Badge from "@/ui/Badge";
import Image from "next/image";

interface MealHeaderProps {
    name: string;
    thumbnail: string;
    category?: string;
    area?: string;
}

export default function MealHeader({
    name,
    thumbnail,
    category,
    area,
}: MealHeaderProps) {
    return (
        <div className="mb-8">
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={thumbnail}
                    alt={name}
                    width={800}
                    height={600}
                    priority
                    className="object-cover w-full h-full"
                />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {name}
            </h1>

            <div className="flex flex-wrap gap-2">
                {category && <Badge variant="primary">{category}</Badge>}
                {area && <Badge variant="secondary">{area}</Badge>}
            </div>
        </div>
    );
}
