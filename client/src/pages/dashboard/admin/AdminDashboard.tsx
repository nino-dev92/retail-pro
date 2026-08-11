import { type DashboardStats } from "../../../types/types";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import AdminLayout from "../../../layouts/AdminLayout";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SummaryCard from "../../../components/product/SummaryCard";
import SalesChart from "../../../components/dashboard/SalesChart";
import Spinner from "../../../utils/Spinner";

export default function AdminDashboard() {
  const { auth, theme, isLoading, setIsLoading } = useAuth();
  const api = useAxiosPrivate();
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const salesOverview = dashboard?.charts.salesByDay ?? [];
  const revenueData = dashboard?.charts.revenueByMonth ?? [];

  useEffect(() => {
    setIsLoading(true);
    const getStats = async () => {
      try {
        const response = await api.get("/dashboard");
        const statsData = response.data?.data;
        setDashboard(statsData);
        console.log(statsData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getStats();
  }, []);

  const stats = dashboard?.stats;

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="min-h-screen bg-background dark:bg-on-surface">
          <main className="p-6 max-w-container-max mx-auto">
            <div className="mb-6">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold dark:text-surface">Admin</h1>
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
                value={stats?.revenue as number}
              />

              <SummaryCard
                title="Today Sales"
                value={stats?.itemsSold as number}
              />

              <SummaryCard
                title="Today's Transactions"
                value={stats?.totalTransactions as number}
              />

              <SummaryCard
                title="Total Products In Stock"
                value={stats?.totalProducts as number}
              />
            </section>

            {/* Sales overview */}
            <section>
              <SalesChart salesData={salesOverview} revenueData={revenueData} />
            </section>

            {/* Recent activity */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-8xl mx-auto border border-primary-container p-5">
              <SummaryCard
                title="Recent Sales"
                value={stats?.recentSales.length as number}
              />
              <SummaryCard
                title="Total Product Categories"
                value={stats?.totalCategories as number}
              />
              <SummaryCard
                title="Low Stock Items"
                value={stats?.lowStock as number}
              />

              <SummaryCard
                title="Out Of Stock Items"
                value={stats?.outOfStock as number}
              />
            </section>
          </main>
        </div>
      )}
    </AdminLayout>
  );
}
