import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function AddCategoryPage() {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const api = useAxiosPrivate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/50 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base";

  const labelClass = "mb-1.5 block text-sm font-medium text-surface";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = {
      name,
      description,
    };

    try {
      const response = await api.post("/category", category);

      if (response.status === 201) {
        setName("");
        setDescription("");

        toast.success("Category created successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    }
  };

  const handleClear = () => {
    setName("");
    setDescription("");
  };

  return (
    <AdminLayout theme={theme}>
      <Toaster position="top-right" richColors />

      <main className="min-h-full w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* PAGE HEADER */}
          <section className="mb-5 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
            {/* Title & Description */}
            <div className="min-w-0 text-center md:text-left">
              <h1 className="text-2xl font-bold dark:text-surface sm:text-3xl">
                Add Category
              </h1>

              <p className="mt-1 text-sm dark:text-surface/60">
                Create a new product category for your inventory.
              </p>
            </div>

            {/* HEADER ACTIONS */}
            <div
              className="
                flex w-full flex-col gap-2
                sm:flex-row sm:justify-center
                md:w-auto md:shrink-0 md:justify-end
              "
            >
              {/* Back to Products */}
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="w-full rounded-lg border border-surface/30 px-4 py-2.5 text-sm font-medium text-surface-tint transition hover:border-surface-tint
                  hover:bg-surface/10 active:scale-95 sm:w-auto cursor-pointer"
              >
                ← Back to Products
              </button>

              {/* Add Product */}
              <button
                type="button"
                onClick={() => navigate("/add-product")}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95 sm:w-auto cursor-pointer"
              >
                + Add Product
              </button>
            </div>
          </section>

          {/*  FORM CARD  */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full overflow-hidden rounded-xl
              border border-surface/20
              bg-surface-tint
              shadow-sm
            "
          >
            {/* =================================================
                FORM HEADER
            ================================================== */}
            <div
              className="
                border-b border-surface/20
                px-4 py-5
                sm:px-6 sm:py-6
              "
            >
              <h2 className="text-lg font-semibold text-surface sm:text-xl">
                Category Information
              </h2>

              <p className="mt-1 text-sm text-surface/60">
                Enter the details for the new category.
              </p>
            </div>

            {/* =================================================
                FORM BODY
            ================================================== */}
            <div className="space-y-6 p-4 sm:p-6 lg:p-7">
              {/* Category Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Category Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Electronics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />

                <p className="mt-1.5 text-xs leading-5 text-surface/50">
                  Choose a clear name that will be easy to identify.
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Describe this category..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-1.5 text-xs leading-5 text-surface/50">
                  A short description helps explain what products belong to this
                  category.
                </p>
              </div>
            </div>

            {/* =================================================
                FORM ACTIONS
            ================================================== */}
            <div
              className="
                flex flex-col gap-3
                border-t border-surface/20
                bg-surface-tint/50
                p-4
                sm:flex-row sm:justify-end
                sm:px-6 sm:py-5
              "
            >
              {/* Clear */}
              <button
                type="button"
                onClick={handleClear}
                className="
                  w-full rounded-lg
                  border border-surface/30
                  px-5 py-2.5
                  text-sm font-medium text-surface
                  transition
                  hover:bg-surface/10
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                Clear
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full rounded-lg
                  bg-primary
                  px-5 py-2.5
                  text-sm font-semibold text-white
                  shadow-sm
                  transition
                  hover:opacity-90
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </main>
    </AdminLayout>
  );
}
