import { Home, Search, Target, Bookmark, Moon, Sun, Bell, ChevronRight } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { cn } from "../../lib/utils";
import { useAppState } from "../App";

export function AppLayout() {
  const { darkMode, setDarkMode } = useAppState();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Buscar Becas", href: "/buscar", icon: Search },
    { name: "Mis Metas", href: "/metas", icon: Target },
    { name: "Guardadas", href: "/guardadas", icon: Bookmark },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 flex",
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      )}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "w-64 border-r fixed h-full flex flex-col transition-colors duration-300 z-20",
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
              <Target size={18} />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Pathfinder
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-none mt-0.5">
                Becas & Oportunidades
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm",
                  isActive
                    ? darkMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-700"
                    : darkMode
                      ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    isActive ? (darkMode ? "text-emerald-400" : "text-emerald-600") : ""
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight
                    size={14}
                    className={darkMode ? "text-emerald-400" : "text-emerald-600"}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Focus Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm",
              darkMode
                ? "text-slate-400 hover:bg-slate-800 hover:text-amber-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            <span>Modo Enfoque</span>
            <div
              className={cn(
                "ml-auto w-10 h-5 rounded-full transition-all relative",
                darkMode ? "bg-emerald-600" : "bg-slate-200"
              )}
            >
              <div
                className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300",
                  darkMode ? "left-5" : "left-0.5"
                )}
              />
            </div>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              CL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                Camila López
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Estudiante • Maestría
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header
          className={cn(
            "h-16 border-b flex items-center justify-end px-8 sticky top-0 z-10 transition-colors duration-300",
            darkMode
              ? "bg-slate-950/80 border-slate-800 backdrop-blur-md"
              : "bg-white/80 border-slate-200 backdrop-blur-md"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Notification dot */}
            <button className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              CL
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
