import Navigation from "./Navigation/Navigation";
import Header from "./Header/Header";
import DashboardData from "./dashboardData/DashboardData";
import { useState } from "react";
import { useSelector } from "react-redux";
const DashboardLayout = () => {
  const getInitialSidebarState = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768; // Returns true for desktop, false for mobile
    }
    return true; // Fallback fallback default
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div className="  relative flex h-screen w-full overflow-hidden bg-white">
      <aside
        className={`pointer-events-none fixed inset-y-0 left-0 z-40 h-screen w-0 flex-none md:sticky md:top-0 md:z-20 ${
          isSidebarOpen ? "md:w-64" : "md:w-0"
        }`}
      >
        <Navigation
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </aside>

      <main
        className={`transition-colors duration-300 ease-in-out ${
          isDark
            ? "bg-zinc-950 border-zinc-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }   flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white`}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 md:px-6">
          <DashboardData />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
