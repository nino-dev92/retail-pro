import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function AddCategory() {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const api = useAxiosPrivate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition placeholder:text-surface/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClass = "mb-1.5 block text-sm font-medium text-surface";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = {
      name,
      description,
    };

    console.log(category);

    try {
      const response = await api.post("/category", category);

      setName("");
      setDescription("");
      if (response.status === 201)
        toast.success("Category created successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleClear = () => {
    setName("");
    setDescription("");
  };

  return (
    <AdminLayout theme={theme}>
      <Toaster position="top-right" richColors={true} />
      <div className="min-h-full w-full px-3 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Page Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Title & Description */}
            <div>
              <h1 className="text-2xl font-bold dark:text-surface sm:text-3xl">
                Add Category
              </h1>

              <p className="mt-1 text-sm dark:text-surface/60">
                Create a new product category for your inventory.
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              {/* Add Category */}
              <button
                type="button"
                onClick={() => navigate("/add-product")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95 cursor-pointer"
              >
                + Add Product
              </button>

              {/* Go Back */}
              <button
                type="button"
                className="rounded-lg border border-surface/30 px-4 py-2 text-sm font-medium text-surface-tint hover:border-surface-tint transition hover:bg-surface/10 active:scale-95 cursor-pointer"
                onClick={() => navigate("/products")}
              >
                ← Back to Products
              </button>
            </div>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-xl border border-surface/20 bg-surface-tint shadow-sm"
          >
            {/* Form Header */}
            <div className="border-b border-surface/20 px-4 py-5 sm:px-6">
              <h2 className="text-lg font-semibold text-surface">
                Category Information
              </h2>

              <p className="mt-1 text-sm text-surface/60">
                Enter the details for the new category.
              </p>
            </div>

            {/* Form Body */}
            <div className="space-y-6 p-4 sm:p-6">
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

                <p className="mt-1.5 text-xs text-surface/50">
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

                <p className="mt-1.5 text-xs text-surface/50">
                  A short description helps explain what products belong to this
                  category.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-surface/20 bg-surface-tint/50 p-4 sm:flex-row sm:justify-end sm:px-6">
              {/* Clear */}
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg border border-surface/30 px-5 py-2.5 text-sm font-medium text-surface transition hover:bg-surface/10 active:scale-95 cursor-pointer"
              >
                Clear
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95 cursor-pointer"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
