
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
  GeneralAssetRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Servis');
  const [activeTab, setActiveTab] = useState('Semua');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData, setServiceData] = useState<ServiceRecord[]>([
    {
        id: 'S202500003',
        noPolisi: '',
        aset: '',
        tglRequest: '2025-12-22',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-',
        spareParts: []
    },
    {
        id: 'S2024060003',
        noPolisi: 'B 9433 CCA',
        aset: 'Toyota Avanza',
        tglRequest: '28 Jun 2024 17:24',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-',
        spareParts: []
    },
    {
        id: 'SRV/2024/001',
        noPolisi: 'B 1234 CD',
        aset: 'Grand Max Blind Van',
        tglRequest: '10 Feb 2024 10:00',
        channel: 'HCO',
        cabang: 'Jakarta',
        status: 'Selesai',
        statusApproval: 'Approved',
        jenisServis: 'Servis Rutin',
        vendor: 'Daihatsu Service Center',
        kmKendaraan: '45000',
        masalah: 'Suara mesin kasar and tarikan berat pada tanjakan',
        estimasiBiaya: '1250000',
        spareParts: []
    }
  ]);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [masterVendors] = useState(MOCK_MASTER_VENDOR_DATA);
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster, setAtkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster, setArkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  
  const [uomList, setUomList] = useState<GeneralMasterItem[]>(MOCK_UOM_DATA);
  const [atkCategories, setAtkCategories] = useState<GeneralMasterItem[]>(MOCK_ATK_CATEGORY);
  const [arkCategories, setArkCategories] = useState<GeneralMasterItem[]>(MOCK_ARK_CATEGORY);
  const [delivLocations, setDelivLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);

  const [masterLists, setMasterLists] = useState<Record<string, GeneralMasterItem[]>>({
    'Jenis Pajak': MOCK_GENERAL_MASTER_DATA.jenisPajak,
    'Jenis Pembayaran': MOCK_GENERAL_MASTER_DATA.jenisPembayaran,
    'Jenis Servis': MOCK_GENERAL_MASTER_DATA.jenisServis,
    'Status Mutasi': MOCK_GENERAL_MASTER_DATA.statusMutasi,
    'Status Penjualan': MOCK_GENERAL_MASTER_DATA.statusPenjualan,
    'Status Request': MOCK_GENERAL_MASTER_DATA.statusRequest,
    'Tipe Mutasi': MOCK_GENERAL_MASTER_DATA.tipeMutasi,
    'Tipe Vendor': MOCK_GENERAL_MASTER_DATA.tipeVendor,
    'Peran': MOCK_GENERAL_MASTER_DATA.peran,
  });
  
  // Modal States
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isMasterItemModalOpen, setIsMasterItemModalOpen] = useState(false);
  const [isDeliveryLocationModalOpen, setIsDeliveryLocationModalOpen] = useState(false);
  const [isAssetGeneralModalOpen, setIsAssetGeneralModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);
  const [selectedMasterProduct, setSelectedMasterProduct] = useState<MasterItem | null>(null);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState<DeliveryLocationRecord | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Kontrak Gedung') setActiveTab('Milik Sendiri');
    else if (module === 'Daftar Aset') setActiveTab('Aktif');
    else if (module.includes('Master')) setActiveTab('Items');
    else if (module === 'Log Book') setActiveTab(''); 
    else if (module === 'Servis') setActiveTab('Semua');
    else setActiveTab('Semua');
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedLogBook(null);
    setSelectedAsset(null);
    setSelectedMasterProduct(null);
    setSelectedDeliveryLocation(null);
    setSelectedBuilding(null);
    setSelectedService(null);

    if (activeModule === 'Kontrak Gedung') {
        setIsBuildingModalOpen(true); // Fixed: Open BuildingModal for comparison feature
    } else if (activeModule === 'Servis') {
        setIsServiceModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
        setIsVehicleModalOpen(true);
    } else if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        if (activeTab === 'UOM' || activeTab === 'Category') setIsMasterModalOpen(true);
        else if (activeTab === 'Delivery Location') setIsDeliveryLocationModalOpen(true);
        else setIsMasterItemModalOpen(true);
    } else if (activeModule.includes('ATK') || activeModule.includes('ARK') || activeModule === 'Log Book') {
        setIsStockModalOpen(true);
    } else if (masterLists[activeModule]) {
        setIsMasterModalOpen(true);
    }
  };

  const handleSaveBuilding = (data: Partial<BuildingRecord>) => {
    if (modalMode === 'create') {
        const newBuilding: BuildingRecord = {
            id: Date.now().toString(),
            name: data.name || 'Gedung Baru',
            assetNo: data.assetNo || `BDG-${Date.now()}`,
            type: data.type || 'Office',
            ownership: data.ownership || 'Rent',
            location: data.location || '',
            address: data.address || '',
            status: 'Draft',
            proposals: data.proposals || []
        };
        setBuildingData([...buildingData, newBuilding]);
    } else if (selectedBuilding) {
        setBuildingData(buildingData.map(b => b.id === selectedBuilding.id ? { ...b, ...data } : b));
    }
    setIsBuildingModalOpen(false);
  };

  const handleSaveService = (data: Partial<ServiceRecord>) => {
    if (modalMode === 'create') {
        const newRecord: ServiceRecord = {
            id: data.id || `SRV-${Date.now()}`,
            noPolisi: data.noPolisi || '',
            aset: data.aset || '',
            tglRequest: data.tglRequest || new Date().toISOString().split('T')[0],
            channel: data.channel || 'HCO',
            cabang: data.cabang || 'Jakarta',
            status: 'Selesai',
            statusApproval: 'Approved',
            jenisServis: data.jenisServis || 'Servis Rutin',
            vendor: data.vendor || 'Bengkel Rekanan',
            kmKendaraan: data.kmKendaraan || '0',
            estimasiBiaya: data.estimasiBiaya || '0',
            spareParts: data.spareParts || []
        };
        setServiceData([newRecord, ...serviceData]);
    } else if (selectedService) {
        setServiceData(serviceData.map(item => item.id === selectedService.id ? { ...item, ...data } : item));
    }
    setIsServiceModalOpen(false);
  };

  const handleSaveGeneralMaster = (name: string) => {
    if (modalMode === 'create') {
      const newItem: GeneralMasterItem = { id: Date.now(), name: name };
      if (masterLists[activeModule]) setMasterLists(prev => ({ ...prev, [activeModule]: [...prev[activeModule], newItem] }));
      else if (activeTab === 'UOM') setUomList([...uomList, newItem]);
      else if (activeTab === 'Category') {
        if (activeModule === 'Master ARK') setArkCategories([...arkCategories, newItem]);
        else setAtkCategories([...atkCategories, newItem]);
      }
    } else if (selectedMasterItem) {
      if (masterLists[activeModule]) setMasterLists(prev => ({ ...prev, [activeModule]: prev[activeModule].map(item => item.id === selectedMasterItem.id ? { ...item, name } : item) }));
      else if (activeTab === 'UOM') setUomList(uomList.map(item => item.id === selectedMasterItem.id ? { ...item, name } : item));
      else if (activeTab === 'Category') {
        if (activeModule === 'Master ARK') setArkCategories(arkCategories.map(item => item.id === selectedMasterItem.id ? { ...item, name } : item));
        else setAtkCategories(atkCategories.map(item => item.id === selectedMasterItem.id ? { ...item, name } : item));
      }
    }
    setIsMasterModalOpen(false);
  };

  const handleSaveMasterItem = (data: Partial<MasterItem>) => {
    const isArk = activeModule === 'Master ARK';
    if (modalMode === 'create') {
      const newItem: MasterItem = {
        id: Date.now(),
        category: data.category || '',
        itemName: data.itemName || '',
        itemCode: data.itemCode || '',
        uom: data.uom || '',
        remainingStock: data.remainingStock || 0,
        minimumStock: data.minimumStock || 0,
        maximumStock: data.maximumStock || 0,
        requestedStock: 0,
        purchaseDate: data.purchaseDate || new Date().toLocaleDateString('id-ID'),
        lastPurchasePrice: data.lastPurchasePrice || 'Rp 0',
        averagePrice: data.averagePrice || 'Rp 0',
        imageUrl: data.imageUrl
      };
      if (isArk) setArkMaster([newItem, ...arkMaster]);
      else setAtkMaster([newItem, ...atkMaster]);
    } else if (selectedMasterProduct) {
      if (isArk) setArkMaster(arkMaster.map(item => item.id === selectedMasterProduct.id ? { ...item, ...data } as MasterItem : item));
      else setAtkMaster(atkMaster.map(item => item.id === selectedMasterProduct.id ? { ...item, ...data } as MasterItem : item));
    }
    setIsMasterItemModalOpen(false);
  };

  const handleSaveDeliveryLocation = (data: Partial<DeliveryLocationRecord>) => {
    if (modalMode === 'create') {
      const newLoc: DeliveryLocationRecord = { id: Date.now(), name: data.name || '', address: data.address || '', type: data.type || 'HO' };
      setDelivLocations([...delivLocations, newLoc]);
    } else if (selectedDeliveryLocation) {
      setDelivLocations(delivLocations.map(item => item.id === selectedDeliveryLocation.id ? { ...item, ...data } as DeliveryLocationRecord : item));
    }
    setIsDeliveryLocationModalOpen(false);
  };

  const renderContent = () => {
     if (masterLists[activeModule]) {
         return (
            <GeneralMasterTable 
                data={masterLists[activeModule]} 
                onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }}
                onDelete={(id) => { if(confirm('Hapus?')) setMasterLists(prev => ({...prev, [activeModule]: prev[activeModule].filter(i => i.id !== id)})); }}
            />
         );
     }

     if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        const isArk = activeModule === 'Master ARK';
        switch(activeTab) {
            case 'Items': return <MasterAtkTable data={isArk ? arkMaster : atkMaster} onEdit={(item) => { setSelectedMasterProduct(item); setModalMode('edit'); setIsMasterItemModalOpen(true); }} />;
            case 'UOM': return <GeneralMasterTable data={uomList} onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} onDelete={()=>{}} />;
            case 'Category': return <GeneralMasterTable data={isArk ? arkCategories : atkCategories} onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} onDelete={()=>{}} />;
            case 'Delivery Location': return <MasterDeliveryLocationTable data={delivLocations} onEdit={(item) => { setSelectedDeliveryLocation(item); setModalMode('edit'); setIsDeliveryLocationModalOpen(true); }} onDelete={()=>{}} />;
            default: return <MasterAtkTable data={isArk ? arkMaster : atkMaster} onEdit={(item) => { setSelectedMasterProduct(item); setModalMode('edit'); setIsMasterItemModalOpen(true); }} />;
        }
     }

     switch(activeModule) {
         case 'Daftar Aset': return (
            <VehicleTable 
                data={vehicleData.filter(v => v.status === activeTab)} 
                onEdit={(v) => { setSelectedVehicle(v); setModalMode('edit'); setIsVehicleModalOpen(true); }} 
                onView={(v) => { setSelectedVehicle(v); setModalMode('view'); setIsVehicleModalOpen(true); }}
            />
         );
         case 'Kontrak Gedung': return (
            <BuildingTable 
                data={buildingData.filter(b => b.ownership === (activeTab === 'Milik Sendiri' ? 'Own' : 'Rent'))}
                onEdit={(b) => { setSelectedBuilding(b); setModalMode('edit'); setIsBuildingModalOpen(true); }}
                onView={(b) => { setSelectedBuilding(b); setModalMode('view'); setIsBuildingModalOpen(true); }}
            />
         );
         case 'List Reminder Dokumen': return <ReminderTable data={reminderData} />;
         case 'Kontrak Kendaraan': return <VehicleContractTable data={vehicleContractData} />;
         case 'Servis': return (
            <ServiceLogTable 
              data={serviceData} 
              onEdit={(s) => { setSelectedService(s); setModalMode('edit'); setIsServiceModalOpen(true); }}
              onView={(s) => { setSelectedService(s); setModalMode('view'); setIsServiceModalOpen(true); }}
            />
         );
         case 'Pajak & KIR': return <TaxKirTable data={taxKirData} />;
         case 'Master Vendor': return <MasterVendorTable data={masterVendors} />;
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={arkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Log Book':
            return <LogBookTable 
                data={logBookData} 
                onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} 
                onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }}
            />;
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const mainTabs = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') return ['Milik Sendiri', 'Sewa'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') return ['Items', 'UOM', 'Category', 'Delivery Location'];
    if (activeModule === 'Servis') return ['Semua', 'Persetujuan'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval') || activeModule.includes('Request')) return ['Semua', 'Draft', 'On Progress', 'Pending', 'Approved', 'Rejected', 'Closed'];
    return ['Semua'];
  }, [activeModule]);

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden text-black">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobileMenu} />
      )}

      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={toggleMobileMenu}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        <TopBar breadcrumbs={['Beranda', t(activeModule)]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    {activeModule === 'Kontrak Gedung' ? 'Daftar Gedung' : t(activeModule)}
                </h1>
            </div>
            
            <FilterBar 
                tabs={mainTabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick}
                moduleName={activeModule}
                hideAdd={['List Reminder Dokumen'].includes(activeModule)}
            />
            
            {renderContent()}
          </div>
        </main>
      </div>

      <GeneralMasterModal 
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        onSave={handleSaveGeneralMaster}
        initialData={selectedMasterItem}
        title={activeTab}
      />

      <VehicleModal 
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={() => setIsVehicleModalOpen(false)}
        initialData={selectedVehicle || undefined}
        mode={modalMode}
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        onSave={handleSaveBuilding}
        initialData={selectedBuilding || undefined}
        mode={modalMode}
      />

      <ServiceModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleSaveService}
        initialData={selectedService}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <AddStockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        moduleName={activeModule}
        mode={modalMode}
        initialAssetData={selectedAsset || undefined}
        initialLogBookData={selectedLogBook || undefined}
        vehicleList={vehicleData}
      />

      <MasterItemModal 
        isOpen={isMasterItemModalOpen}
        onClose={() => setIsMasterItemModalOpen(false)}
        onSave={handleSaveMasterItem}
        initialData={selectedMasterProduct}
        moduleName={activeModule}
        mode={modalMode}
      />

      <DeliveryLocationModal 
        isOpen={isDeliveryLocationModalOpen}
        onClose={() => setIsDeliveryLocationModalOpen(false)}
        onSave={handleSaveDeliveryLocation}
        initialData={selectedDeliveryLocation}
        mode={modalMode}
      />

      <AssetGeneralModal 
        isOpen={isAssetGeneralModalOpen}
        onClose={() => setIsAssetGeneralModalOpen(false)}
        onSave={() => setIsAssetGeneralModalOpen(false)}
        initialData={selectedBuilding ? {
            assetNumber: selectedBuilding.assetNo,
            assetCategory: 'Building',
            type: selectedBuilding.type,
            ownership: selectedBuilding.ownership,
            assetLocation: selectedBuilding.location,
            address: selectedBuilding.address
        } : undefined}
        mode={modalMode}
      />
    </div>
  );
};

export default App;
