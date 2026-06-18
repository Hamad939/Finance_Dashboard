import React from "react";
import { useSelector } from "react-redux";
const KpiCard = ({ kpiData }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpiData?.map((item) => (
          <div
            key={item.id}
            className={`transition-colors duration-300 ease-in-out  ${
              isDark
                ? "bg-zinc-800 border-zinc-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            } p-4 rounded-xl shadow-sm`}
          >
            <p className="text-sm text-slate-500 font-medium">{item.title}</p>
            <p className="text-2xl font-bold  mt-1">
              {item.currency === "USD" ? `$${item.value}` : item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KpiCard;
