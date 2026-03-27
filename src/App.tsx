import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardLayout } from "./components/DashboardLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Wallet } from "./pages/Wallet";
import { BuyService } from "./pages/BuyService";
import { Settings } from "./pages/Settings";
import { Pricing } from "./pages/Pricing";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Terms } from "./pages/Terms";
import { APIIntegration } from "./pages/APIIntegration";
import { BecomeAgent } from "./pages/BecomeAgent";
import { DataService } from "./pages/services/DataService";
import { AirtimeService } from "./pages/services/AirtimeService";
import { BillService } from "./pages/services/BillService";
import { CableService } from "./pages/services/CableService";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/api-integration" element={<APIIntegration />} />
          <Route path="/become-agent" element={<BecomeAgent />} />
          <Route path="/services/data" element={<DataService />} />
          <Route path="/services/airtime" element={<AirtimeService />} />
          <Route path="/services/bills" element={<BillService />} />
          <Route path="/services/cable" element={<CableService />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="buy-data" element={<BuyService category="data" />} />
          <Route path="buy-airtime" element={<BuyService category="airtime" />} />
          <Route path="cable" element={<BuyService category="cable" />} />
          <Route path="electricity" element={<BuyService category="electricity" />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
