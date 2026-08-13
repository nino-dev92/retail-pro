import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AdminLayout from "../layouts/AdminLayout";
import useAuth from "../hooks/useAuth";
import { Toaster, toast } from "sonner";
import { type Category } from "../types/types";

export default function AddProduct() {
  const { theme } = useAuth();
  const navigate = useNavigate();
  const api = useAxiosPrivate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [costprice, setCostPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/category?limit=100");
        const data = response?.data?.data;
        setCategories(data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    const getSuppliers = async () => {
      try {
        const response = await api.get("/supplier?limit=100");
        const data = response?.data?.data;
        setSuppliers(data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
    getSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price: Number(price),
      costPrice: Number(costprice),
      quantity: Number(quantity),
      supplier,
      category,
    };
    console.log(product);
    try {
      const response = await api.post("/products", product);
      console.log(response);
      clearForm();
      toast.success("Product created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCostPrice("");
    setQuantity("");
    setSupplier("");
    setCategory("");
  };
  return (
    <AdminLayout theme={theme}>
      <Toaster position="top-right" richColors={true} />
      <div className="min-h-full w-full px-3 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Page header */}
          <div className="mb-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold dark:text-surface sm:text-3xl">
                Add Product
              </h1>
              <p className="mt-1 text-sm dark:text-surface/60">
                Add a new product to your inventory.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {/* Add Category */}
              <button
                type="button"
                onClick={() => navigate("/add-category")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95 cursor-pointer"
              >
                + Add Category
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

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-surface/20 bg-surface-tint p-4 shadow-sm sm:p-6 lg:p-8"
          >
            <div className="space-y-6">
              {/* Basic information */}
              <section>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-surface">
                    Product Information
                  </h2>
                  <p className="text-sm text-surface/60">
                    Enter the basic details of your product.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Product Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Samsung Galaxy S25"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.length < 1 ? (
                        <option>No category available</option>
                      ) : (
                        categories?.map((category) => (
                          <option
                            value={category._id}
                            key={category._id}
                            onClick={() => setCategory(category._id)}
                          >
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Selling Price
                    </label>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Cost Price */}
                  <div>
                    <label
                      htmlFor="costprice"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Cost Price
                    </label>

                    <input
                      id="costprice"
                      name="costprice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                      value={costprice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Quantity
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 50"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Supplier */}
                  <div>
                    <label
                      htmlFor="supplier"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Supplier
                    </label>

                    <select
                      id="supplier"
                      name="supplier"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      required
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select a supplier
                      </option>
                      {suppliers?.length < 1 ? (
                        <option value="" disabled>
                          No supplier available
                        </option>
                      ) : (
                        suppliers?.map((supplier) => (
                          <option
                            key={supplier._id}
                            value={supplier._id}
                            onClick={() => setSupplier(supplier._id)}
                          >
                            {supplier.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-surface"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Enter a description of the product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
                />
              </section>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-surface/20 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-lg border border-surface/30 px-5 py-2.5 text-sm font-medium text-surface transition hover:bg-surface/10 cursor-pointer"
                  onClick={clearForm}
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
