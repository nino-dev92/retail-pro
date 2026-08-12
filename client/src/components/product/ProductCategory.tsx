import type { Category } from "../../types/types";

type CategoryPropsType = {
  categories: Category[];
  selectedCategory?: Category | null;
  setSelectedCategory?: React.SetStateAction<any>;
};

export default function ProductCategory({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryPropsType) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 items-center">
      <button
        type="button"
        onClick={() => setSelectedCategory(null)}
        className={`whitespace-nowrap px-4 py-1.5 rounded-full font-label-sm text-label-sm font-bold border cursor-pointer transition-colors ${
          selectedCategory === null
            ? "bg-primary-container text-surface border-transparent"
            : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
        }`}
      >
        All Categories
      </button>

      {categories.length < 1 ? (
        <p className="dark:text-surface">No Category available</p>
      ) : (
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category._id}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full font-label-sm text-label-sm border transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-primary-container text-surface border-transparent font-bold"
                  : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
