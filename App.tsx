import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Materials } from './pages/Materials';
import { Calculator } from './pages/Calculator';
import { Stock } from './pages/Stock';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { Login } from './pages/Login';

const AppContent: React.FC = () => {
  const { isAuthenticated, settings } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply theme class to HTML element
  React.useEffect(() => {
    if (settings.appearance.theme === 'Escuro') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.appearance.theme]);

  // Apply font size based on density
  React.useEffect(() => {
    if (settings.appearance.density === 'COMPACTO') {
        document.documentElement.style.fontSize = '14px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
  }, [settings.appearance.density]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-black border-b-4 border-primary p-4 flex items-center justify-between lg:hidden shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="text-black dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-black dark:text-white text-xl font-bold uppercase">
            {settings.company.name || 'MARCENARIA'}
          </h1>
          <div className="w-8"></div> {/* Placeholder for balance */}
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark custom-scrollbar">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/materias" element={<Materials />} />
            <Route path="/estoques" element={<Stock />} />
            <Route path="/calculadora" element={<Calculator />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/ajuda" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;