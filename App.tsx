
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { VehicleTable } from './components/VehicleTable';
import { ServiceLogTable } from './components/ServiceLogTable'; 
import { TaxKirTable } from './components/TaxKirTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { VehicleContractTable } from './components/VehicleContractTable';
import { BuildingTable } from './components/BuildingTable';
import { ReminderTable } from './components/ReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_REMINDER_DATA, 
  MOCK_GENERAL_MASTER_DATA,
  MOCK_DATA as MOCK_ATK_DATA,
  MOCK_ARK_DATA,
  MOCK_MASTER_DATA as MOCK_ATK_MASTER,
  MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA,
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
  MOCK_DELIVERY_LOCATIONS
} from './constants';
import { 
  VehicleRecord, 
  ServiceRecord, 
  TaxKirRecord, 
  VehicleContractRecord, 
  BuildingRecord, 
  ReminderRecord, 
  GeneralMasterItem,
  AssetRecord,
  LogBookRecord,
  MasterItem,
  DeliveryLocationRecord,
  StationeryRequestRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Request ATK');
  const [activeTab, setActiveTab] = useState('Semua');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES (Agar UI Clickable/Dinamis)
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [serviceData, setServiceData] = useState<ServiceRecord[]>([]);
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);

  // MODAL STATES
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [isVehicleContractModalOpen, setIsVehicleContractModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    setActiveTab('Semua');
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    if (activeModule === 'Request ATK' || activeModule === 'Daftar ARK') {
      setIsStockModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
      setIsVehicleModalOpen(true);
    } else if (activeModule === 'Kontrak Gedung') {
      setIsBuildingModalOpen(true);
    } else if (activeModule === 'Servis') {
      setIsServiceModalOpen(true);
    } else if (activeModule === 'Pajak & KIR') {
      setIsTaxKirModalOpen(true);
    } else if (activeModule === 'Kontrak Kendaraan') {
      setIsVehicleContractModalOpen(true);
    }
  };

  // HANDLER UNTUK MENAMBAH DATA (Logic Clickable)
  const handleSaveStationeryRequest = (request: Partial<StationeryRequestRecord>) => {
    const isArk = activeModule === 'Daftar ARK';
    const newRecords: AssetRecord[] = (request.items || []).map((item, idx) => ({
      id: Date.now() + idx,
      transactionNumber: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      employee: {
        name: 'Ibnu Faisal Abbas',
        role: 'GA Administrator',
        phone: '0812-XXXX-XXXX',
        avatar: 'https://picsum.photos/id/1005/100/100'
      },
      category: isArk ? 'HOUSEHOLD' : 'STATIONERY',
      itemName: 'Item Baru', // Dalam sistem nyata, ambil dari master
      itemDescription: request.remarks || '',
      qty: parseInt(item.qty) || 1,
      date: new Date().toLocaleDateString('id-ID'),
      remainingStock: 100,
      itemCode: 'NEW-ITEM',
      status: 'Pending'
    }));

    if (isArk) setArkData(prev => [...newRecords, ...prev]);
    else setAtkData(prev => [...newRecords, ...prev]);
    
    setIsStockModalOpen(false);
  };

  const renderContent = () => {
     switch(activeModule) {
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={arkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar Aset':
            return <VehicleTable data={vehicleData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Kontrak Gedung':
            return <BuildingTable data={buildingData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Servis':
            return <ServiceLogTable data={serviceData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Pajak & KIR':
            return <TaxKirTable data={taxKirData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Log Book':
            return <LogBookTable data={logBookData} onEdit={()=>{}} onView={()=>{}} />;
         default:
            return <div className="p-8 text-center text-gray-500">Modul {activeModule} sedang dalam pengembangan.</div>;
     }
  };

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden text-black">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobileMenu} />}

      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={toggleMobileMenu}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <TopBar breadcrumbs={['Beranda', t(activeModule)]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-[20px] font-bold text-black tracking-tight">{t(activeModule)}</h1>
            </div>
            
            <FilterBar 
                tabs={['Semua', 'Pending', 'Approved', 'Rejected']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick}
                moduleName={activeModule}
            />
            
            {renderContent()}
          </div>
        </main>
      </div>

      {/* MODALS */}
      <AddStockModal 
        isOpen={isStockModalOpen} 
        onClose={() => setIsStockModalOpen(false)} 
        moduleName={activeModule}
        mode={modalMode}
        initialAssetData={selectedAsset || undefined}
        onSaveStationeryRequest={handleSaveStationeryRequest}
      />

      <VehicleModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
        onSave={(data) => { setVehicleData(prev => [{id: Date.now(), ...data} as VehicleRecord, ...prev]); setIsVehicleModalOpen(false); }} 
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen} 
        onClose={() => setIsBuildingModalOpen(false)} 
        onSave={(data) => { setBuildingData(prev => [{id: Date.now().toString(), ...data} as BuildingRecord, ...prev]); setIsBuildingModalOpen(false); }} 
      />

      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        onSave={(data) => { setServiceData(prev => [{id: `SRV-${Date.now()}`, ...data} as ServiceRecord, ...prev]); setIsServiceModalOpen(false); }} 
        vehicleList={vehicleData}
      />

      <TaxKirModal 
        isOpen={isTaxKirModalOpen} 
        onClose={() => setIsTaxKirModalOpen(false)} 
        onSave={(data) => { setTaxKirData(prev => [{id: `TAX-${Date.now()}`, ...data} as TaxKirRecord, ...prev]); setIsTaxKirModalOpen(false); }} 
        vehicleList={vehicleData}
      />
    </div>
  );
};

export default App;
