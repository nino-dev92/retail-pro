import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import type { SaleItem, DashboardStats } from "../../types/types";
import SummaryCard from "../../components/product/SummaryCard";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../utils/Spinner";

export default function AdminSales() {
  const { theme } = useAuth();
  const api = useAxiosPrivate();
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  // const [refunds, setRefunds] = useState<any[]>([]);
  // const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const stats = dashboard?.stats;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const [getSales, getdashboardStats] = await Promise.all([
          api.get("/sales"),
          api.get("/dashboard"),
        ]);

        setSales(getSales?.data?.data);
        setDashboard(getdashboardStats?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    console.log("dashboard", dashboard);
    console.log("sales:", sales);
  }, [dashboard, sales]);

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className="flex flex-col w-full gap-5 items-center p-3 sm:p-5">
          <h1 className="text-2xl dark:text-surface text-center">Sales</h1>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            <SummaryCard
              title="Top Selling Product"
              value={dashboard?.products.topSellingProducts[0].name as string}
              description={`Sold: ${dashboard?.products.topSellingProducts[0].totalSold}`}
            />

            <SummaryCard
              title="Today Transactions"
              value={stats?.totalTransactions as number}
            />
          </section>

          <section className="w-full flex-1 flex flex-col bg-surface-container-lowest dark:bg-on-surface border border-outline-variant rounded-lg overflow-hidden min-w-0 min-h-0">
            {/* Search & Filter Header */}
            <div className="w-full p-3 sm:p-4 md:p-6 border-b border-outline-variant bg-surface-bright flex flex-col gap-4">
              <div className="w-full flex items-center sm:flex-row sm:items-center gap-3">
                <label className="text-outline dark:text-surface text-base sm:text-lg shrink-0">
                  Find Sale:
                </label>

                <div className="w-full min-w-0">
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    placeHolder="Search Sale By ID"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
