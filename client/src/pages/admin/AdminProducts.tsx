import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Category, Product } from "../../types/types";
import { IoIosAddCircleOutline } from "react-icons/io";
import AdminLayout from "../../layouts/AdminLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../utils/Spinner";
import ProductCategory from "../../components/product/ProductCategory";
import ProductsGrid from "../../components/product/ProductsGrid";
import SummaryCard from "../../components/product/SummaryCard";

export default function CategoryProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<any>({ categories: 0, products: 0 });
  const { theme, isLoading, setIsLoading } = useAuth();
  const api = useAxiosPrivate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/category");
        const data = response?.data?.data;
        const totalCategories = response?.data?.pagination?.total;
        setTotal((prev: any) => {
          return { ...prev, categories: totalCategories };
        });
        setCategories(data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await api.get("/products");
        const totalProducts = response?.data?.pagination?.total;
        setProducts(response?.data?.data ?? []);
        setTotal((prev: any) => {
          return { ...prev, products: totalProducts };
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      setIsLoading(true);

      try {
        await Promise.all([getCategories(), getProducts()]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      // Search fields
      const name = product.name?.toLowerCase() ?? "";
      const sku = product.sku?.toLowerCase() ?? "";

      const matchesSearch =
        !query || name.includes(query) || sku.includes(query);

      // Category filter
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory._id;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className="flex flex-col w-full gap-5 items-center p-3 sm:p-5">
          <h1 className="text-2xl dark:text-surface text-center">Products</h1>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 place-items-center text-center">
            <SummaryCard title="Total Products" value={total.products} />
            <SummaryCard title="Total Categories" value={total.categories} />
            <Link
              to="/add-product"
              title="Add Product or Category"
              className="cursor-pointer p-1 rounded-sm text-green-500 dark:border-on-surface justify-content-center border max-h-fit border-surface hover:border-green-500 active:scale-95 transition-all duration-200"
            >
              <IoIosAddCircleOutline size={40} />
            </Link>
          </section>

          <section className="w-full flex-1 flex flex-col bg-surface-container-lowest dark:bg-on-surface border border-outline-variant rounded-lg overflow-hidden min-w-0 min-h-0">
            {/* Search & Filter Header */}
            <div className="w-full p-3 sm:p-4 md:p-6 border-b border-outline-variant bg-surface-bright flex flex-col gap-4">
              <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="text-outline dark:text-surface text-base sm:text-lg shrink-0">
                  Search:
                </label>

                <div className="w-full min-w-0">
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    placeHolder="Search Product or Category"
                  />
                </div>
              </div>

              {/** Category component */}
              <div className="w-full min-w-0 overflow-x-auto">
                <ProductCategory
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full min-w-0 overflow-x-auto">
              <ProductsGrid
                filteredProducts={filteredProducts}
                showAddButton={false}
              />
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
