import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import KpiCard from "./KpiCard";
import FinancialCharts from "./financialCharts";
import Table from "./Table";
const DashboardData = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading Dashboard parameters...</div>;
  if (error) return <div>Error:{error}</div>;
  return (
    <div className="flex flex-col gap-4">
      <KpiCard kpiData={dashboardData?.kpis} />
      <FinancialCharts chartData={dashboardData?.chartTrend} />
      <Table tableData={dashboardData?.transactions} />
    </div>
  );
};

export default DashboardData;
