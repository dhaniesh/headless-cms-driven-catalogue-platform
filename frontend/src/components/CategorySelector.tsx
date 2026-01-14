import { useState, useEffect } from "react";

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}

export function CategorySelector({ onCategorySelect, selectedCategory }: CategorySelectorProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/category/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#f3d5a3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-[#1a1a1a]/50 rounded-xl border border-[#fbf0df]/20">
      <button
        key="all"
        onClick={() => onCategorySelect("")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedCategory === ""
            ? "bg-[#f3d5a3] text-[#1a1a1a]"
            : "bg-[#fbf0df]/10 text-[#fbf0df] hover:bg-[#fbf0df]/20"
        }`}
      >
        All Categories
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            selectedCategory === category
              ? "bg-[#f3d5a3] text-[#1a1a1a]"
              : "bg-[#fbf0df]/10 text-[#fbf0df] hover:bg-[#fbf0df]/20"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
