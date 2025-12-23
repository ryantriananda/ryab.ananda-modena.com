
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, BuildingProposal } from './types';

// Helper for generating deep proposal data for Comparison
const generateMockProposals = (buildingId: string): BuildingProposal[] => [
  {
    id: `PROP-${buildingId}-1`,
    optionName: 'Opsi Utama (Kuningan Central)',
    address: { jl: 'Jl. HR Rasuna Said Kav. 10', kota: 'Jakarta', kabupaten: 'Selatan', propinsi: 'DKI Jakarta' },
    phoneLines: '10 Lines',
    electricity: '33000 VA',
    water: 'PAM (Deep Well Backup)',
    areas: { land: '1200', building: '850', frontYard: '350' },
    conditions: { fence: 'Tembok Keliling 2m', gate: 'Automatic Sliding', parking: '15 Mobil' },
    security: ['CCTV 16 Channel', 'Security Post 24/7', 'Smoke Detector'],
    floors: { ground: 'Marble Luxury', f1: 'Granite 80x80', f2: 'Parquet', f3: 'Carpet Tile', f4: '-' },
    materials: ['Tiang Beton Cor', 'Kaca Tempered 12mm', 'Atap Bitumen'],
    legal: { shm: true, hgb: true, imb: true, expiredHgb: '2045-12-31' },
    costs: { rent: '1250000000', tax: '125000000', notary: '15000000' },
    owner: { name: 'PT Mulia Properti', phone: '021-5556677', address: 'Jakarta' },
    survey: { pros: ['Lokasi Ring 1', 'Fasilitas Premium'], cons: ['Harga di atas budget awal'] }
  },
  {
    id: `PROP-${buildingId}-2`,
    optionName: 'Opsi Alternatif (Mega Kuningan)',
    address: { jl: 'Jl. Lingkar Luar No. 45', kota: 'Jakarta', kabupaten: 'Selatan', propinsi: 'DKI Jakarta' },
    phoneLines: '5 Lines',
    electricity: '16500 VA',
    water: 'PAM',
    areas: { land: '800', building: '900', frontYard: '100' },
    conditions: { fence: 'Minimalis Besi', gate: 'Manual Swing', parking: '8 Mobil' },
    security: ['CCTV 8 Channel', 'Alarm System'],
    floors: { ground: 'Granite', f1: 'Granite', f2: 'Ceramic', f3: '-', f4: '-' },
    materials: ['Bata Merah', 'Alumunium Composite Panel'],
    legal: { shm: false, hgb: true, imb: true, expiredHgb: '2030-05-20' },
    costs: { rent: '950000000', tax: '95000000', notary: '10000000' },
    owner: { name: 'Ibu Hanny Wijaya', phone: '081299887766', address: 'BSD City' },
    survey: { pros: ['Harga kompetitif', 'Maintenance rendah'], cons: ['Akses jalan sempit untuk truk'] }
  }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    {
        id: '1',
        name: 'MODENA Experience Center Satrio',
        assetNo: 'BDG-JKT-HO-001',
        type: 'Showroom & Office',
        ownership: 'Own',
        location: 'Jakarta Selatan',
        address: 'Jl. Prof. DR. Satrio No. C4, Kuningan',
        status: 'Open',
        department: 'Sales & Marketing',
        channel: 'Direct',
        subLocation: 'Main Building - All Floor',
        certificateNo: 'SHM/9981/JKT-SEL/2015',
        acquisitionValue: '85000000000',
        proposals: []
    },
    {
        id: '2',
        name: 'Warehouse Distribution Cakung',
        assetNo: 'BDG-JKT-WH-042',
        type: 'Warehouse',
        ownership: 'Rent',
        location: 'Jakarta Timur',
        address: 'Kawasan Industri Cakung Blok B No. 12',
        status: 'Open',
        department: 'Supply Chain',
        channel: 'Indirect',
        subLocation: 'Area A - Logistik Hub',
        landlordName: 'PT Pergudangan Jaya Utama',
        rentalCost: '1850000000',
        startDate: '2023-01-01',
        endDate: '2026-01-01',
        proposals: generateMockProposals('2')
    },
    {
        id: '3',
        name: 'Branch Office Surabaya West',
        assetNo: 'BDG-SBY-OF-005',
        type: 'Office',
        ownership: 'Rent',
        location: 'Surabaya',
        address: 'Jl. Ahmad Yani No. 15, Gayungan',
        status: 'Open',
        department: 'Operations',
        channel: 'Direct',
        subLocation: 'Lantai 3 & 4',
        landlordName: 'Maspion Square Property Management',
        rentalCost: '550000000',
        startDate: '2024-03-01',
        endDate: '2025-03-01',
        proposals: generateMockProposals('3').slice(0, 1)
    },
    {
        id: '4',
        name: 'MODENA Home Center Bandung',
        assetNo: 'BDG-BDG-SH-012',
        type: 'Showroom',
        ownership: 'Rent',
        location: 'Bandung',
        address: 'Jl. Pelajar Pejuang 45 No. 22',
        status: 'Draft',
        department: 'Retail Sales',
        channel: 'Direct',
        subLocation: 'Ground Floor Area',
        landlordName: 'Bapak Haji Ridwan Kamil',
        rentalCost: '320000000',
        startDate: '2024-07-01',
        endDate: '2027-07-01',
        proposals: generateMockProposals('4')
    }
];

// Re-export other existing mocks to maintain app functionality
export const MOCK_DATA: AssetRecord[] = []; 
export const MOCK_ARK_DATA: AssetRecord[] = [];
export const MOCK_MASTER_DATA: MasterItem[] = [];
export const MOCK_MASTER_ARK_DATA: MasterItem[] = [];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{id: 1, name: 'PCS'}, {id: 2, name: 'UNIT'}];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [];
export const MOCK_REMINDER_DATA: ReminderRecord[] = [];
export const MOCK_GENERAL_MASTER_DATA = { jenisPajak: [], jenisPembayaran: [], jenisServis: [], statusMutasi: [], statusPenjualan: [], statusRequest: [], tipeMutasi: [], tipeVendor: [], peran: [] };
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [];
export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [];
export const MOCK_SERVICE_DATA: ServiceRecord[] = [];
export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];

// Mock data for Vendor Management
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
  {
    id: 1,
    nama: 'PT Astra International',
    merek: 'Toyota',
    alamat: 'Jl. Gaya Motor III No.5, Jakarta Utara',
    noTelp: '021-6507000',
    tipe: 'Main Dealer',
    cabang: 'Jakarta',
    aktif: true
  },
  {
    id: 2,
    nama: 'Bengkel AHASS 001',
    merek: 'Honda',
    alamat: 'Jl. Sudirman No.10, Bandung',
    noTelp: '022-123456',
    tipe: 'Service Center',
    cabang: 'Bandung',
    aktif: true
  }
];
