import { useState } from "react";
import { CategorySelector } from "./components/CategorySelector";
import { CatalogueDisplay } from "./components/CatalogueDisplay";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-4 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
        />
      </div>

      <h1 className="text-4xl font-bold my-4 leading-tight">Catalogue Platform</h1>
      <p className="text-lg text-[#fbf0df]/80 mb-8">
        Browse products by category
      </p>

      <div className="w-full max-w-6xl mx-auto">
        <CategorySelector
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <div className="mt-8">
          <CatalogueDisplay category={selectedCategory || ""} />
        </div>
      </div>
    </div>
  );
}

export default App;
