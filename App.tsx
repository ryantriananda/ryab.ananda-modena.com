
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TaxKirTable } from './components/TaxKirTable';
import { TaxKirModal } from './components/TaxKirModal';
import { FilterBar } from './components/FilterBar';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_LOCATION_DATA 
} from './constants';
import { TaxKirRecord, VehicleRecord, GeneralMasterItem } from './types';

// Helper function to get initial data from localStorage or fallback
const getInitialData = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing localStorage data", e);
    }
  }
  return defaultValue;
};

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data States
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [locationData, setLocationData] = useState<GeneralMasterItem[]>(() => getInitialData('locationData', MOCK_LOCATION_DATA));
  
  // Master Data States (referenced in the error snippet)
  const [syncBranchData, setSyncBranchData] = useState<GeneralMasterItem[]>(() => getInitialData('syncBranchData', []));
  const [syncChannelData, setSyncChannelData] = useState<GeneralMasterItem[]>(() => getInitialData('syncChannelData', []));

  // Modal States
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [selectedTaxKir, setSelectedTaxKir] = useState<TaxKirRecord | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Basic layout handling
  const handleNavigate = (item: string) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  };

  const handleAddTaxKir = () => {
    setSelectedTaxKir(undefined);
    setModalMode('create');
    setIsTaxKirModalOpen(true);
  };

  const handleSaveTaxKir = (data: Partial<TaxKirRecord>) => {
    if (modalMode === 'create') {
        const newItem: TaxKirRecord = {
            id: `TAX-${Date.now()}`,
            ...data
        } as TaxKirRecord;
        setTaxKirData(prev => [newItem, ...prev]);
    } else if (modalMode === 'edit' && selectedTaxKir) {
        setTaxKirData(prev => prev.map(item => item.id === selectedTaxKir.id ? { ...item, ...data } : item));
    }
    setIsTaxKirModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden font-sans text-gray-900">
      <Sidebar 
        activeItem={activeItem} 
        onNavigate={handleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopBar breadcrumbs={['Home', activeItem]} onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            
            {activeItem === 'Pajak & KIR' && (
              <>
                <FilterBar 
                  tabs={['Semua', 'Pajak STNK', 'KIR', 'Persetujuan']} 
                  activeTab={'Semua'} 
                  onTabChange={() => {}} 
                  onAddClick={handleAddTaxKir} 
                  customAddLabel="Buat Pengajuan"
                />
                <TaxKirTable 
                  data={taxKirData} 
                  onEdit={(item) => { setSelectedTaxKir(item); setModalMode('edit'); setIsTaxKirModalOpen(true); }}
                  onView={(item) => { setSelectedTaxKir(item); setModalMode('view'); setIsTaxKirModalOpen(true); }}
                  onDelete={(id) => setTaxKirData(prev => prev.filter(i => i.id !== id))}
                />
              </>
            )}

            {/* Placeholder for other modules */}
            {activeItem !== 'Pajak & KIR' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
                <p className="text-lg font-bold uppercase tracking-widest">Module {activeItem}</p>
                <p className="text-sm">Content not loaded in this preview</p>
              </div>
            )}

          </div>
        </main>
      </div>

      <TaxKirModal 
        isOpen={isTaxKirModalOpen} 
        onClose={() => setIsTaxKirModalOpen(false)} 
        onSave={handleSaveTaxKir} 
        initialData={selectedTaxKir}
        mode={modalMode}
        vehicleList={vehicleData}
        channelList={syncChannelData} 
        branchList={locationData} 
      />
    </div>
  );
};

export default App;
