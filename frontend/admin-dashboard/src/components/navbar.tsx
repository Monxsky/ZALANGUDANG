import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: 10, background: "#222", color: "#fff", display: "flex", gap: 20 }}>
      <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
      <Link to="/products" style={{ color: "#fff" }}>Products</Link>
      <Link to="/skus" style={{ color: "#fff" }}>SKUs</Link>
      <Link to="/transactions" style={{ color: "#fff" }}>Transactions</Link>
    </nav>
  );
};

export default Navbar;
