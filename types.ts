
import React from 'react';

export interface Employee {
  name: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
}

export interface SparePart {
  name: string;
  qty: number;
  price: string;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  vendorName: string;
  qty: number;
  unitPrice: string;
  totalPrice: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  attachmentUrl?: string;
}

export interface AssetRecord {
  id: number;
  transactionNumber?: string;
  employee: Employee;
  category: string;
  itemName: string;
  itemDescription: string;
  qty: number;
  date: string;
  remainingStock: number;
  itemCode: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Closed' | 'Draft' | 'On Progress';
}

export interface VehicleRecord {
  id: number;
  noRegistrasi: string;
  nama: string;
  noPolisi: string;
  channel: string;
  cabang: string;
  status: 'Aktif' | 'Tidak Aktif';
  ownership?: 'Milik Modena' | 'Sewa';
  merek?: string;
  tipeKendaraan?: string;
  jenis?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  pengguna?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  hargaBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
}

export interface VehicleContractRecord {
  id: string;
  noPolisi: string;
  aset: string;
  noKontrak: string;
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  status: 'Aktif' | 'Selesai';
  keterangan?: string;
  ownership?: 'Milik Modena' | 'Sewa';
  
  // Fields from Image
  merek?: string;
  tipeKendaraan?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  channel?: string;
  cabang?: string;
  penggunaUtama?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
  attachmentUrl?: string;
}

export interface MaintenanceSchedule {
  id: string;
  taskName: string;
  plannedDate: string;
  technician: string;
  status: 'Scheduled' | 'Completed' | 'Missed';
}

export interface MaintenanceProposal {
  id: string;
  vendorName: string;
  proposalName: string;
  submissionDate: string;
  estimatedCost: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  attachmentUrl?: string;
}

export interface CooperationDetail {
  activeVendor?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  serviceLevelAgreement?: string;
  monthlyMaintenanceFee?: string;
}

export type BuildingWorkflowStatus = 'Draft' | 'Pending Approval' | 'Revised' | 'Approved' | 'Rejected';

export interface BuildingAssetRecord {
  id: string;
  assetCode: string;
  assetType: 'AC' | 'APAR' | 'CCTV' | 'Genset' | 'Lift' | 'Pompa' | 'Panel Listrik' | 'Fire Alarm' | string;
  assetName: string;
  brand?: string;
  modelNumber?: string;
  serialNumber?: string;
  capacity?: string;
  
  // Placement
  buildingName: string;
  floor: string;
  roomName: string;
  
  // Maintenance
  maintenanceFrequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'None';
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  schedules?: MaintenanceSchedule[];
  
  // Proposals & Cooperation
  proposals?: MaintenanceProposal[];
  cooperation?: CooperationDetail;

  status: 'Good' | 'Fair' | 'Critical' | 'Maintenance';
  approvalStatus?: BuildingWorkflowStatus;
  ownership: 'Own' | 'Leased';
  vendorMaintenance?: string;
  attachmentUrl?: string;
  qrCodeUrl?: string; // New Field for QR
}

export interface BuildingMaintenanceRecord {
  id: string;
  requestDate: string;
  completionDate?: string;
  assetId: string;
  assetName: string;
  buildingLocation: string; // derived from asset
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  description: string;
  vendor: string;
  technician?: string;
  cost: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Pending';
  approvalStatus?: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  attachmentUrl?: string;
  
  // New Fields for Suggestions
  rating?: number; // 1-5 stars
  evidenceBefore?: string; // URL image
  evidenceAfter?: string; // URL image
  slaStatus?: 'On Track' | 'Overdue' | 'Warning';
}

export interface WorkflowStep {
  role: 'BM' | 'Regional Branches' | 'AVP Dealership' | 'Owner';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Skipped';
  date?: string;
  approver?: string;
  comment?: string;
}

export interface FloorPlanPin {
    id: string;
    x: number; // Percentage
    y: number; // Percentage
    label: string;
    type: 'Asset' | 'Room';
}

export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  assetCategory?: string;
  type: string;
  ownership: 'Own' | 'Rent';
  location: string;
  subLocation?: string;
  address: string;
  status: string;
  startDate?: string;
  endDate?: string;
  proposals?: BuildingProposal[];
  channel?: string;
  department?: string;
  
  // Financials
  assetValue?: string;
  rentCost?: string;

  // Workflow
  workflow?: WorkflowStep[];
  currentWorkflowStep?: number; // 0 to 3
  isLeaseProposalFilled?: boolean;

  // New Fields
  floorPlanImage?: string;
  floorPlanPins?: FloorPlanPin[];
  
  // Cost Analysis Data (Mocked)
  totalMaintenanceCost?: string;
  utilityCost?: string; // Electricity, Water
}

export interface BuildingProposal {
  id: string;
  optionName: string;
  address: {
    jl: string;
    kota: string;
    kabupaten: string;
    propinsi: string;
  };
  phoneLines: string;
  electricity: string;
  water: string;
  areas: {
    land: string;
    building: string;
    frontYard: string;
  };
  conditions: {
    fence: string;
    gate: string;
    parking: string;
  };
  security: string[];
  floors: {
    ground: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
  };
  materials: string[];
  legal: {
    shm: boolean;
    hgb: boolean;
    imb: boolean;
  };
  costs: {
    rent: string;
    tax: string;
    notary: string;
  };
  owner: {
    name: string;
    phone: string;
    address: string;
  };
  survey: {
    pros: string[];
    cons: string[];
  };
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  aset?: string;
  tglStnk?: string;
  jenisServis?: string;
  vendor?: string;
  targetSelesai?: string;
  kmKendaraan?: string;
  masalah?: string;
  penyebab?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  namaBank?: string;
  nomorRekening?: string;
  spareParts?: SparePart[];
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  jenis: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  aset?: string;
  tahunPembuatan?: string;
  vendor?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  targetSelesai?: string;
}

export interface MutationRecord {
  id: string;
  noPolisi: string;
  cabangAset: string;
  tipeMutasi: string;
  tglPermintaan: string;
  lokasiAsal: string;
  lokasiTujuan: string;
  status: string;
  statusApproval: string;
}

export interface SalesRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  hargaTertinggi: string;
  status: string;
  statusApproval: string;
  
}

export interface MasterVendorRecord {
  id: number;
  nama: string;
  merek: string;
  alamat: string;
  noTelp: string;
  tipe: string;
  cabang: string;
  aktif: boolean;
}

export interface LogBookRecord {
  id: number;
  lokasiModena: string;
  kategoriTamu: string;
  namaTamu: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note: string;
}

export interface MasterItem {
  id: string | number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  purchaseDate: string;
  lastPurchasePrice: string;
  averagePrice: string;
  imageUrl?: string;
  purchaseHistory?: PurchaseRecord[];
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string;
  categoryId?: string;
  uom?: string;
}

export interface StationeryRequestRecord {
  type: string;
  date: string;
  remarks?: string;
  deliveryType: string;
  location: string;
  items: StationeryRequestItem[];
}

export interface ContractRecord {
  id: number;
  assetCategory: string;
  assetNumber: string;
  address: string;
  type: string;
  location: string;
  channel: string;
  subLocation: string;
  status: string;
  ownership?: string;
  department?: string;
}

export interface TimesheetRecord {
  id: string | number;
  employee: Employee;
  date: string;
  dayType: string;
  task: string;
  clockIn: string;
  clockOut: string;
  status: string;
  photos: string[];
}

export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode: string;
  status: string;
}

export interface GeneralMasterItem {
  id: number;
  name: string;
  }

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  address: string;
  type: string;
  }

export interface ReminderRecord {
  id: string | number;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'Urgent' | 'Warning' | 'Safe' | string;
}

export interface GeneralAssetRecord {
  assetNumber: string;
  assetCategory: string;
  ownership: string;
  type: string;
  assetLocation: string;
  channel: string;
  department: string;
  subLocation: string;
  address: string;
}
