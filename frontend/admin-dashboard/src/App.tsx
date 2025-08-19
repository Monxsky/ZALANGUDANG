import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import SKUs from "./pages/skus";
import Transactions from "./pages/transactions";
import Navbar from './components/navbar';
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Users from "./pages/Users";


function App() {

  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/skus" element={<SKUs />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
