import React from "react";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">ZALAN GROUP</h2>
        <ul>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">Dashboard</li>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">SKUs</li>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">Products</li>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">Transactions</li>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">Users</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Dashboard />
      </main>
    </div>
  );
}
