import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import AdminLayout from "../../layouts/AdminLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../utils/Spinner";
import type { Supplier } from "../../types/types";
import SummaryCard from "../../components/product/SummaryCard";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");

  const { theme, isLoading, setIsLoading } = useAuth();
  const api = useAxiosPrivate();

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await api.get("/supplier");

        const data = response?.data?.data;

        setSuppliers(data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      setIsLoading(true);

      try {
        await getSuppliers();
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const name = supplier.name?.toLowerCase() ?? "";
    const email = supplier.email?.toLowerCase() ?? "";

    return !query || name.includes(query) || email.includes(query);
  });

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className="flex flex-col w-full gap-5 items-center p-3 sm:p-5">
          {/* Page Header */}
          <div className="w-full flex items-center justify-between md:justify-center gap-4 relative">
            <h1 className="text-2xl sm:text-3xl dark:text-surface text-left md:text-center">
              Suppliers
            </h1>

            <Link
              to="/add-supplier"
              title="Add Supplier"
              className="cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-green-500 dark:border-on-surface border border-surface hover:border-green-500 hover:bg-green-500/5 active:scale-95 transition-all duration-200 shrink-0 md:absolute md:right-0"
            >
              <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                Add Supplier
              </span>

              <IoIosAddCircleOutline className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </Link>
          </div>

          <section className="grid grid-cols-1 gap-5 text-center w-[70%] md:w-[30%]">
            <SummaryCard
              title="Total Suppliers"
              value={suppliers.length ?? "-"}
            />
          </section>

          <section className="w-full flex-1 flex flex-col bg-surface-container-lowest dark:bg-on-surface border border-outline-variant rounded-lg overflow-hidden min-w-0 min-h-0">
            {/* Search Header */}
            <div className="w-full p-3 sm:p-4 md:p-6 border-b border-outline-variant bg-surface-bright">
              <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="text-outline dark:text-surface text-base sm:text-lg shrink-0">
                  Search:
                </label>

                <div className="w-full min-w-0">
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    placeHolder="Search Supplier"
                  />
                </div>
              </div>
            </div>

            {/* Suppliers */}
            <div className="w-full min-w-0 overflow-x-auto">
              {filteredSuppliers.length === 0 ? (
                <div className="flex items-center justify-center p-10">
                  <p className="text-outline dark:text-surface">
                    No suppliers found.
                  </p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant text-center">
                      <tr>
                        <th className="p-4 text-outline border border-outline-variant dark:text-surface">
                          Name
                        </th>

                        <th className="p-4 text-outline border border-outline-variant dark:text-surface">
                          Email
                        </th>

                        <th className="p-4 text-outline border border-outline-variant dark:text-surface">
                          Phone
                        </th>

                        <th className="p-4 text-outline border border-outline-variant dark:text-surface">
                          Address
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                      {filteredSuppliers.map((supplier) => (
                        <tr
                          key={supplier._id}
                          className="hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                        >
                          <td className="p-4 border border-outline-variant text-on-surface dark:text-surface">
                            {supplier.name}
                          </td>

                          <td className="p-4 border border-outline-variant text-on-surface dark:text-surface">
                            {supplier.email || "-"}
                          </td>

                          <td className="p-4 border border-outline-variant text-on-surface dark:text-surface">
                            {supplier.phone || "-"}
                          </td>

                          <td className="p-4 border border-outline-variant text-on-surface dark:text-surface">
                            {supplier.address || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
