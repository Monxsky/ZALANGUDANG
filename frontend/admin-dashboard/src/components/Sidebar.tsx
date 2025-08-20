import React from "react";

interface SidebarProps {
  onSelect: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div style={{ width: 220, background: "#2c3e50", color: "#fff", padding: 20, height: "100vh" }}>
      <h2>WMS Dashboard</h2>
      <button onClick={() => onSelect("users")} style={{ display: "block", margin: "10px 0" }}>Users</button>
      <button onClick={() => onSelect("products")} style={{ display: "block", margin: "10px 0" }}>Products</button>
      <button onClick={() => onSelect("transactions")} style={{ display: "block", margin: "10px 0" }}>Transactions</button>
    </div>
  );
};

export default Sidebar;
