import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { useSelector } from "react-redux";
const columns = [
  { key: "customerName", label: "Customer Name" },
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "status", label: "Status" },
  { key: "region", label: "Region" },
];

const Table = ({ tableData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("customerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const isDark = useSelector((state) => state.theme.isDark);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortValue = (item, field) => {
    const value = item[field];

    if (field === "revenue") {
      return Number(String(value).replace("$", "").replace(",", ""));
    }

    if (field === "orders") {
      return Number(value);
    }

    return String(value || "").toLowerCase();
  };

  const searchText = searchTerm.toLowerCase();
  let filteredData = tableData || [];

  if (searchText) {
    filteredData = filteredData.filter((item) => {
      return (
        String(item.customerName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(item.revenue || "")
          .toLowerCase()
          .includes(searchText) ||
        String(item.orders || "")
          .toLowerCase()
          .includes(searchText) ||
        String(item.status || "")
          .toLowerCase()
          .includes(searchText) ||
        String(item.region || "")
          .toLowerCase()
          .includes(searchText)
      );
    });
  }

  const sortedData = [...filteredData].sort((a, b) => {
    const firstValue = getSortValue(a, sortField);
    const secondValue = getSortValue(b, sortField);

    if (firstValue > secondValue) {
      return sortOrder === "asc" ? 1 : -1;
    }

    if (firstValue < secondValue) {
      return sortOrder === "asc" ? -1 : 1;
    }

    return 0;
  });

  const sortIconClass = (field) => {
    if (sortField === field) {
      return "text-slate-900";
    }

    return "text-slate-400";
  };

  return (
    <div className="rounded-xl border border-slate-200 w-[95%] mx-auto p-6">
      <div className="flex justify-center md:justify-between w-full items-center  mb-4 ">
        <span className="hidden md:block font-bold  text-lg">
          Recent Transactions
        </span>
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-500"
            type="search"
            placeholder="Search transactions"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <div className="w-full  overflow-x-auto rounded-lg">
        <table
          className={`transition-colors duration-300 ease-in-out ${
            isDark
              ? "bg-zinc-950 border-zinc-800 text-white"
              : "bg-white border-slate-200 text-slate-900"
          }  w-full  min-w-175 text-left text-sm text-slate-600`}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="p-4">
                  <button
                    type="button"
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 font-semibold  transition-colors duration-200 hover:scale-105"
                  >
                    {column.label}
                    <ArrowUpDown
                      size={14}
                      className={sortIconClass(column.key)}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item.id || item.customerName}
                className="border-t border-slate-100"
              >
                <td className="p-4 font-medium ">{item.customerName}</td>
                <td className="p-4">{item.revenue}</td>
                <td className="p-4">{item.orders}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 w-20 justify-center py-0.5 text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.status === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4">{item.region}</td>
              </tr>
            ))}

            {sortedData.length === 0 && (
              <tr>
                <td className="p-6 text-center text-slate-500" colSpan={5}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
