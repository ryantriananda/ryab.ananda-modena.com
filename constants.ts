
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, BuildingMaintenanceRecord, UtilityRecord } from './types';

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
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2023-11-01', approver: 'Branch Manager JKT' },
            { role: 'Regional Branches', status: 'Approved', date: '2023-11-05', approver: 'Regional Head' },
            { role: 'AVP Dealership', status: 'Approved', date: '2023-11-10', approver: 'AVP Sales' },
            { role: 'Owner', status: 'Approved', date: '2023-11-15', approver: 'Owner' }
        ],
        currentWorkflowStep: 3,
        isLeaseProposalFilled: true
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

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    {
        id: 'MNT-2024-001',
        requestDate: '2024-02-15',
        assetId: 'ASSET-001',
        assetName: 'AC SPLIT MEC 1',
        buildingLocation: 'Head Office Satrio - Lantai 2',
        maintenanceType: 'Preventive',
        description: 'Cuci AC Rutin 3 Bulanan',
        vendor: 'PT. Cool Technic',
        cost: '150000',
        status: 'Completed',
        approvalStatus: 'Approved'
    },
    {
        id: 'MNT-2024-002',
        requestDate: '2024-02-20',
        assetId: 'ASSET-004',
        assetName: 'Backup Generator 500KVA',
        buildingLocation: 'Head Office Satrio - Basement',
        maintenanceType: 'Corrective',
        description: 'Penggantian Filter Oli & Solar',
        vendor: 'PT. Power Gen',
        cost: '2500000',
        status: 'In Progress',
        approvalStatus: 'Approved'
    },
    {
        id: 'MNT-2024-003',
        requestDate: '2024-02-25',
        assetId: 'ASSET-002',
        assetName: 'Passenger Lift A',
        buildingLocation: 'Head Office Satrio',
        maintenanceType: 'Corrective',
        description: 'Bunyi kasar pada pintu lift, perlu pengecekan bearing',
        vendor: 'Schindler',
        cost: '5000000',
        status: 'Scheduled',
        approvalStatus: 'Pending Approval'
    }
];

export const MOCK_BRANCH_IMPROVEMENT_DATA: BuildingRecord[] = [
    {
        id: 'BI-2024-001',
        name: 'MODENA Home Center Bintaro',
        assetNo: 'REQ-BI-BTR-01',
        type: 'MHC',
        ownership: 'Rent',
        location: 'Tangerang Selatan',
        address: 'Jl. Bintaro Utama 3A, Sektor 5',
        status: 'Pending',
        channel: 'Direct',
        department: 'Sales',
        assetValue: '0',
        rentCost: '250000000',
        startDate: '2024-06-01',
        endDate: '2029-06-01',
        proposals: [
            {
                id: 'PROP-01',
                optionName: 'Ruko Kebayoran Arcade',
                address: { jl: 'Jl. Boulevard Bintaro Jaya', kota: 'Tangsel', kabupaten: 'Tangerang', propinsi: 'Banten' },
                phoneLines: '2',
                electricity: '16500',
                water: 'PAM',
                areas: { land: '120', building: '240', frontYard: 'Parking 2 Cars' },
                conditions: { fence: 'Yes', gate: 'Rolling Door', parking: 'Shared' },
                security: ['CCTV Kawasan', 'Security 24 Jam'],
                floors: { ground: 'Showroom', f1: 'Office', f2: 'Warehouse', f3: '-', f4: '-' },
                materials: ['Concrete', 'Glass Facade'],
                legal: { shm: true, hgb: false, imb: true },
                costs: { rent: '250000000', tax: '25000000', notary: '5000000' },
                owner: { name: 'Bpk. Hendra', phone: '0812345678', address: 'Jakarta' },
                survey: { pros: ['Lokasi Strategis', 'Parkir Luas'], cons: ['Harga sewa tinggi'] }
            }
        ],
        workflow: [
            { role: 'BM', status: 'Pending' },
            { role: 'Regional Branches', status: 'Pending' },
            { role: 'AVP Dealership', status: 'Pending' },
            { role: 'Owner', status: 'Pending' }
        ],
        currentWorkflowStep: 0,
        isLeaseProposalFilled: false
    },
    {
        id: 'BI-2024-002',
        name: 'MODENA Logistics Hub Surabaya',
        assetNo: 'REQ-BI-SBY-09',
        type: 'Warehouse',
        ownership: 'Rent',
        location: 'Surabaya',
        address: 'Kawasan Industri Rungkut',
        status: 'On Progress',
        channel: 'Traditional',
        department: 'Logistics',
        assetValue: '0',
        rentCost: '450000000',
        startDate: '2024-05-01',
        endDate: '2027-05-01',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2024-03-01', approver: 'Branch Manager SBY' },
            { role: 'Regional Branches', status: 'Pending' },
            { role: 'AVP Dealership', status: 'Pending' },
            { role: 'Owner', status: 'Pending' }
        ],
        currentWorkflowStep: 1,
        isLeaseProposalFilled: false
    },
    {
        id: 'BI-2024-003',
        name: 'MODENA Showroom Medan',
        assetNo: 'REQ-BI-MDN-03',
        type: 'Showroom',
        ownership: 'Rent',
        location: 'Medan',
        address: 'Jl. Gatot Subroto No. 45',
        status: 'Revised', // Changed to Revised for demo
        channel: 'Direct',
        department: 'Sales',
        assetValue: '0',
        rentCost: '180000000',
        startDate: '2024-04-15',
        endDate: '2026-04-15',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2024-02-15', approver: 'Branch Manager MDN' },
            { role: 'Regional Branches', status: 'Rejected', date: '2024-02-18', approver: 'Regional Head Sumatera', comment: 'Lokasi kurang premium, tolong cari opsi lain di area Merdeka Walk.' },
            { role: 'AVP Dealership', status: 'Pending' },
            { role: 'Owner', status: 'Pending' }
        ],
        currentWorkflowStep: 1,
        isLeaseProposalFilled: false
    },
    {
        id: 'BI-2024-004',
        name: 'MODENA Experience Center Bali',
        assetNo: 'REQ-BI-DPS-01',
        type: 'Showroom & Office',
        ownership: 'Rent',
        location: 'Denpasar',
        address: 'Sunset Road No. 88',
        status: 'Approved',
        channel: 'Direct',
        department: 'Marketing',
        assetValue: '0',
        rentCost: '350000000',
        startDate: '2024-03-01',
        endDate: '2029-03-01',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2024-01-10', approver: 'Branch Manager Bali' },
            { role: 'Regional Branches', status: 'Approved', date: '2024-01-12', approver: 'Regional Head East' },
            { role: 'AVP Dealership', status: 'Approved', date: '2024-01-15', approver: 'AVP Sales' },
            { role: 'Owner', status: 'Approved', date: '2024-01-20', approver: 'Owner' }
        ],
        currentWorkflowStep: 3,
        isLeaseProposalFilled: false
    },
    {
        id: 'BI-2024-005',
        name: 'MODENA Warehouse Makassar',
        assetNo: 'REQ-BI-MKS-02',
        type: 'Warehouse',
        ownership: 'Rent',
        location: 'Makassar',
        address: 'Jl. Ir. Sutami, Pergudangan Parangloe',
        status: 'Completed',
        channel: 'Traditional',
        department: 'Logistics',
        assetValue: '0',
        rentCost: '200000000',
        startDate: '2023-12-01',
        endDate: '2026-12-01',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2023-12-01', approver: 'Branch Manager MKS' },
            { role: 'Regional Branches', status: 'Approved', date: '2023-12-05', approver: 'Regional Head East' },
            { role: 'AVP Dealership', status: 'Approved', date: '2023-12-10', approver: 'AVP Sales' },
            { role: 'Owner', status: 'Approved', date: '2023-12-15', approver: 'Owner' }
        ],
        currentWorkflowStep: 3,
        isLeaseProposalFilled: true
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

// CALCULATED DATES FOR DEMO PURPOSES (Assuming Today is March 2024 for example, or dynamic)
const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
}

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
  {
    id: 'DOC-EXP-001',
    documentName: 'SHGB CERTIFICATE SATRIO',
    buildingName: 'HO SATRIO',
    assetNo: 'BDG-JKT-01',
    expiryDate: addDays(today, -5), // Expired
    daysRemaining: -5,
    status: 'Urgent'
  },
  {
    id: 'DOC-URG-002',
    documentName: 'FIRE SAFETY PERMIT',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'BDG-CKG-05',
    expiryDate: addDays(today, 15), // < 1 Month
    daysRemaining: 15,
    status: 'Urgent'
  },
  {
    id: 'DOC-ATT-003',
    documentName: 'REKLAME BILLBOARD TAX',
    buildingName: 'MEC SURYO',
    assetNo: 'BDG-JKT-02',
    expiryDate: addDays(today, 45), // < 2 Months
    daysRemaining: 45,
    status: 'Warning'
  },
  {
    id: 'DOC-WARN-004',
    documentName: 'RENTAL AGREEMENT',
    buildingName: 'MHC BINTARO',
    assetNo: 'BDG-TNG-01',
    expiryDate: addDays(today, 80), // < 3 Months
    daysRemaining: 80,
    status: 'Warning'
  },
  {
    id: 'DOC-UPC-005',
    documentName: 'INSURANCE POLICY',
    buildingName: 'HO SATRIO',
    assetNo: 'BDG-JKT-01',
    expiryDate: addDays(today, 150), // < 6 Months
    daysRemaining: 150,
    status: 'Safe'
  },
  {
    id: 'DOC-SAFE-006',
    documentName: 'DOMISILI PERUSAHAAN',
    buildingName: 'WAREHOUSE MAKASSAR',
    assetNo: 'BDG-MKS-01',
    expiryDate: addDays(today, 300), // > 6 Months
    daysRemaining: 300,
    status: 'Safe'
  }
];

export const MOCK_MAINTENANCE_REMINDER: ReminderRecord[] = [
  {
    id: 'MAINT-2024-001',
    documentName: 'AC CHILLER SERVIS',
    buildingName: 'HO SATRIO - LT 1',
    assetNo: 'AC-CHL-001',
    expiryDate: addDays(today, 5), // Critical
    daysRemaining: 5,
    status: 'Urgent'
  },
  {
    id: 'MAINT-2024-002',
    documentName: 'GENSET 500KVA INSPEKSI',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'GNS-CKG-01',
    expiryDate: addDays(today, 55), // Attention
    daysRemaining: 55,
    status: 'Safe'
  }
];

// Utility Mock Data
export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    {
        id: 'UTIL-2024-001',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Head Office Satrio',
        type: 'Listrik (PLN)',
        meterStart: 124500,
        meterEnd: 125800,
        usage: 1300,
        unit: 'kWh',
        cost: '21500000',
        status: 'Paid',
        recordedBy: 'Agus Teknisi'
    },
    {
        id: 'UTIL-2024-002',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Warehouse Cakung',
        type: 'Listrik (PLN)',
        meterStart: 45000,
        meterEnd: 46200,
        usage: 1200,
        unit: 'kWh',
        cost: '19800000',
        status: 'Pending Review',
        recordedBy: 'Budi Santoso'
    },
    {
        id: 'UTIL-2024-003',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Head Office Satrio',
        type: 'Air (PDAM)',
        meterStart: 3400,
        meterEnd: 3450,
        usage: 50,
        unit: 'm3',
        cost: '750000',
        status: 'Paid',
        recordedBy: 'Agus Teknisi'
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
