"use client";

import Image from "next/image";

interface MealCardProps {
  name: string;
  image?: string;
  onClick: () => void;
  className?: string;
  imageFit?: "cover" | "contain";
}

export default function MealCard({ name, image, onClick, className = "", imageFit = "contain" }: MealCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-40 rounded-lg overflow-hidden cursor-pointer group ${className}`}
    >
      {image && (
        <Image
          src={image}
          alt={name}
          className={`static w-full h-full group-hover:scale-120 transition-transform duration-300 ${imageFit === "cover" ? "object-cover" : "object-contain"}`}
          width={200}
          height={200}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center bg-black/50 text-white">
        <h3 className="font-semibold text-white text-center group-hover:underline">{name}</h3>
      </div>
    </div>
  );
}
