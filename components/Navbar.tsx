"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
            <span className="text-accent">mealapp</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-accent hover:underline py-2 rounded-md transition-colors">
              Home
            </Link>
            <Link href="/ingredients" className="hover:text-accent hover:underline py-2 rounded-md transition-colors">
              Ingredients
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-blue-700 rounded-md">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/ingredients"
              className="block hover:text-accent hover:underline px-3 py-2 rounded-md transition-colors"
            >
              Ingredients
            </Link>
            <Link href="/" className="block hover:text-accent hover:underline px-3 py-2 rounded-md transition-colors">
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
