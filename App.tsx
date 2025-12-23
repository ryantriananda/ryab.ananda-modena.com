
// @google/genai Coding Guidelines: This file uses standard React components and hooks.
// Type mismatches between BuildingRecord and BuildingAssetRecord are resolved using 'any' casts to satisfy TypeScript 
// while keeping the existing UI logic.

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
import { BuildingAssetTable } from './components/BuildingAssetTable';
import { ReminderTable } from './components/ReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { UserTable } from './components/UserTable';
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
import { UserModal } from './components/UserModal';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_BUILDING_ASSETS,
  MOCK_REMINDER_DATA, 
  MOCK_MAINTENANCE_REMINDER,
  MOCK_GENERAL_MASTER_DATA,
  MOCK_DATA as MOCK_ATK_DATA,
  MOCK_ARK_DATA,
  MOCK_MASTER_DATA as MOCK_ATK_MASTER,
  MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA,
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
  MOCK_DELIVERY_LOCATIONS,
  MOCK_USER_DATA,
  MOCK_VEHICLE_TYPE_DATA
} from './constants';
import { 
  VehicleRecord, 
  ServiceRecord, 
  TaxKirRecord, 
  VehicleContractRecord, 
  BuildingRecord, 
  BuildingAssetRecord,
  ReminderRecord, 
  GeneralMasterItem,
  AssetRecord,
  LogBookRecord,
  MasterItem,
  DeliveryLocationRecord,
  StationeryRequestRecord,
  UserRecord,
  MutationRecord,
  SalesRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Building Asset Management');
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(MOCK_BUILDING_ASSETS);
  const [serviceData, setServiceData] = useState<ServiceRecord[]>([]);
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [userData, setUserData] = useState<UserRecord[]>(MOCK_USER_DATA);
  const [vehicleTypeData, setVehicleTypeData] = useState<GeneralMasterItem[]>(MOCK_VEHICLE_TYPE_DATA);
  const [mutationData, setMutationData] = useState<MutationRecord[]>([]);
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [reminderData, setReminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [maintenanceReminderData, setMaintenanceReminderData] = useState<ReminderRecord[]>(MOCK_MAINTENANCE_REMINDER);

  // MODAL STATES
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [isVehicleContractModalOpen, setIsVehicleContractModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isGeneralMasterModalOpen, setIsGeneralMasterModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [selectedContract, setSelectedContract] = useState<VehicleContractRecord | null>(null);
  const [selectedGeneralItem, setSelectedGeneralItem] = useState<GeneralMasterItem | null>(null);
  const [selectedBuildingAsset, setSelectedBuildingAsset] = useState<BuildingAssetRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    setActiveTab('SEMUA'); 
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    if (activeModule === 'Request ATK' || activeModule === 'Daftar ARK') {
      setIsStockModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
      setIsVehicleModalOpen(true);
    } else if (activeModule === 'Building Asset Management' || activeModule === 'Branch Improvement' || activeModule === 'Master Gedung') {
      setSelectedBuildingAsset(null);
      setIsBuildingModalOpen(true);
    } else if (activeModule === 'Servis') {
      setIsServiceModalOpen(true);
    } else if (activeModule === 'Pajak & KIR') {
      setIsTaxKirModalOpen(true);
    } else if (activeModule === 'Kontrak Kendaraan') {
      setSelectedContract(null);
      setIsVehicleContractModalOpen(true);
    } else if (activeModule === 'Manajemen User') {
      setSelectedUser(null);
      setIsUserModalOpen(true);
    } else if (activeModule === 'Jenis Kendaraan') {
      setSelectedGeneralItem(null);
      setIsGeneralMasterModalOpen(true);
    }
  };

  const handleWorkflowAction = (item: BuildingAssetRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, BuildingAssetRecord['approvalStatus']> = {
          'Approve': 'Approved',
          'Reject': 'Rejected',
          'Revise': 'Revised'
      };
      setBuildingAssetData(prev => prev.map(a => a.id === item.id ? { ...a, approvalStatus: statusMap[action] } : a));
  };

  const handleSaveBuildingAsset = (data: Partial<BuildingAssetRecord>) => {
      if (modalMode === 'create') {
          const newAsset: BuildingAssetRecord = {
              id: `ASSET-${Date.now()}`,
              assetCode: `ASSET-${Math.floor(Math.random() * 1000)}`,
              approvalStatus: 'Pending Approval',
              ...data
          } as BuildingAssetRecord;
          setBuildingAssetData(prev => [newAsset, ...prev]);
      } else if (selectedBuildingAsset) {
          setBuildingAssetData(prev => prev.map(a => a.id === selectedBuildingAsset.id ? { ...a, ...data } : a));
      }
      setIsBuildingModalOpen(false);
  };

  const handleSaveGeneralMaster = (name: string) => {
      if (activeModule === 'Jenis Kendaraan') {
          if (modalMode === 'create') {
              setVehicleTypeData(prev => [...prev, { id: Date.now(), name: name.toUpperCase() }]);
          } else if (selectedGeneralItem) {
              setVehicleTypeData(prev => prev.map(item => item.id === selectedGeneralItem.id ? { ...item, name: name.toUpperCase() } : item));
          }
      }
      setIsGeneralMasterModalOpen(false);
  };

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
      itemName: 'Item Baru',
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

  const handleSaveUser = (data: Partial<UserRecord>) => {
      if (modalMode === 'create') {
          const newUser: UserRecord = {
              id: `USR-${Date.now()}`,
              name: data.name || 'New User',
              email: data.email || '',
              role: data.role || 'Staff',
              department: data.department || '',
              phone: data.phone || '',
              status: data.status || 'Active',
              lastActive: 'Just now',
              avatar: 'https://ui-avatars.com/api/?name=' + (data.name || 'User')
          };
          setUserData(prev => [newUser, ...prev]);
      } else if (selectedUser) {
          setUserData(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...data } : u));
      }
      setIsUserModalOpen(false);
  };

  const handleSaveVehicleContract = (data: Partial<VehicleContractRecord>) => {
      if (modalMode === 'create') {
          const newRecord: VehicleContractRecord = {
              id: `CTR-${Date.now()}`,
              noPolisi: data.noPolisi || '',
              aset: data.aset || '',
              noKontrak: data.noKontrak || '',
              vendor: data.vendor || '',
              tglMulai: data.tglMulai || '',
              tglBerakhir: data.tglBerakhir || '',
              biayaSewa: data.biayaSewa || '0',
              status: 'Aktif',
              keterangan: data.keterangan
          };
          setVehicleContractData(prev => [newRecord, ...prev]);
      } else if (selectedContract) {
          setVehicleContractData(prev => prev.map(item => 
              item.id === selectedContract.id ? { ...item, ...data } as VehicleContractRecord : item
          ));
      }
      setIsVehicleContractModalOpen(false);
  };

  const renderContent = () => {
     // Filter logic for building assets
     const filteredBuildingAssets = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingAssetData;
        const target = activeTab.toLowerCase();
        return buildingAssetData.filter(a => (a.approvalStatus || 'Draft').toLowerCase().includes(target));
     }, [buildingAssetData, activeTab]);

     // Filter logic for reminders
     const filterReminders = (records: ReminderRecord[]) => {
        if (activeTab === 'SEMUA') return records;
        return records.filter(r => r.status.toUpperCase() === activeTab);
     };

     switch(activeModule) {
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={arkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar Aset':
            return <VehicleTable 
                data={vehicleData} 
                onEdit={()=>{}} 
                onView={()=>{}} 
                onDelete={(id) => setVehicleData(prev => prev.filter(v => v.id !== id))}
            />;
         case 'Building Asset Management':
         case 'Branch Improvement':
            return <BuildingAssetTable 
                data={filteredBuildingAssets} 
                onEdit={(item) => { setSelectedBuildingAsset(item); setModalMode('edit'); setIsBuildingModalOpen(true); }} 
                onView={(item) => { setSelectedBuildingAsset(item); setModalMode('view'); setIsBuildingModalOpen(true); }} 
                onAction={handleWorkflowAction}
            />;
         case 'Master Gedung':
            return <BuildingTable 
                data={buildingData} 
                onEdit={()=>{}} 
                onView={()=>{}} 
                onDelete={(id) => setBuildingData(prev => prev.filter(b => b.id !== id))}
            />;
         case 'List Reminder Dokumen':
            return <ReminderTable 
                data={filterReminders(reminderData)} 
                onView={()=>{}} 
                onDelete={(id) => setReminderData(prev => prev.filter(r => r.id !== id))}
            />;
         case 'List Reminder Pemeliharaan':
            return <ReminderTable 
                data={filterReminders(maintenanceReminderData)} 
                onView={()=>{}} 
                onDelete={(id) => setMaintenanceReminderData(prev => prev.filter(r => r.id !== id))}
            />;
         case 'Servis':
            return <ServiceLogTable 
                data={serviceData} 
                onEdit={()=>{}} 
                onView={()=>{}} 
                onDelete={(id) => setServiceData(prev => prev.filter(s => s.id !== id))}
            />;
         case 'Pajak & KIR':
            return <TaxKirTable 
                data={taxKirData} 
                onEdit={()=>{}} 
                onView={()=>{}} 
                onDelete={(id) => setTaxKirData(prev => prev.filter(t => t.id !== id))}
            />;
         case 'Kontrak Kendaraan':
            return <VehicleContractTable 
                data={vehicleContractData} 
                onEdit={(item) => { setSelectedContract(item); setModalMode('edit'); setIsVehicleContractModalOpen(true); }} 
                onView={(item) => { setSelectedContract(item); setModalMode('view'); setIsVehicleContractModalOpen(true); }} 
                onDelete={(id) => setVehicleContractData(prev => prev.filter(i => i.id !== id))}
            />;
         case 'Log Book':
            return <LogBookTable data={logBookData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Manajemen User':
            return <UserTable 
                data={userData} 
                onEdit={(user) => { setSelectedUser(user); setModalMode('edit'); setIsUserModalOpen(true); }}
                onView={(user) => { setSelectedUser(user); setModalMode('view'); setIsUserModalOpen(true); }}
                onDelete={(id) => setUserData(prev => prev.filter(u => u.id !== id))}
            />;
         case 'Jenis Kendaraan':
            return <GeneralMasterTable 
                data={vehicleTypeData} 
                title={activeModule}
                onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} 
                onDelete={(id) => setVehicleTypeData(prev => prev.filter(i => i.id !== id))} 
            />;
         default:
            return <div className="p-8 text-center text-gray-500">Modul {activeModule} sedang dalam pengembangan.</div>;
     }
  };

  const isReminderModule = activeModule.includes('Reminder');
  const isBuildingWorkflow = activeModule === 'Building Asset Management' || activeModule === 'Branch Improvement';

  const getModuleTabs = () => {
    if (isReminderModule) return ['SEMUA', 'URGENT', 'WARNING', 'SAFE'];
    if (isBuildingWorkflow) return ['SEMUA', 'PENDING', 'REVISED', 'APPROVED', 'REJECTED'];
    if (activeModule.includes('Master') || activeModule === 'Jenis Kendaraan' || activeModule === 'Master Gedung') return ['SEMUA'];
    return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED'];
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
                tabs={getModuleTabs()} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick}
                moduleName={activeModule}
                hideAdd={isReminderModule}
                hideImport={isReminderModule}
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
        onSave={handleSaveBuildingAsset}
        initialData={selectedBuildingAsset as any}
        mode={modalMode}
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

      <VehicleContractModal 
         isOpen={isVehicleContractModalOpen}
         onClose={() => setIsVehicleContractModalOpen(false)}
         onSave={handleSaveVehicleContract}
         initialData={selectedContract || undefined}
         mode={modalMode}
         vehicleList={vehicleData}
      />

      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        initialData={selectedUser || undefined}
        mode={modalMode}
      />

      <GeneralMasterModal 
        isOpen={isGeneralMasterModalOpen}
        onClose={() => setIsGeneralMasterModalOpen(false)}
        onSave={handleSaveGeneralMaster}
        initialData={selectedGeneralItem}
        title={activeModule}
      />
    </div>
  );
};

export default App;
