import React, { useState, useEffect } from "react";
import { Menu, Package, Layers, Repeat, LogOut, X, Moon, Sun } from "lucide-react";

interface SKU {
  id: number;
  code: string;
  stock: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const initialSKUs: SKU[] = [
    { id: 1, code: "SKU001", stock: 100, name: "Nugget Ayam" },
    { id: 2, code: "SKU002", stock: 50, name: "Sosis Ayam" },
    { id: 3, code: "SKU003", stock: 75, name: "Bakso Ayam" },
  ];

  const [skus, setSKUs] = useState<SKU[]>(initialSKUs);

  // Sync dark mode ke <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">WMS Admin</h1>
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Menu className="w-5 h-5" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Package className="w-5 h-5" /> Products
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Layers className="w-5 h-5" /> SKUs
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Repeat className="w-5 h-5" /> Transactions
          </a>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition w-full justify-center">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-1">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Total Products: 12</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">SKUs</h2>
              <p className="text-gray-600 dark:text-gray-400">Total SKUs: {skus.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Transactions</h2>
              <p className="text-gray-600 dark:text-gray-400">Total Transactions: 24</p>
            </div>
          </div>

          {/* SKUs Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">SKU List</h2>
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                  <th className="px-4 py-2 border-b dark:border-gray-600">ID</th>
                  <th className="px-4 py-2 border-b dark:border-gray-600">Code</th>
                  <th className="px-4 py-2 border-b dark:border-gray-600">Name</th>
                  <th className="px-4 py-2 border-b dark:border-gray-600">Stock</th>
                </tr>
              </thead>
              <tbody>
                {skus.map((sku) => (
                  <tr key={sku.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 border-b dark:border-gray-600">{sku.id}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-600">{sku.code}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-600">{sku.name}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-600">{sku.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
