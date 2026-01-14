import { useState, useEffect } from "react";

interface Product {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface CatalogueDisplayProps {
  category: string | null;
}

export function CatalogueDisplay({ category }: CatalogueDisplayProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = category ? `/catalogue/?category=${encodeURIComponent(category)}` : "/catalogue/";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f3d5a3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-400 text-center">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-[#fbf0df]/60">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={`${product.title}-${product.category}`}
          className="bg-[#1a1a1a]/30 rounded-xl border border-[#fbf0df]/10 overflow-hidden hover:border-[#f3d5a3]/30 transition-colors duration-300"
        >
          <div className="aspect-square bg-[#fbf0df]/10 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23333'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-[#fbf0df]">{product.title}</h3>
            <p className="text-sm text-[#fbf0df]/80 mb-3">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-[#f3d5a3]/20 text-[#f3d5a3] text-xs rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
