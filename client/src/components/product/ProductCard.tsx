import type { Product } from "../../types/types";

interface ProductCardProps {
  product: Product;
  addToCart?: (product: Product) => void;
  showAddButton?: boolean;
}

export default function ProductCard({
  product,
  addToCart,
  showAddButton = false,
}: ProductCardProps) {
  return (
    <div className="bg-surface dark:bg-primary border border-primary rounded p-4 hover:border-primary transition-all flex flex-col gap-3 group relative">
      <div className="flex justify-between items-start">
        <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
          {product.sku}
        </span>

        <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed-dim bg-opacity-20 px-2 py-0.5 rounded">
          {product.quantity}
        </span>
      </div>

      <div>
        <h3 className="font-body-md text-body-md font-bold text-on-surface dark:text-surface line-clamp-2">
          {product.name}
        </h3>
      </div>

      <div className="mt-auto flex justify-between items-end pt-2 border-t border-surface-variant">
        <span className="font-headline-md text-headline-md font-bold text-primary dark:text-surface">
          N{product.price}
        </span>

        {showAddButton && (
          <button
            type="button"
            onClick={() => addToCart?.(product)}
            className="w-8 h-8 rounded-lg px-10 bg-green-500 hover:bg-green-400 flex cursor-pointer items-center justify-center text-white active:scale-95 transition-colors"
          >
            add
          </button>
        )}
      </div>
    </div>
  );
}
