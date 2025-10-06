import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import ChefAI from "./pages/ChefAI";
import ScanFood from "./pages/ScanFood";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ecranul de start / welcome */}
        <Route path="/" element={<Welcome />} />

        {/* Dashboard principal */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Scanare aliment */}
        <Route path="/scan" element={<ScanFood />} />

        {/* Chef AI cu rețeta selectată */}
        <Route path="/chef-ai/:recipeName" element={<ChefAI />} />
      </Routes>
    </Router>
  );
}
