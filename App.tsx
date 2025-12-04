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
import { TestComponent } from './components/TestComponent'; // Importar o componente de teste

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

  // Temporariamente renderizando apenas o TestComponent para depuração
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark custom-scrollbar">
          <TestComponent />
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