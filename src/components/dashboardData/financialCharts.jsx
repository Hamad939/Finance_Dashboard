import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinancialChart({ chartData = [] }) {
  return (
    <div className="w-[95%] mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      {/* 1. Context Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            H1 Performance Analysis
          </h3>
          <p className="text-sm text-slate-500">
            Gross revenue milestones tracked against user acquisition goals
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-400 mt-2 sm:mt-0 uppercase tracking-wider">
          Jan - Jun Analytics
        </div>
      </div>

      {/* 2. Chart Graph */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 15 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* X-Axis Timeline Label */}
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              label={{
                value: "Timeline (Months)",
                position: "insideBottom",
                offset: -10,
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Y-Axis Value Format Label */}
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
              label={{
                value: "Revenue (USD)",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Popover Tooltip Description */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
              }}
              formatter={(value, name) => {
                if (name === "revenue")
                  return [`$${value.toLocaleString()}`, "Gross Revenue"];
                if (name === "customers")
                  return [value.toLocaleString(), "Total Active Customers"];
                return [value, name];
              }}
            />

            {/* Visual Identification Legend */}
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-600 capitalize">
                  {value === "revenue" ? "Gross Earnings" : "Acquired Base"}
                </span>
              )}
            />

            <Area
              name="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
