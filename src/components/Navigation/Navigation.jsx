import { BarChart3, FileText, LayoutDashboard, X } from "lucide-react";
import { useSelector } from "react-redux";
const navItems = [
  {
    label: "Financial Overview",
    icon: LayoutDashboard,
    id: "financial-overview",
  },
  { label: "Analytics Area", icon: BarChart3, id: "analytics-area" },
  { label: "Reports Section", icon: FileText, id: "reports-section" },
];

const Navigation = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Optional: Close mobile sidebar after clicking a link
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };
  return (
    <>
      <div
        className={`transition-colors duration-300 ease-in-out  ${
          isDark
            ? "bg-zinc-950 border-zinc-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        } absolute inset-y-0 left-0 flex w-64 flex-col border-r  p-3 shadow-sm will-change-transform transition-transform duration-200 ease-out ${
          isSidebarOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex h-12 w-full items-center justify-between">
          <h2 className="whitespace-nowrap text-base font-semibold tracking-tight ">
            Dashboard
          </h2>
          <button
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className="grid h-10 w-10 flex-none cursor-pointer place-items-center rounded-xl  shadow-sm ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950"
            aria-label="Collapse sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className={`mt-6 flex flex-col gap-2 transition duration-200 ease-out ${
            isSidebarOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-3 scale-95 opacity-0"
          }`}
        >
          {navItems.map(({ label, icon: Icon, id }) => (
            <button
              key={label}
              onClick={() => {
                handleScroll(id);
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left text-sm font-medium  transition-colors duration-200 hover:bg-slate-200/70 hover:text-slate-950"
            >
              <Icon size={18} className="flex-none text-slate-500" />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
