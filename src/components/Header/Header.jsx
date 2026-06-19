import { CircleUser, Menu, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slices/ThemeSlice";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-20 w-full flex-none px-4 py-3 md:px-6">
      <div
        className={`flex h-14 w-full items-center justify-between rounded-2xl border px-4 shadow-sm transition-colors duration-300
          ${
            isDark
              ? "bg-zinc-950 border-zinc-800 text-white"
              : "bg-white border-slate-200 text-slate-900"
          }`}
      >
        {/* LEFT BRAND SECTION */}
        <div className="flex min-w-0 items-center gap-3">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              // FIXED: Button theme matching dark mode values
              className={`grid h-10 w-10 flex-none cursor-pointer place-items-center rounded-xl shadow-sm border transition-colors duration-200
                ${
                  isDark
                    ? "bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
          )}

          <span className="truncate text-xl font-semibold tracking-tight">
            Dashboard
          </span>
        </div>

        {/* RIGHT CONTROL ACTIONS */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE BUTTON */}
          <button
            // FIXED: Wrapped in an arrow function to prevent the infinite render loop crash!
            onClick={() => dispatch(toggleTheme())}
            className={`cursor-pointer p-2 rounded-xl transition-colors duration-200
              ${isDark ? "text-yellow-400 hover:bg-zinc-900" : "text-slate-600 hover:bg-slate-100"}`}
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* USER ACCOUNT BUTTON */}
          <button
            className={`p-2 rounded-xl cursor-pointer transition-colors ${
              isDark
                ? "text-zinc-300 hover:bg-zinc-900"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <CircleUser size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
