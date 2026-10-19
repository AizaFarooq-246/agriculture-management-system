import './App.css';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppProvider from './context/AppProvider.js';
import Dashboard from "./pages/Dashboard.js";
import Crops from "./pages/Crops.js";
import HarvestOrders from "./pages/HarvestOrders.js";
import Buyers from "./pages/Buyers.js";
import NotFound from "./pages/NotFound.js";
import Navbar from "./components/common/Navbar.js";
import Sidebar from "./components/common/Sidebar.js";
import CropForm from "./components/crops/CropForm.js";
import BuyerForm from "./components/buyers/BuyerForm.js";
import OrderForm from "./components/harvest/OrderForm.js";
import OrdersTable from "./components/harvest/OrdersTable.js";



function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className='d-flex'>
          <Sidebar isOpen={isSidebarOpen} />

          <main className='flex-grow-1 px-4 py-3 main-content' style={{ backgroundColor: "#F3F7F3", minHeight: "100vh" }}>
            <Routes>
              <Route path='/' element={<Navigate to="/dashboard" replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/crops' element={<Crops />} />
              <Route path='/crops/form' element={<CropForm />} />
              <Route path='/harvest-orders' element={<HarvestOrders />} />
              <Route path="/harvest-orders/create" element={<OrderForm />} />
              <Route path="/harvest-orders/all-orders" element={<OrdersTable />} />
              <Route path='/buyers' element={<Buyers />} />
              <Route path='/buyers/form' element={<BuyerForm />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
