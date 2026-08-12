import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type SaleData = {
  name: string;
  value: number;
};

type PieChartProps = {
  data?: SaleData[];
};

export default function SalePieChart({ data = [] }: PieChartProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        No sales data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`${entry.name}-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
