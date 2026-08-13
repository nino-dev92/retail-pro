import type { Product } from "../../types/types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  filteredProducts: Product[];
  addToCart?: (product: Product) => void;
  showAddButton?: boolean;
};

export default function ProductsGrid({
  filteredProducts,
  addToCart,
  showAddButton = true,
}: ProductGridProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background dark:bg-on-surface">
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg font-semibold dark:text-surface">
            No products found
          </p>

          <p className="text-sm text-on-surface-variant dark:text-surface">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              showAddButton={showAddButton}
            />
          ))}
        </div>
      )}
    </div>
  );
}
