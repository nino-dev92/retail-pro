import useAuth from "../../hooks/useAuth";

import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesData = {
  date: string;
  revenue: number;
  transactions: number;
};

type RevenueData = {
  revenue: number;
  month: string;
};

type SalesChartProps = {
  salesData: SalesData[];
  revenueData: RevenueData[];
};

export default function SalesChart({
  salesData,
  revenueData,
}: SalesChartProps) {
  const { theme, auth } = useAuth();
  return (
    <div
      className={`${auth?.role === "manager" ? "md:grid md:grid-cols-2 gap-2" : ""} mt-5`}
    >
      {/** Line Chart */}
      <div className="bg-surface dark:bg-primary border w-full border-outline-variant rounded-lg p-5 my-2">
        <div className="mb-5">
          <h2 className="text-lg font-bold dark:text-surface">
            Sales Overview
          </h2>

          <p className="text-sm text-on-surface-variant dark:text-surface">
            Recent Revenue and transactions
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                stroke={`${theme === "dark" ? "white" : "blue"}`}
              />

              <YAxis
                stroke={`${theme === "dark" ? "white" : "blue"}`}
                tickFormatter={(value) => `₦${Number(value).toLocaleString()}`}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") {
                    return [`₦${Number(value).toLocaleString()}`, "Revenue"];
                  }

                  return [value, "Transactions"];
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="green"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/** Bar Chart */}

      <div className="bg-surface dark:bg-primary border border-outline-variant rounded-lg p-5 my-2">
        <div className="mb-5">
          <h2 className="text-lg font-bold dark:text-surface">
            Monthly Revenue Overview
          </h2>

          <p className="text-sm text-on-surface-variant dark:text-surface">
            Revenue by Month
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                stroke={`${theme === "dark" ? "white" : "blue"}`}
              />
              <YAxis stroke={`${theme === "dark" ? "white" : "blue"}`} />
              <Tooltip />

              <Bar dataKey="revenue" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
