import { useState, useEffect, useMemo } from "react";
import AdminLayout from "../layouts/AdminLayout";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import type { RecentSale, DashboardStats, Refund } from "../types/types";
import SummaryCard from "../components/product/SummaryCard";
import Spinner from "../utils/Spinner";
import SalePieChart from "../components/dashboard/PieChart";

export default function SalesPage() {
  const { theme } = useAuth();
  const api = useAxiosPrivate();

  const [sales, setSales] = useState<RecentSale[] | null>([]);
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [refunds, setRefunds] = useState<Refund[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stats = dashboard?.stats;

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const [getSales, getdashboardStats, getRefunds] = await Promise.all([
          api.get("/sales"),
          api.get("/dashboard"),
          api.get("/refund"),
        ]);

        setSales(getSales?.data?.data);
        setDashboard(getdashboardStats?.data?.data);
        setRefunds(getRefunds?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [api]);

  // Calculate payment methods whenever sales changes
  const paymentData = useMemo(() => {
    const counts = {
      CARD: 0,
      CASH: 0,
      TRANSFER: 0,
    };

    sales?.forEach((sale) => {
      if (sale.paymentMethod === "CARD") {
        counts.CARD++;
      }

      if (sale.paymentMethod === "CASH") {
        counts.CASH++;
      }

      if (sale.paymentMethod === "TRANSFER") {
        counts.TRANSFER++;
      }
    });

    return [
      { name: "Card", value: counts.CARD },
      { name: "Cash", value: counts.CASH },
      { name: "Transfer", value: counts.TRANSFER },
    ];
  }, [sales]);

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className="flex flex-col w-full gap-5 items-center p-3 sm:p-5">
          <h1 className="text-2xl dark:text-surface text-center">Sales</h1>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            <SummaryCard
              title="Top Selling Product"
              value={dashboard?.products.topSellingProducts[0]?.name ?? ""}
              description={`Sold: ${
                dashboard?.products.topSellingProducts[0]?.totalSold ?? 0
              }`}
            />

            <SummaryCard
              title="Today Transactions"
              value={stats?.totalTransactions ?? 0}
            />

            <SummaryCard
              title="Today's Revenue"
              value={`N${stats?.revenue.toLocaleString() ?? 0}`}
            />

            <SummaryCard title="Total Refunds" value={refunds?.length ?? 0} />
          </section>

          <section className="w-full grid grid-cols-1 lg:grid-cols-2 bg-surface-container-lowest dark:bg-on-surface border border-outline-variant rounded-lg overflow-hidden min-w-0 min-h-0">
            <div className="w-full p-3 sm:p-4 md:p-6 bg-surface-bright flex flex-col gap-4">
              <p className="text-center text-xl dark:text-surface">
                Recent Sales
              </p>

              {/**Sales table */}
              <div>
                {sales && sales?.length < 0 ? (
                  <p className="dark:text-surface">No recent sales</p>
                ) : (
                  <>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-175 dark:text-surface">
                        <thead>
                          <tr className="text-center">
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              No.
                            </th>
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              Invoice No.
                            </th>
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              Cashier
                            </th>
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              Amount
                            </th>
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              Payment
                            </th>
                            <th className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                              Date
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {sales?.map((sale, index) => (
                            <tr
                              key={sale._id}
                              className="cursor-pointer text-center hover:bg-slate-400"
                            >
                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {index + 1}
                              </td>

                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {sale.invoiceNum}
                              </td>

                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {sale.cashier.firstName.toUpperCase()}
                              </td>

                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {sale.total}
                              </td>

                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {sale.paymentMethod}
                              </td>

                              <td className="border px-4 py-3 whitespace-nowrap dark:border-surface">
                                {new Date(sale.createdAt).toDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-100 p-3 sm:p-4 md:p-6 bg-surface-bright flex flex-col gap-4">
              <p className="text-xl text-center dark:text-surface">
                Payment Method
              </p>
              <SalePieChart data={paymentData} />
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <SummaryCard title="Low Stock" value={stats?.lowStock as number} />

            <SummaryCard
              title="Out of Stock"
              value={stats?.outOfStock as number}
            />
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
