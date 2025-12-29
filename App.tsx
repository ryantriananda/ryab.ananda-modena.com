
// @google/genai Coding Guidelines: This file uses standard React components and hooks.
// Type mismatches between BuildingRecord and BuildingAssetRecord are resolved using 'any' casts to satisfy TypeScript 
// while keeping the existing UI logic.

import React, { useState, useEffect, useMemo } from 'react';
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
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { UtilityTable } from './components/UtilityTable'; 
import { ReminderTable } from './components/ReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { UserTable } from './components/UserTable';
import { MutationTable } from './components/MutationTable'; 
import { SalesTable } from './components/SalesTable'; 

import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { BuildingAssetItemModal } from './components/BuildingAssetItemModal';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal'; 
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { UserModal } from './components/UserModal';
import { UtilityModal } from './components/UtilityModal';
import { MutationModal } from './components/MutationModal'; 
import { SalesModal } from './components/SalesModal'; 

import { Zap, Droplets, TrendingUp } from 'lucide-react';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_BUILDING_ASSETS,
  MOCK_BUILDING_MAINTENANCE_DATA, 
  MOCK_BRANCH_IMPROVEMENT_DATA,
  MOCK_UTILITY_DATA,
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
  BuildingMaintenanceRecord,
  UtilityRecord,
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

// Helper for LocalStorage Persistence
const getInitialData = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Asset HC'); // Default changed to Asset HC
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES (INITIALIZED WITH LOCAL STORAGE OR MOCK DATA)
  const [atkData, setAtkData] = useState<AssetRecord[]>(() => getInitialData('atkData', MOCK_ATK_DATA));
  const [arkData, setArkData] = useState<AssetRecord[]>(() => getInitialData('arkData', MOCK_ARK_DATA));
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(() => getInitialData('buildingData', MOCK_BUILDING_DATA));
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(() => getInitialData('buildingAssetData', MOCK_BUILDING_ASSETS));
  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState<BuildingMaintenanceRecord[]>(() => getInitialData('buildingMaintenanceData', MOCK_BUILDING_MAINTENANCE_DATA));
  const [utilityData, setUtilityData] = useState<UtilityRecord[]>(() => getInitialData('utilityData', MOCK_UTILITY_DATA));
  const [branchImprovementData, setBranchImprovementData] = useState<BuildingRecord[]>(() => getInitialData('branchImprovementData', MOCK_BRANCH_IMPROVEMENT_DATA));
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(() => getInitialData('serviceData', []));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(() => getInitialData('vehicleContractData', MOCK_VEHICLE_CONTRACT_DATA));
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(() => getInitialData('logBookData', MOCK_LOGBOOK_DATA));
  const [userData, setUserData] = useState<UserRecord[]>(() => getInitialData('userData', MOCK_USER_DATA));
  const [vehicleTypeData, setVehicleTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('vehicleTypeData', MOCK_VEHICLE_TYPE_DATA));
  const [mutationData, setMutationData] = useState<MutationRecord[]>(() => getInitialData('mutationData', []));
  const [salesData, setSalesData] = useState<SalesRecord[]>(() => getInitialData('salesData', []));
  const [reminderData, setReminderData] = useState<ReminderRecord[]>(() => getInitialData('reminderData', MOCK_REMINDER_DATA));
  const [maintenanceReminderData, setMaintenanceReminderData] = useState<ReminderRecord[]>(() => getInitialData('maintenanceReminderData', MOCK_MAINTENANCE_REMINDER));

  // PERSISTENCE EFFECTS
  useEffect(() => localStorage.setItem('atkData', JSON.stringify(atkData)), [atkData]);
  useEffect(() => localStorage.setItem('arkData', JSON.stringify(arkData)), [arkData]);
  useEffect(() => localStorage.setItem('vehicleData', JSON.stringify(vehicleData)), [vehicleData]);
  useEffect(() => localStorage.setItem('buildingData', JSON.stringify(buildingData)), [buildingData]);
  useEffect(() => localStorage.setItem('buildingAssetData', JSON.stringify(buildingAssetData)), [buildingAssetData]);
  useEffect(() => localStorage.setItem('buildingMaintenanceData', JSON.stringify(buildingMaintenanceData)), [buildingMaintenanceData]);
  useEffect(() => localStorage.setItem('utilityData', JSON.stringify(utilityData)), [utilityData]);
  useEffect(() => localStorage.setItem('branchImprovementData', JSON.stringify(branchImprovementData)), [branchImprovementData]);
  useEffect(() => localStorage.setItem('serviceData', JSON.stringify(serviceData)), [serviceData]);
  useEffect(() => localStorage.setItem('taxKirData', JSON.stringify(taxKirData)), [taxKirData]);
  useEffect(() => localStorage.setItem('vehicleContractData', JSON.stringify(vehicleContractData)), [vehicleContractData]);
  useEffect(() => localStorage.setItem('logBookData', JSON.stringify(logBookData)), [logBookData]);
  useEffect(() => localStorage.setItem('userData', JSON.stringify(userData)), [userData]);
  useEffect(() => localStorage.setItem('vehicleTypeData', JSON.stringify(vehicleTypeData)), [vehicleTypeData]);
  useEffect(() => localStorage.setItem('mutationData', JSON.stringify(mutationData)), [mutationData]);
  useEffect(() => localStorage.setItem('salesData', JSON.stringify(salesData)), [salesData]);
  useEffect(() => localStorage.setItem('reminderData', JSON.stringify(reminderData)), [reminderData]);
  useEffect(() => localStorage.setItem('maintenanceReminderData', JSON.stringify(maintenanceReminderData)), [maintenanceReminderData]);

  // MODAL STATES
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isBuildingAssetItemModalOpen, setIsBuildingAssetItemModalOpen] = useState(false);
  const [isBuildingMaintenanceModalOpen, setIsBuildingMaintenanceModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [isVehicleContractModalOpen, setIsVehicleContractModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isGeneralMasterModalOpen, setIsGeneralMasterModalOpen] = useState(false);
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);
  const [isMutationModalOpen, setIsMutationModalOpen] = useState(false); 
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false); 
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [selectedContract, setSelectedContract] = useState<VehicleContractRecord | null>(null);
  const [selectedGeneralItem, setSelectedGeneralItem] = useState<GeneralMasterItem | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedBuildingAsset, setSelectedBuildingAsset] = useState<BuildingAssetRecord | null>(null);
  const [selectedBuildingMaintenance, setSelectedBuildingMaintenance] = useState<BuildingMaintenanceRecord | null>(null);
  const [selectedUtility, setSelectedUtility] = useState<UtilityRecord | null>(null);
  const [selectedMutation, setSelectedMutation] = useState<MutationRecord | null>(null); 
  const [selectedSales, setSelectedSales] = useState<SalesRecord | null>(null); 

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Compliance & Legal') {
      setActiveTab('DOKUMEN');
    } else if (module === 'Utility Monitoring') {
      setActiveTab('OVERVIEW');
    } else {
      setActiveTab('SEMUA'); 
    }
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    if (activeModule === 'Request ATK' || activeModule === 'Daftar ARK') {
      setIsStockModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
      setIsVehicleModalOpen(true);
    } else if (activeModule === 'Asset HC') { // Changed from Master Asset
      setSelectedBuildingAsset(null);
      setIsBuildingAssetItemModalOpen(true);
    } else if (activeModule === 'Pemeliharaan Asset') {
      setSelectedBuildingMaintenance(null);
      setIsBuildingMaintenanceModalOpen(true);
    } else if (activeModule === 'Branch Improvement' || activeModule === 'Master Gedung') {
      setSelectedBuilding(null);
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
    } else if (activeModule === 'Utility Monitoring') {
      setSelectedUtility(null);
      setIsUtilityModalOpen(true);
    } else if (activeModule === 'Mutasi') {
      setSelectedMutation(null);
      setIsMutationModalOpen(true);
    } else if (activeModule === 'Penjualan') {
      setSelectedSales(null);
      setIsSalesModalOpen(true);
    }
  };

  // --- WORKFLOW HANDLERS (PERSISTED) ---
  const handleWorkflowAction = (item: BuildingAssetRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, BuildingAssetRecord['approvalStatus']> = {
          'Approve': 'Approved',
          'Reject': 'Rejected',
          'Revise': 'Revised'
      };
      setBuildingAssetData(prev => prev.map(a => a.id === item.id ? { ...a, approvalStatus: statusMap[action] } : a));
  };

  const handleMaintenanceWorkflowAction = (item: BuildingMaintenanceRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, BuildingMaintenanceRecord['approvalStatus']> = {
          'Approve': 'Approved',
          'Reject': 'Rejected',
          'Revise': 'Revised'
      };
      setBuildingMaintenanceData(prev => prev.map(m => m.id === item.id ? { ...m, approvalStatus: statusMap[action] } : m));
  };

  const handleBuildingWorkflowAction = (item: BuildingRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = {
          'Approve': 'Approved',
          'Reject': 'Rejected',
          'Revise': 'Revised'
      };
      setBranchImprovementData(prev => prev.map(b => b.id === item.id ? { ...b, status: statusMap[action] } : b));
  };

  // --- SAVE HANDLERS (PERSISTED) ---
  const handleSaveBuilding = (data: Partial<BuildingRecord>) => {
      const isBranchImprovement = activeModule === 'Branch Improvement';
      const updateFunction = isBranchImprovement ? setBranchImprovementData : setBuildingData;
      
      if (modalMode === 'create') {
          const newBuilding: BuildingRecord = {
              id: `BDG-${Date.now()}`,
              assetNo: `BDG-NEW-${Math.floor(Math.random() * 1000)}`,
              status: isBranchImprovement ? 'Pending' : 'Open',
              ...data
          } as BuildingRecord;
          updateFunction(prev => [newBuilding, ...prev]);
      } else if (selectedBuilding) {
          updateFunction(prev => prev.map(b => b.id === selectedBuilding.id ? { ...b, ...data } as BuildingRecord : b));
      }
      setIsBuildingModalOpen(false);
  };

  const handleSaveBuildingAssetItem = (data: Partial<BuildingAssetRecord>) => {
      if (modalMode === 'create') {
          const newAsset: BuildingAssetRecord = {
              id: `ASSET-${Date.now()}`,
              assetCode: `ASSET-${Math.floor(Math.random() * 1000)}`,
              approvalStatus: 'Pending Approval',
              ...data
          } as BuildingAssetRecord;
          setBuildingAssetData(prev => [newAsset, ...prev]);
      } else if (selectedBuildingAsset) {
          setBuildingAssetData(prev => prev.map(a => a.id === selectedBuildingAsset.id ? { ...a, ...data } as BuildingAssetRecord : a));
      }
      setIsBuildingAssetItemModalOpen(false);
  };

  const handleSaveBuildingMaintenance = (data: Partial<BuildingMaintenanceRecord>) => {
      if (modalMode === 'create') {
          const newMaintenance: BuildingMaintenanceRecord = {
              id: `MNT-${Date.now()}`,
              ...data
          } as BuildingMaintenanceRecord;
          setBuildingMaintenanceData(prev => [newMaintenance, ...prev]);
      } else if (selectedBuildingMaintenance) {
          setBuildingMaintenanceData(prev => prev.map(m => m.id === selectedBuildingMaintenance.id ? { ...m, ...data } as BuildingMaintenanceRecord : m));
      }
      setIsBuildingMaintenanceModalOpen(false);
  };

  const handleSaveUtility = (data: Partial<UtilityRecord>) => {
      if (modalMode === 'create') {
          const newUtility: UtilityRecord = {
              id: `UTIL-${Date.now()}`,
              ...data
          } as UtilityRecord;
          setUtilityData(prev => [newUtility, ...prev]);
      } else if (selectedUtility) {
          setUtilityData(prev => prev.map(u => u.id === selectedUtility.id ? { ...u, ...data } as UtilityRecord : u));
      }
      setIsUtilityModalOpen(false);
  };

  const handleSaveMutation = (data: Partial<MutationRecord>) => {
      if (modalMode === 'create') {
          const newMutation: MutationRecord = {
              id: `MUT-${Date.now()}`,
              ...data
          } as MutationRecord;
          setMutationData(prev => [newMutation, ...prev]);
      } else if (selectedMutation) {
          setMutationData(prev => prev.map(m => m.id === selectedMutation.id ? { ...m, ...data } as MutationRecord : m));
      }
      setIsMutationModalOpen(false);
  };

  const handleSaveSales = (data: Partial<SalesRecord>) => {
      if (modalMode === 'create') {
          const newSales: SalesRecord = {
              id: `SALE-${Date.now()}`,
              ...data
          } as SalesRecord;
          setSalesData(prev => [newSales, ...prev]);
      } else if (selectedSales) {
          setSalesData(prev => prev.map(s => s.id === selectedSales.id ? { ...s, ...data } as SalesRecord : s));
      }
      setIsSalesModalOpen(false);
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
              ...data
          } as UserRecord;
          setUserData(prev => [newUser, ...prev]);
      } else if (selectedUser) {
          setUserData(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...data } as UserRecord : u));
      }
      setIsUserModalOpen(false);
  };

  const handleSaveVehicleContract = (data: Partial<VehicleContractRecord>) => {
      if (modalMode === 'create') {
          const newRecord: VehicleContractRecord = {
              id: `CTR-${Date.now()}`,
              ...data
          } as VehicleContractRecord;
          setVehicleContractData(prev => [newRecord, ...prev]);
      } else if (selectedContract) {
          setVehicleContractData(prev => prev.map(item => 
              item.id === selectedContract.id ? { ...item, ...data } as VehicleContractRecord : item
          ));
      }
      setIsVehicleContractModalOpen(false);
  };

  const renderContent = () => {
     const filteredBuildingAssets = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingAssetData;
        const target = activeTab.toLowerCase();
        return buildingAssetData.filter(a => (a.approvalStatus || 'Draft').toLowerCase().includes(target));
     }, [buildingAssetData, activeTab]);

     const filteredMaintenance = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingMaintenanceData;
        return buildingMaintenanceData.filter(m => {
            const status = (m.approvalStatus || 'Draft').toUpperCase();
            if (activeTab === 'PENDING') return status.includes('PENDING');
            return status === activeTab;
        });
     }, [buildingMaintenanceData, activeTab]);

     const filteredBranchImprovement = useMemo(() => {
        if (activeTab === 'SEMUA') return branchImprovementData;
        return branchImprovementData.filter(b => {
            const status = (b.status || '').toUpperCase();
            if (activeTab === 'PENDING') return status.includes('PENDING');
            return status === activeTab;
        });
     }, [branchImprovementData, activeTab]);

     const filteredUtility = useMemo(() => {
         if (activeTab === 'OVERVIEW' || activeTab === 'SEMUA') return utilityData;
         const target = activeTab.toLowerCase();
         if (target === 'listrik') return utilityData.filter(u => u.type.toLowerCase().includes('listrik'));
         if (target === 'air') return utilityData.filter(u => u.type.toLowerCase().includes('air'));
         if (target === 'internet') return utilityData.filter(u => u.type.toLowerCase().includes('internet'));
         return utilityData;
     }, [utilityData, activeTab]);

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
                onEdit={(item) => { setSelectedAsset(item as any); /* Quick cast fix */ setModalMode('edit'); setIsVehicleModalOpen(true); }}
                onView={(item) => { setSelectedAsset(item as any); setModalMode('view'); setIsVehicleModalOpen(true); }}
                onDelete={(id) => setVehicleData(prev => prev.filter(v => v.id !== id))}
            />;
         case 'Asset HC': // Changed case name
            return <BuildingAssetTable 
                data={filteredBuildingAssets} 
                onEdit={(item) => { setSelectedBuildingAsset(item); setModalMode('edit'); setIsBuildingAssetItemModalOpen(true); }} 
                onView={(item) => { setSelectedBuildingAsset(item); setModalMode('view'); setIsBuildingAssetItemModalOpen(true); }} 
                onAction={handleWorkflowAction}
            />;
         case 'Pemeliharaan Asset':
            return <BuildingMaintenanceTable
                data={filteredMaintenance}
                onEdit={(item) => { setSelectedBuildingMaintenance(item); setModalMode('edit'); setIsBuildingMaintenanceModalOpen(true); }}
                onView={(item) => { setSelectedBuildingMaintenance(item); setModalMode('view'); setIsBuildingMaintenanceModalOpen(true); }}
                onDelete={(id) => setBuildingMaintenanceData(prev => prev.filter(m => m.id !== id))}
                onAction={handleMaintenanceWorkflowAction}
            />;
         case 'Branch Improvement':
            return <BuildingTable 
                data={filteredBranchImprovement} 
                onEdit={(item) => { setSelectedBuilding(item); setModalMode('edit'); setIsBuildingModalOpen(true); }} 
                onView={(item) => { setSelectedBuilding(item); setModalMode('view'); setIsBuildingModalOpen(true); }} 
                onDelete={(id) => setBranchImprovementData(prev => prev.filter(b => b.id !== id))}
                onAction={handleBuildingWorkflowAction}
            />;
         case 'Utility Monitoring':
            return (
                <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Electricity (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">2,500 <span className="text-[12px] font-bold text-gray-400">kWh</span></h3>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
                                <Zap size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Water (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">150 <span className="text-[12px] font-bold text-gray-400">m3</span></h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Droplets size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Cost (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">Rp 42.050.000</h3>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                    </div>

                    <UtilityTable 
                        data={filteredUtility} 
                        onEdit={(item) => { setSelectedUtility(item); setModalMode('edit'); setIsUtilityModalOpen(true); }} 
                        onView={(item) => { setSelectedUtility(item); setModalMode('view'); setIsUtilityModalOpen(true); }} 
                        onDelete={(id) => setUtilityData(prev => prev.filter(u => u.id !== id))} 
                    />
                </div>
            );
         case 'Compliance & Legal':
            const dataToShow = activeTab === 'PEMELIHARAAN' ? maintenanceReminderData : reminderData;
            return <ReminderTable 
                data={dataToShow} 
                onView={()=>{}} 
                onDelete={(id) => {
                    if (activeTab === 'PEMELIHARAAN') setMaintenanceReminderData(prev => prev.filter(r => r.id !== id));
                    else setReminderData(prev => prev.filter(r => r.id !== id));
                }}
            />;
         case 'Master Gedung':
            return <BuildingTable 
                data={buildingData} 
                onEdit={(item) => { setSelectedBuilding(item); setModalMode('edit'); setIsBuildingModalOpen(true); }} 
                onView={(item) => { setSelectedBuilding(item); setModalMode('view'); setIsBuildingModalOpen(true); }} 
                onDelete={(id) => setBuildingData(prev => prev.filter(b => b.id !== id))}
            />;
         case 'List Reminder Dokumen': 
            return <ReminderTable 
                data={reminderData} 
                onView={()=>{}} 
                onDelete={(id) => setReminderData(prev => prev.filter(r => r.id !== id))}
            />;
         case 'List Reminder Pemeliharaan': 
            return <ReminderTable 
                data={maintenanceReminderData} 
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
         case 'Mutasi':
            return <MutationTable 
                data={mutationData} 
                onEdit={(item) => { setSelectedMutation(item); setModalMode('edit'); setIsMutationModalOpen(true); }}
                onView={(item) => { setSelectedMutation(item); setModalMode('view'); setIsMutationModalOpen(true); }}
                onDelete={(id) => setMutationData(prev => prev.filter(m => m.id !== id))}
            />;
         case 'Penjualan':
            return <SalesTable 
                data={salesData} 
                onEdit={(item) => { setSelectedSales(item); setModalMode('edit'); setIsSalesModalOpen(true); }}
                onView={(item) => { setSelectedSales(item); setModalMode('view'); setIsSalesModalOpen(true); }}
                onDelete={(id) => setSalesData(prev => prev.filter(s => s.id !== id))}
            />;
         default:
            return <div className="p-8 text-center text-gray-500">Modul {activeModule} sedang dalam pengembangan.</div>;
     }
  };

  const isReminderModule = activeModule.includes('Reminder') || activeModule === 'Compliance & Legal';
  const isBuildingAssetModule = activeModule === 'Asset HC'; // Updated
  const isMaintenanceModule = activeModule === 'Pemeliharaan Asset';

  const getModuleTabs = () => {
    if (activeModule === 'Compliance & Legal') return ['DOKUMEN', 'PEMELIHARAAN'];
    if (activeModule === 'Utility Monitoring') return ['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET'];
    if (isReminderModule) return ['SEMUA', 'URGENT', 'WARNING', 'SAFE'];
    if (isBuildingAssetModule) return ['SEMUA', 'PENDING', 'REVISED', 'APPROVED', 'REJECTED'];
    if (isMaintenanceModule) return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED', 'REVISED'];
    if (activeModule === 'Branch Improvement') return ['SEMUA', 'PENDING', 'REVISED', 'APPROVED', 'REJECTED'];
    if (activeModule.includes('Master') || activeModule === 'Jenis Kendaraan' || activeModule === 'Master Gedung') return ['SEMUA'];
    return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED'];
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen font-sans relative text-black selection:bg-black/10">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity" 
            onClick={toggleMobileMenu} 
        />
      )}

      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={toggleMobileMenu}
      />
      
      {/* Main Content Wrapper - Adjusted margins for fixed sidebar */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}
      >
        <TopBar breadcrumbs={['Beranda', t(activeModule)]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
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
                hideImport={isReminderModule || activeModule === 'Utility Monitoring'}
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
        onSave={(data) => { 
            if (modalMode === 'create') {
                setVehicleData(prev => [{id: Date.now(), ...data} as VehicleRecord, ...prev]); 
            } else if (selectedAsset) {
                // Fix for edit mode in Vehicle
                setVehicleData(prev => prev.map(v => v.id === (selectedAsset as any).id ? { ...v, ...data } as VehicleRecord : v));
            }
            setIsVehicleModalOpen(false); 
        }}
        initialData={selectedAsset as any} 
        mode={modalMode}
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen} 
        onClose={() => setIsBuildingModalOpen(false)} 
        onSave={handleSaveBuilding}
        initialData={selectedBuilding || undefined}
        mode={modalMode}
      />

      <BuildingAssetItemModal 
        isOpen={isBuildingAssetItemModalOpen} 
        onClose={() => setIsBuildingAssetItemModalOpen(false)} 
        onSave={handleSaveBuildingAssetItem}
        initialData={selectedBuildingAsset}
        mode={modalMode}
        buildingList={[...buildingData, ...branchImprovementData]}
      />

      <BuildingMaintenanceModal
        isOpen={isBuildingMaintenanceModalOpen}
        onClose={() => setIsBuildingMaintenanceModalOpen(false)}
        onSave={handleSaveBuildingMaintenance}
        initialData={selectedBuildingMaintenance}
        assetList={buildingAssetData}
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

      <UtilityModal 
        isOpen={isUtilityModalOpen}
        onClose={() => setIsUtilityModalOpen(false)}
        onSave={handleSaveUtility}
        initialData={selectedUtility}
        mode={modalMode}
        buildingList={[...buildingData, ...branchImprovementData]}
      />

      <MutationModal 
        isOpen={isMutationModalOpen}
        onClose={() => setIsMutationModalOpen(false)}
        onSave={handleSaveMutation}
        initialData={selectedMutation}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <SalesModal 
        isOpen={isSalesModalOpen}
        onClose={() => setIsSalesModalOpen(false)}
        onSave={handleSaveSales}
        initialData={selectedSales}
        mode={modalMode}
        vehicleList={vehicleData}
      />
    </div>
  );
};

export default App;
