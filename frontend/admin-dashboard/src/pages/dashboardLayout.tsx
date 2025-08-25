import React from "react";
import { Menu, Package, Layers, Repeat, LogOut } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-indigo-600">WMS Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
          >
            <Menu className="w-5 h-5" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
          >
            <Package className="w-5 h-5" /> Products
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
          >
            <Layers className="w-5 h-5" /> SKUs
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
          >
            <Repeat className="w-5 h-5" /> Transactions
          </a>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition w-full justify-center">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
