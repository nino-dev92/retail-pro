import { useState, useEffect } from "react";
import type { DashboardStats } from "../../types/types";
import ManagerLayout from "../../layouts/ManagerLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "../../utils/Spinner";
import SummaryCard from "../../components/product/SummaryCard";
import SalesChart from "../../components/dashboard/SalesChart";

export default function ManagerDashboard() {
  const { auth, theme } = useAuth();
  const api = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);

  const salesOverview = dashboard?.charts.salesByDay ?? [];
  const revenueData = dashboard?.charts.revenueByMonth ?? [];
  const stats = dashboard?.stats;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthRevenue = dashboard?.charts.revenueByMonth.find(
    (revenue) => revenue.month == currentMonth,
  );

  useEffect(() => {
    setIsLoading(true);
    const getDashboardStats = async () => {
      try {
        const response = await api.get("/dashboard");
        const statsData = response.data?.data;
        setDashboard(statsData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardStats();
  }, []);

  const totalInventoryValue =
    dashboard?.inventory.inventoryValue[0].totalInventory;

  return (
    <ManagerLayout theme={theme}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="min-h-screen bg-background dark:bg-on-surface">
          <main className="p-6 max-w-container-max mx-auto">
            <div className="mb-6">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold dark:text-surface">
                  Manager
                </h1>
                <p className="dark:text-surface font-bold">
                  {new Date().toDateString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-on-surface-variant dark:text-surface">
                  Welcome back, {auth.firstName.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Summary cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-8xl mx-auto border border-primary-container p-5">
              <SummaryCard
                title="Today's Revenue"
                value={`N${(stats?.revenue as number) ?? "-"}`}
              />

              <SummaryCard
                title={`${new Date().toLocaleString("en-US", {
                  month: "long",
                })} Revenue`}
                value={`N${Number(thisMonthRevenue?.revenue).toLocaleString() ?? "-"}`}
              />
              <SummaryCard
                title="Today Sales"
                value={(stats?.itemsSold as number) ?? "-"}
              />

              <SummaryCard
                title="Today's Transactions"
                value={(stats?.totalTransactions as number) ?? "-"}
              />

              <SummaryCard
                title="Total Products In Stock"
                value={(stats?.totalProducts as number) ?? "-"}
              />
              <SummaryCard
                title="Total Inventory Value"
                value={`N${Number(totalInventoryValue).toLocaleString() ?? "-"}`}
              />

              <SummaryCard
                title="Top Selling"
                value={
                  (dashboard?.products.topSellingProducts[0].name as string) ??
                  "-"
                }
              />

              <SummaryCard
                title="Total Categories"
                value={(stats?.totalCategories as number) ?? "-"}
              />
            </section>

            {/* Sales overview */}
            <section className="">
              <SalesChart salesData={salesOverview} revenueData={revenueData} />
            </section>
          </main>
        </div>
      )}
    </ManagerLayout>
  );
}
