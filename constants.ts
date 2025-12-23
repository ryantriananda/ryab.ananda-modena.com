
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem } from './types';

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
        proposals: []
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
export const MOCK_REMINDER_DATA: ReminderRecord[] = [];
export const MOCK_GENERAL_MASTER_DATA = { jenisPajak: [], jenisPembayaran: [], jenisServis: [], statusMutasi: [], statusPenjualan: [], statusRequest: [], tipeMutasi: [], tipeVendor: [], peran: [] };
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [{ id: 1, noRegistrasi: 'REG-2024001', nama: 'TOYOTA AVANZA 1.3 G', noPolisi: 'B 1234 ABC', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif' }];
export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [];
export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [];
