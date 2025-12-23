
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord } from './types';

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    {
        id: '1',
        name: 'MODENA Experience Center Satrio',
        assetNo: 'BDG-JKT-HO-001',
        type: 'Showroom & Office',
        ownership: 'Rent',
        location: 'Jakarta Selatan',
        address: 'Jl. Prof. DR. Satrio No. C4, Kuningan',
        status: 'Open',
        startDate: '2024-01-01',
        endDate: '2028-12-31',
        proposals: []
    }
];

export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    {
        id: 'ASSET-001',
        assetCode: 'AC-HO-001',
        assetType: 'AC',
        assetName: 'AC SPLIT MEC 1',
        brand: 'Panasonic',
        modelNumber: 'CS-PU9XKP',
        buildingName: 'Head Office Satrio',
        floor: 'Lantai 2',
        roomName: 'Ruang Meeting GA',
        maintenanceFrequency: 'Quarterly',
        status: 'Good',
        approvalStatus: 'Approved',
        ownership: 'Own'
    },
    {
        id: 'ASSET-002',
        assetCode: 'LIFT-HO-01',
        assetType: 'Lift',
        assetName: 'Passenger Lift A',
        brand: 'Schindler',
        buildingName: 'Head Office Satrio',
        floor: 'All Floors',
        roomName: 'Main Lobby',
        maintenanceFrequency: 'Monthly',
        status: 'Fair',
        approvalStatus: 'Pending Approval',
        ownership: 'Own'
    },
    {
        id: 'ASSET-003',
        assetCode: 'CCTV-CKG-12',
        assetType: 'CCTV',
        assetName: 'IP Camera Outdoor 4MP',
        brand: 'Hikvision',
        buildingName: 'Warehouse Cakung',
        floor: 'Ground',
        roomName: 'Loading Dock B',
        maintenanceFrequency: 'Yearly',
        status: 'Good',
        approvalStatus: 'Revised',
        ownership: 'Own'
    },
    {
        id: 'ASSET-004',
        assetCode: 'GEN-HO-01',
        assetType: 'Genset',
        assetName: 'Backup Generator 500KVA',
        brand: 'Cummins',
        buildingName: 'Head Office Satrio',
        floor: 'Basement',
        roomName: 'Power House',
        maintenanceFrequency: 'Monthly',
        status: 'Maintenance',
        approvalStatus: 'Rejected',
        ownership: 'Own'
    }
];

export const MOCK_DATA: AssetRecord[] = [
  {
    id: 1,
    transactionNumber: 'REQ-001234',
    employee: {
      name: 'Ibnu Faisal Abbas',
      role: 'Admin Facility',
      phone: '0812-3456-7890',
      avatar: 'https://picsum.photos/id/1005/100/100'
    },
    category: 'STATIONERY',
    itemName: 'Kertas A4 80gr',
    itemDescription: 'Permintaan rutin bulanan',
    qty: 10,
    date: '15/02/2024',
    remainingStock: 45,
    itemCode: 'PAP-A4-001',
    status: 'Approved'
  },
  {
    id: 2,
    transactionNumber: 'REQ-001235',
    employee: {
      name: 'Sarah Amelia',
      role: 'HR Specialist',
      phone: '0812-9876-5432',
      avatar: 'https://picsum.photos/id/1027/100/100'
    },
    category: 'STATIONERY',
    itemName: 'Pena Gel Hitam',
    itemDescription: 'Kebutuhan tim HR',
    qty: 24,
    date: '16/02/2024',
    remainingStock: 120,
    itemCode: 'PEN-GEL-002',
    status: 'Pending'
  }
]; 

export const MOCK_ARK_DATA: AssetRecord[] = [
  {
    id: 3,
    transactionNumber: 'REQ-ARK-001',
    employee: {
      name: 'Budi Santoso',
      role: 'Office Support',
      phone: '0811-1111-2222',
      avatar: 'https://picsum.photos/id/1012/100/100'
    },
    category: 'HOUSEHOLD',
    itemName: 'Tissue Roll',
    itemDescription: 'Restok toilet Lt. 3',
    qty: 50,
    date: '18/02/2024',
    remainingStock: 15,
    itemCode: 'TIS-ROL-001',
    status: 'On Progress'
  }
];

export const MOCK_USER_DATA: UserRecord[] = [
  {
    id: 'USR-001',
    name: 'Ibnu Faisal Abbas',
    email: 'ibnu.faisal@modena.com',
    role: 'Manager',
    department: 'GA & Facility',
    phone: '0812-3456-7890',
    status: 'Active',
    lastActive: '10 Min Ago',
    avatar: 'https://picsum.photos/id/1005/100/100'
  },
  {
    id: 'USR-002',
    name: 'Sarah Amelia',
    email: 'sarah.amelia@modena.com',
    role: 'Staff',
    department: 'Human Capital',
    phone: '0812-9876-5432',
    status: 'Active',
    lastActive: '1 Hour Ago',
    avatar: 'https://picsum.photos/id/1027/100/100'
  },
  {
    id: 'USR-003',
    name: 'Budi Santoso',
    email: 'budi.santoso@modena.com',
    role: 'Staff',
    department: 'General Affair',
    phone: '0811-1111-2222',
    status: 'Inactive',
    lastActive: '2 Days Ago',
    avatar: 'https://picsum.photos/id/1012/100/100'
  }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'STATIONERY', itemName: 'Kertas A4 80gr', itemCode: 'PAP-A4-001', uom: 'Rim', remainingStock: 45, minimumStock: 10, maximumStock: 100, requestedStock: 5, purchaseDate: '2024-01-10', lastPurchasePrice: 'Rp 45.000', averagePrice: 'Rp 44.500' },
  { id: 2, category: 'STATIONERY', itemName: 'Pena Gel Hitam', itemCode: 'PEN-GEL-002', uom: 'Box', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, purchaseDate: '2024-01-15', lastPurchasePrice: 'Rp 25.000', averagePrice: 'Rp 24.000' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 101, category: 'HOUSEHOLD', itemName: 'Tissue Roll', itemCode: 'TIS-ROL-001', uom: 'Roll', remainingStock: 15, minimumStock: 20, maximumStock: 200, requestedStock: 50, purchaseDate: '2024-02-05', lastPurchasePrice: 'Rp 3.500', averagePrice: 'Rp 3.400' }
];

export const MOCK_UOM_DATA: GeneralMasterItem[] = [{id: 1, name: 'PCS'}, {id: 2, name: 'UNIT'}, {id: 3, name: 'RIM'}, {id: 4, name: 'ROLL'}];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{id: 1, name: 'STATIONERY'}, {id: 2, name: 'INK & TONER'}];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{id: 1, name: 'HOUSEHOLD'}, {id: 2, name: 'PANTRY'}];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [{ id: 1, name: 'MODENA Head Office', address: 'Jl. Prof Dr Satrio No 10', type: 'HO' }];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
  {
    id: 'DOC-2024-001',
    documentName: 'HGB SATRIO OFFICE',
    buildingName: 'HO SATRIO',
    assetNo: 'BDG-JKT-01',
    expiryDate: '2024-05-15',
    daysRemaining: 12,
    status: 'Urgent'
  },
  {
    id: 'DOC-2024-002',
    documentName: 'FIRE SAFETY PERMIT',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'BDG-CKG-05',
    expiryDate: '2024-06-20',
    daysRemaining: 45,
    status: 'Warning'
  }
];

export const MOCK_MAINTENANCE_REMINDER: ReminderRecord[] = [
  {
    id: 'MAINT-2024-001',
    documentName: 'AC CHILLER SERVIS',
    buildingName: 'HO SATRIO - LT 1',
    assetNo: 'AC-CHL-001',
    expiryDate: '2024-04-10',
    daysRemaining: 5,
    status: 'Urgent'
  },
  {
    id: 'MAINT-2024-002',
    documentName: 'GENSET 500KVA INSPEKSI',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'GNS-CKG-01',
    expiryDate: '2024-05-30',
    daysRemaining: 55,
    status: 'Safe'
  }
];

// New Mock Data for Master Sub-items
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'MPV' },
    { id: 2, name: 'SUV' },
    { id: 3, name: 'SEDAN' },
    { id: 4, name: 'PICKUP' },
    { id: 5, name: 'MOTORCYCLE' }
];

export const MOCK_GENERAL_MASTER_DATA = { 
    jenisPajak: [{id: 1, name: 'STNK 1 TAHUN'}, {id: 2, name: 'STNK 5 TAHUN'}], 
    jenisPembayaran: [{id: 1, name: 'KASBON'}, {id: 2, name: 'REIMBURSE'}], 
    jenisServis: [{id: 1, name: 'SERVIS RUTIN'}, {id: 2, name: 'GANTI BAN'}], 
    statusMutasi: [], 
    statusPenjualan: [], 
    statusRequest: [], 
    tipeMutasi: [], 
    tipeVendor: [], 
    peran: [] 
};

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [{ id: 1, noRegistrasi: 'REG-2024001', nama: 'TOYOTA AVANZA 1.3 G', noPolisi: 'B 1234 ABC', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif' }];
export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
  {
    id: 'CTR-001',
    noKontrak: 'KTR/MDC/2024/001',
    noPolisi: 'B 1234 ABC',
    aset: 'TOYOTA AVANZA 1.3 G',
    vendor: 'PT. TRAC ASTRA',
    tglMulai: '2024-01-01',
    tglBerakhir: '2025-01-01',
    biayaSewa: '5500000',
    status: 'Aktif',
    keterangan: 'Rental tahunan unit operasional'
  }
];
export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [];
