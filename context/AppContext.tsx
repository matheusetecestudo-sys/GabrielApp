import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, Product, Material, AppSettings, TimeRange } from '../types';
import { useSession } from './SessionContext'; // Importar useSession
import { supabase } from '../integrations/supabase/client'; // Importar supabase client

interface AppContextType {
  orders: Order[];
  products: Product[];
  materials: Material[];
  settings: AppSettings;
  isAuthenticated: boolean; // Agora vem do SessionContext
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  login: () => void; // Será removido ou adaptado
  logout: () => void; // Será adaptado para Supabase
  addOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, delta: number) => void;
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (id: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  importData: (json: string) => boolean;
  exportData: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to check for late orders
const processLateOrders = (currentOrders: Order[]): Order[] => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let hasChanges = false;

    const updatedOrders = currentOrders.map(order => {
        if (order.status === 'CONCLUÍDO' || order.status === 'CANCELADO') return order;

        if (order.deadline < today && order.status !== 'ATRASADO') {
            hasChanges = true;
            return { ...order, status: 'ATRASADO' as const };
        }

        if (order.deadline >= today && order.status === 'ATRASADO') {
            hasChanges = true;
            return { ...order, status: 'PENDENTE' as const };
        }

        return order;
    });

    return hasChanges ? updatedOrders : currentOrders;
};

// Gerador de datas para simulação
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
const lastMonth = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

const initialOrders: Order[] = [
  { 
    id: '#1275', 
    client: 'Ana Souza', 
    items: [{ productId: '4', productName: 'Armário de Cozinha', quantity: 1, unitPrice: 2500.00, total: 2500.00 }],
    deadline: '2023-12-25', 
    createdAt: lastMonth, 
    status: 'ATRASADO', 
    origin: 'FISICO',
    shippingCost: 150.00,
    totalValue: 2650.00 
  },
  { 
    id: '#1024', 
    client: 'Lancelot', 
    items: [
        { productId: '1', productName: 'Banco Távola', quantity: 4, unitPrice: 450.00, total: 1800.00 }
    ],
    deadline: '2025-12-20', 
    createdAt: today, 
    status: 'PENDENTE', 
    origin: 'ONLINE',
    shippingCost: 0,
    totalValue: 1800.00 
  },
  { 
    id: '#1023', 
    client: 'Guinevere', 
    items: [
        { productId: '2', productName: 'Penteadeira Lago', quantity: 1, unitPrice: 2200.00, total: 2200.00 }
    ],
    deadline: '2024-11-10', 
    createdAt: lastWeek, 
    status: 'CONCLUÍDO', 
    origin: 'FISICO',
    shippingCost: 100.00,
    totalValue: 2300.00 
  },
  { 
    id: '#1022', 
    client: 'Merlin', 
    items: [
        { productId: '3', productName: 'Estante Magia', quantity: 1, unitPrice: 3500.00, total: 3500.00 }
    ],
    deadline: '2023-05-01', 
    createdAt: lastMonth,
    status: 'ATRASADO', 
    origin: 'ONLINE',
    shippingCost: 50.00,
    totalValue: 3550.00 
  },
  { 
    id: '#1020', 
    client: 'Gawain', 
    items: [
        { productId: '5', productName: 'Escudo Decorativo', quantity: 2, unitPrice: 450.00, total: 900.00 }
    ],
    deadline: '2025-12-15', 
    createdAt: yesterday, 
    status: 'PENDENTE', 
    origin: 'ONLINE',
    shippingCost: 30.00,
    totalValue: 930.00 
  },
];

const initialProducts: Product[] = [
  { 
    id: '1', name: 'Mesa de Jantar Rústica', sku: 'MDR-001', 
    materials: ['Madeira Carvalho: 2', 'Parafusos: 30'], cost: 450.75, stock: 12, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPsFZ0PWEuMgi-oU-D5MhOFLhdwx8lyD3IPhsMOpALeZ9gAVXLIKQi1aQrdmwH1gHhZXiS2cILepiPqVrPOdq8BWeyunyuRzw-5MWjIU0nmGtQqZ3YdTjKb33ezc-EZFMuoGK4CcrvSHuVeZ50wSIY4ts6LCKzDLNUm0QgrySuVFauPijHFbuEOX9vasCfTDFT9Z2WCsw93k6WVoLk67eKBs-iOXo7znSlk4mcUYGfNgYZvN2pm03cbxtlEDjRdAU3eLtbZx92F-w6' 
  },
  { 
    id: '2', name: 'Cadeira de Escritório', sku: 'CDR-002', 
    materials: ['Pinus: 1.5', 'Rodízios: 4'], cost: 210.50, stock: 25, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzK8ufcIkbes8JfrV4e0aceOzAeVAxalVx59lX2OwgKoIJjmvYdgJ9kXgt0Q6QYuoosHSD8_vDM8WjUu8jDahYKUxgQx9WrP--8yCcxFAjkqmkb23r3MEGXRFwairU1VaSaYpbRooUhLEaxwxXOn4wQtSgGGQhXX2NeZsxKPkDaeM4_xt0N8KAbUt0Q7oqRKe4ymUNj6tgUagLIhO8DpZtel7ycw4bLY31beQvpvukbmbqfiAzoRufh-kgW6m4-HjcGysPj1dYcIzK' 
  },
  { 
    id: '3', name: 'Estante Modular', sku: 'EST-003', 
    materials: ['Chapa de MDF 18mm: 5', 'Suportes: 16'], cost: 320.00, stock: 8, 
    image: 'https://picsum.photos/400/400?random=3' 
  },
  { 
    id: '4', name: 'Bancada de Cozinha', sku: 'BNC-004', 
    materials: ['Granito: 3', 'Cola Epóxi: 1'], cost: 850.00, stock: 5, 
    image: 'https://picsum.photos/400/400?random=4' 
  },
];

const initialMaterials: Material[] = [
  { id: '1', name: 'Chapa de MDF 18mm', unit: 'm²', costPerUnit: 85.00, stock: 150, minStock: 20 },
  { id: '2', name: 'Parafuso Phillips 3.5x40', unit: 'un', costPerUnit: 0.15, stock: 12, minStock: 50 },
  { id: '3', name: 'Dobradiça Reta 35mm', unit: 'un', costPerUnit: 3.50, stock: 48, minStock: 20 },
  { id: '4', name: 'Cola Branca PVA Extra', unit: 'L', costPerUnit: 25.00, stock: 8, minStock: 5 },
  { id: '5', name: 'Tinta Acrílica Branca', unit: 'L', costPerUnit: 95.00, stock: 22, minStock: 10 },
  { id: '6', name: 'Verniz Premium', unit: 'L', costPerUnit: 45.00, stock: 8, minStock: 10 },
  { id: '7', name: 'Lixa Grão 120', unit: 'un', costPerUnit: 2.00, stock: 200, minStock: 50 },
  { id: '8', name: 'Madeira Carvalho', unit: 'm²', costPerUnit: 120.00, stock: 50, minStock: 10 },
  { id: '9', name: 'Pinus', unit: 'm²', costPerUnit: 40.00, stock: 100, minStock: 20 },
];

const defaultSettings: AppSettings = {
  company: {
    name: 'MARCENARIA BRUTAL',
    slogan: 'Painel de Controle',
    cnpj: '',
    contact: '',
    logo: ''
  },
  notifications: { lowStock: true, deadlines: true },
  appearance: { 
      theme: 'Escuro', 
      density: 'COMPACTO',
      layoutMode: 'FLUIDO' 
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSession(); // Obter isAuthenticated do SessionContext
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [timeRange, setTimeRange] = useState<TimeRange>('TUDO');
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app-settings');
    const parsed = saved ? JSON.parse(saved) : defaultSettings;
    const safeSettings = { ...defaultSettings, ...parsed };
    
    // Migrations / Safety Checks
    if (!safeSettings.company) safeSettings.company = defaultSettings.company;
    
    // Default layout if missing
    if (safeSettings.appearance.layoutMode === undefined) {
        safeSettings.appearance.layoutMode = 'FLUIDO';
    }
    
    // Default density if missing
    if (safeSettings.appearance.density === undefined) {
        safeSettings.appearance.density = 'COMPACTO';
    }

    return safeSettings;
  });

  useEffect(() => {
    setOrders(currentOrders => processLateOrders(currentOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    
    // Theme Apply
    if (settings.appearance.theme === 'Escuro') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Density Apply
    if (settings.appearance.density === 'COMPACTO') {
        document.documentElement.style.fontSize = '14px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }

  }, [settings]);

  // Login e Logout agora são gerenciados pelo Supabase, mas mantemos as funções para compatibilidade
  const login = () => {
      // A autenticação é gerenciada pelo SessionContext e Supabase
      console.log("Login handled by Supabase Auth UI");
  };

  const logout = async () => {
      await supabase.auth.signOut();
      console.log("Logged out via Supabase");
  };

  const adjustMaterialsForOrder = (order: Order, currentMats: Material[], action: 'CONSUME' | 'RESTORE') => {
      const updatedMaterials = [...currentMats];
      
      order.items.forEach(item => {
          const product = products.find(p => p.id === item.productId);
          if (product && product.materials) {
              product.materials.forEach(matStr => {
                  const [matName, qtyStr] = matStr.split(':');
                  const qtyPerUnit = parseFloat(qtyStr) || 0;
                  const totalRequired = qtyPerUnit * item.quantity;

                  // Use loose matching to find material
                  const matIndex = updatedMaterials.findIndex(m => m.name.toLowerCase().includes(matName.trim().toLowerCase()));
                  if (matIndex > -1) {
                      if (action === 'CONSUME') {
                          updatedMaterials[matIndex].stock -= totalRequired;
                      } else {
                          updatedMaterials[matIndex].stock += totalRequired;
                      }
                  }
              });
          }
      });
      return updatedMaterials;
  };

  const addOrder = (order: Order) => {
    const newOrder = { 
        ...order, 
        createdAt: order.createdAt || new Date().toISOString().split('T')[0] 
    };
    const processedOrder = processLateOrders([newOrder])[0];

    setOrders(prev => [processedOrder, ...prev]);

    // Deduct Product Stock immediately upon order creation
    const updatedProducts = [...products];
    order.items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex > -1) {
            updatedProducts[productIndex].stock -= item.quantity;
        }
    });
    setProducts(updatedProducts);
  };

  const deleteOrder = (id: string) => {
    const orderToDelete = orders.find(o => o.id === id);
    if (!orderToDelete) return;

    if (orderToDelete.status !== 'CONCLUÍDO') {
        // Restore Product Stock if not completed (since it was reserved)
        const updatedProducts = [...products];
        orderToDelete.items.forEach(item => {
            const idx = updatedProducts.findIndex(p => p.id === item.productId);
            if (idx > -1) updatedProducts[idx].stock += item.quantity;
        });
        setProducts(updatedProducts);
    }

    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
      const orderIndex = orders.findIndex(o => o.id === id);
      if (orderIndex === -1) return;

      const order = orders[orderIndex];
      const oldStatus = order.status;

      // Logic for Material Consumption/Restoration
      if (oldStatus !== 'CONCLUÍDO' && newStatus === 'CONCLUÍDO') {
          // Consume Materials
          const newMats = adjustMaterialsForOrder(order, materials, 'CONSUME');
          setMaterials(newMats);
      } else if (oldStatus === 'CONCLUÍDO' && newStatus !== 'CONCLUÍDO') {
          // Restore Materials
          const newMats = adjustMaterialsForOrder(order, materials, 'RESTORE');
          setMaterials(newMats);
      }

      const updatedOrders = [...orders];
      updatedOrders[orderIndex].status = newStatus;
      setOrders(updatedOrders);
  };

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  
  const updateProduct = (product: Product) => {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const updateProductStock = (id: string, delta: number) => {
      setProducts(prev => prev.map(p => {
          if (p.id === id) return { ...p, stock: Math.max(0, p.stock + delta) };
          return p;
      }));
  };

  const addMaterial = (material: Material) => setMaterials(prev => [...prev, material]);

  const updateMaterial = (material: Material) => {
      setMaterials(prev => prev.map(m => m.id === material.id ? material : m));
  };

  const deleteMaterial = (id: string) => setMaterials(prev => prev.filter(m => m.id !== id));

  const updateSettings = (newSettings: Partial<AppSettings>) => {
      setSettings(prev => {
          const updated = { ...prev, ...newSettings };
          if (newSettings.company) updated.company = { ...prev.company, ...newSettings.company };
          if (newSettings.notifications) updated.notifications = { ...prev.notifications, ...newSettings.notifications };
          if (newSettings.appearance) updated.appearance = { ...prev.appearance, ...newSettings.appearance };
          return updated;
      });
  };

  const importData = (json: string): boolean => {
      try {
          const data = JSON.parse(json);
          if (data.orders && data.products && data.materials && data.settings) {
              setOrders(data.orders);
              setProducts(data.products);
              setMaterials(data.materials);
              setSettings(data.settings);
              return true;
          }
          return false;
      } catch (e) {
          console.error("Import failed", e);
          return false;
      }
  };

  const exportData = () => {
      const data = { orders, products, materials, settings };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
  };

  const resetApp = () => {
      setOrders(initialOrders);
      setProducts(initialProducts);
      setMaterials(initialMaterials);
      setSettings(defaultSettings);
      localStorage.removeItem('app-settings');
  };

  return (
    <AppContext.Provider value={{
      orders, products, materials, settings, isAuthenticated, timeRange, setTimeRange,
      login, logout, addOrder, deleteOrder, updateOrderStatus,
      addProduct, updateProduct, deleteProduct, updateProductStock,
      addMaterial, updateMaterial, deleteMaterial,
      updateSettings, importData, exportData, resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};