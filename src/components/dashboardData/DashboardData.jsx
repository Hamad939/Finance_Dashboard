import { useState, useEffect } from "react";
import axios from "axios";
import KpiCard from "./KpiCard";
import FinancialCharts from "./financialCharts";
import Table from "./Table";
import { useSelector } from "react-redux";
const DashboardData = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDark = useSelector((state) => state.theme.isDark);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/9a053537-2771-431a-b6b5-9618afa3c483",
        );
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        className={`flex h-[60vh] w-full flex-col items-center justify-center gap-3 p-6 transition-colors duration-300
        ${isDark ? "bg-black text-white" : "bg-slate-50 text-slate-800"}`}
      >
        <p className="text-sm font-medium animate-pulse tracking-wide opacity-80">
          Loading Dashboard parameters...
        </p>
      </div>
    );
  if (error)
    return (
      <div
        className={`flex max-w-md w-full flex-col items-center text-center gap-3 p-6 rounded-2xl border transition-all duration-300 shadow-sm
          ${
            isDark
              ? "bg-zinc-950 border-red-950 text-red-400"
              : "bg-red-50/50 border-red-100 text-red-700"
          }`}
      >
        <h3 className="text-base font-semibold">Data Fetch Failed</h3>
        <p
          className={`text-xs max-w-xs wrap-break-word   leading-relaxed ${isDark ? "text-zinc-400" : "text-slate-500"}`}
        >
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`mt-2 text-xs font-medium px-4 py-2 rounded-xl border transition-colors cursor-pointer
              ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
        >
          Retry Connection
        </button>
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <section id="financial-overview">
        <KpiCard kpiData={dashboardData?.kpis} />
      </section>
      <section id="analytics-area">
        <FinancialCharts chartData={dashboardData?.chartTrend} />
      </section>
      <section id="reports-section">
        <Table tableData={dashboardData?.transactions} />
      </section>
    </div>
  );
};

export default DashboardData;
