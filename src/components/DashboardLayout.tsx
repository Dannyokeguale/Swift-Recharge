import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  Zap, 
  Settings, 
  LogOut, 
  Bell, 
  User,
  Menu,
  X,
  Smartphone,
  Tv,
  Lightbulb,
  CreditCard
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/src/lib/utils";
import { api } from "@/src/lib/api";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Buy Data", icon: Zap, path: "/dashboard/buy-data" },
    { name: "Buy Airtime", icon: Smartphone, path: "/dashboard/buy-airtime" },
    { name: "Cable TV", icon: Tv, path: "/dashboard/cable" },
    { name: "Electricity", icon: Lightbulb, path: "/dashboard/electricity" },
    { name: "Fund Wallet", icon: Wallet, path: "/dashboard/wallet" },
    { name: "Transactions", icon: History, path: "/dashboard/transactions" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-8 flex justify-center">
            <Logo className="h-40" />
          </div>

          <nav className="flex-grow px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all",
                  location.pathname === item.path
                    ? "bg-[#0B1C3D] text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <button className="lg:hidden text-slate-600 p-2 -ml-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-extrabold text-slate-900">
              {menuItems.find((m) => m.path === location.pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-[#0B1C3D] rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
