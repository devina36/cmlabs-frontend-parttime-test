"use client";

import { useState, useCallback, useEffect } from "react";
import Input from "@/ui/Input";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    debounceMs?: number;
}

export default function SearchBar({
    onSearch,
    placeholder = "Search...",
    debounceMs = 300,
}: SearchBarProps) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [query, onSearch, debounceMs]);

    return (
        <div className="w-full mb-6">
            <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={<FiSearch size={20} />}
            />
        </div>
    );
}
