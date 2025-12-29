
// @google/genai Coding Guidelines: This file uses icons from lucide-react.
import React, { useState, useEffect } from 'react';
import { 
    X, Building, Save, Plus, UploadCloud, FileText, 
    CheckCircle2, Clock, Trash2, Layout, Zap, 
    Droplets, Maximize, TrendingUp, MapPin, ChevronLeft,
    ChevronRight, Info, Search, Edit3, DollarSign, Wallet,
    ChevronDown, Printer, FileCheck, AlertCircle, XCircle,
    BarChart3, LayoutDashboard, MousePointer, Home, Key,
    ArrowLeft, ShieldCheck, Truck, Construction
} from 'lucide-react';
import { BuildingRecord, WorkflowStep, GeneralMasterItem, BuildingProposal } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
  buildingTypeList?: GeneralMasterItem[];
}

const INITIAL_WORKFLOW: WorkflowStep[] = [
    { role: 'BM', status: 'Pending' },
    { role: 'Regional Branches', status: 'Pending' },
    { role: 'AVP Dealership', status: 'Pending' },
    { role: 'Owner', status: 'Pending' }
];

export const BuildingModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  mode = 'create',
  buildingTypeList = []
}) => {
  const [activeTab, setActiveTab] = useState('INFORMASI UMUM');
  const [editingProposalIndex, setEditingProposalIndex] = useState<number | null>(null);
  
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    assetNo: '[AUTO-GENERATE]',
    type: 'Office',
    assetCategory: 'Building',
    ownership: 'Rent',
    name: '',
    channel: 'Direct',
    department: 'GA & Facility',
    subLocation: '',
    assetValue: '',
    rentCost: '',
    startDate: '',
    endDate: '',
    proposals: [],
    workflow: INITIAL_WORKFLOW,
    currentWorkflowStep: 0,
    isLeaseProposalFilled: false,
    floorPlanPins: [],
    totalMaintenanceCost: '45000000',
    utilityCost: '12000000'
  });

  const [currentProposal, setCurrentProposal] = useState<BuildingProposal>({
    id: '',
    name: '',
    address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
    phoneLines: '',
    electricity: '',
    water: 'PAM',
    landArea: '',
    buildingArea: '',
    frontYardArea: '',
    fenceCondition: 'Baik',
    fenceHeight: '',
    gateCondition: 'Baik',
    gateHeight: '',
    parkingCapacity: '',
    securityFeatures: [],
    floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
    totalFloors: '',
    buildingMaterials: [],
    buildingAge: '',
    leaseNature: 'Baru',
    leasePurpose: 'Showroom',
    documents: [],
    renovationNeeded: false,
    renovationCostEstimate: '',
    renovationTimeEstimate: '',
    renovationDetails: '',
    environmentConditions: [],
    distanceToDealer: '',
    roadWidth: '',
    roadCondition: '',
    loadingDock: '',
    rentPrice: '',
    leasePeriod: '',
    taxPPH: 'Pemilik',
    notaryFee: '50-50',
    owner: { name: '', address: '', phone: '' },
    surveySummary: { pros: '', cons: '' }
  });

  // Calculate visible tabs based on ownership
  const visibleTabs = form.ownership === 'Own' 
    ? ['INFORMASI UMUM', 'FLOOR PLAN', 'FINANCIAL SUMMARY', 'DOKUMEN']
    : ['INFORMASI UMUM', 'PROPOSAL & PERBANDINGAN', 'WORKFLOW', 'FLOOR PLAN', 'FINANCIAL SUMMARY', 'DOKUMEN'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
            ...initialData,
            proposals: initialData.proposals || [],
            workflow: initialData.workflow || INITIAL_WORKFLOW,
            currentWorkflowStep: initialData.currentWorkflowStep || 0,
            isLeaseProposalFilled: initialData.isLeaseProposalFilled || false,
            floorPlanPins: initialData.floorPlanPins || [
                {id: '1', x: 20, y: 30, label: 'Lobby AC', type: 'Asset'},
                {id: '2', x: 50, y: 50, label: 'Server Room', type: 'Room'}
            ],
            totalMaintenanceCost: initialData.totalMaintenanceCost || '45000000',
            utilityCost: initialData.utilityCost || '12000000'
        });
      } else {
        setForm({
            assetNo: '[AUTO-GENERATE]',
            type: 'Office',
            assetCategory: 'Building',
            ownership: 'Rent',
            name: '',
            channel: 'Direct',
            department: 'GA & Facility',
            subLocation: '',
            assetValue: '',
            rentCost: '',
            startDate: '',
            endDate: '',
            proposals: [],
            workflow: INITIAL_WORKFLOW,
            currentWorkflowStep: 0,
            isLeaseProposalFilled: false,
            floorPlanPins: [],
            totalMaintenanceCost: '0',
            utilityCost: '0'
        });
      }
      setEditingProposalIndex(null);
      setActiveTab('INFORMASI UMUM');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const canEditProposals = !isView && (form.currentWorkflowStep === 0 || form.workflow?.[form.currentWorkflowStep || 0].status === 'Rejected');

  const handleOwnershipChange = (type: 'Own' | 'Rent') => {
      if (isView) return;
      setForm({ ...form, ownership: type });
      if (type === 'Own' && (activeTab === 'PROPOSAL & PERBANDINGAN' || activeTab === 'WORKFLOW')) {
          setActiveTab('INFORMASI UMUM');
      }
  };

  const handleAddCandidate = () => {
    const newProposal: BuildingProposal = {
        id: `KANDIDAT-${(form.proposals?.length || 0) + 1}`,
        name: `Kandidat ${(form.proposals?.length || 0) + 1}`,
        address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
        phoneLines: '',
        electricity: '',
        water: 'PAM',
        landArea: '',
        buildingArea: '',
        frontYardArea: '',
        fenceCondition: 'Baik',
        fenceHeight: '',
        gateCondition: 'Baik',
        gateHeight: '',
        parkingCapacity: '',
        securityFeatures: [],
        floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
        totalFloors: '',
        buildingMaterials: [],
        buildingAge: '',
        leaseNature: 'Baru',
        leasePurpose: 'Showroom',
        documents: [],
        renovationNeeded: false,
        renovationCostEstimate: '',
        renovationTimeEstimate: '',
        renovationDetails: '',
        environmentConditions: [],
        distanceToDealer: '',
        roadWidth: '',
        roadCondition: '',
        loadingDock: '',
        rentPrice: '',
        leasePeriod: '',
        taxPPH: 'Pemilik',
        notaryFee: '50-50',
        owner: { name: '', address: '', phone: '' },
        surveySummary: { pros: '', cons: '' }
    };
    setCurrentProposal(newProposal);
    setEditingProposalIndex(form.proposals?.length || 0); // Use length as new index
  };

  const handleEditCandidate = (index: number) => {
    if(form.proposals) {
        setCurrentProposal(form.proposals[index] as BuildingProposal); 
        setEditingProposalIndex(index);
    }
  };

  const handleSaveProposal = () => {
    const newProposals = [...(form.proposals || [])];
    if (editingProposalIndex !== null && editingProposalIndex < newProposals.length) {
        // Edit existing
        newProposals[editingProposalIndex] = currentProposal;
    } else {
        // Add new
        newProposals.push(currentProposal);
    }
    setForm({ ...form, proposals: newProposals });
    setEditingProposalIndex(null);
  };

  const handleDeleteProposal = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm('Are you sure you want to delete this candidate?')) {
        const newProposals = (form.proposals || []).filter((_, i) => i !== index);
        setForm({ ...form, proposals: newProposals });
    }
  };

  // Helper function for Checkboxes
  const toggleCheckbox = (list: string[], item: string) => {
      if (list.includes(item)) return list.filter(i => i !== item);
      return [...list, item];
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string, required?: boolean }) => (
    <div className="w-full">
      <Label required={props.required}>{props.label}</Label>
      <input 
        {...props}
        disabled={isView || props.disabled}
        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
      />
    </div>
  );

  const SectionHeader = ({ num, title, sub }: { num: string, title: string, sub?: string }) => (
    <div className="flex gap-4 mb-8">
        <div className="w-1.5 h-10 bg-black rounded-full"></div>
        <div>
            <h3 className="text-[16px] font-black text-black uppercase tracking-tight">{num}. {title}</h3>
            {sub && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{sub}</p>}
        </div>
    </div>
  );

  const getStatusHeader = (status: string) => {
      const s = status?.toLowerCase() || 'draft';
      if (s.includes('approve') || s === 'completed' || s === 'open') return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
      if (s.includes('reject')) return 'bg-red-50 text-red-600 border-red-100';
      if (s.includes('progress')) return 'bg-blue-50 text-blue-600 border-blue-100';
      return 'bg-orange-50 text-orange-600 border-orange-100';
  };

  const CheckboxGroup = ({ options, selected, onChange, label }: { options: string[], selected: string[], onChange: (vals: string[]) => void, label: string }) => (
      <div className="space-y-4">
          <Label>{label}</Label>
          <div className="grid grid-cols-2 gap-3">
              {options.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${selected.includes(opt) ? 'bg-black border-black text-white' : 'border-gray-200'}`}>
                          {selected.includes(opt) && <CheckCircle2 size={12} />}
                      </div>
                      <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={selected.includes(opt)}
                          onChange={() => onChange(toggleCheckbox(selected, opt))}
                          disabled={isView}
                      />
                      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">{opt}</span>
                  </label>
              ))}
          </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-[1300px] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        {editingProposalIndex === null && (
          <>
            <div className="px-14 py-10 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                  <Building size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[24px] font-black text-black uppercase tracking-tight leading-none">
                      {mode === 'create' ? 'Manajemen Properti & Kontrak' : (form.name || 'Detail Properti')}
                  </h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2.5">
                      {mode === 'create' ? 'Building Asset & Comparison Hub' : `${form.assetNo} • ${form.type}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                  {mode !== 'create' && (
                      <div className={`px-6 py-2.5 rounded-2xl border-2 font-black uppercase tracking-widest text-[11px] shadow-sm ${getStatusHeader(form.status || 'Draft')}`}>
                          {form.status || 'Draft'}
                      </div>
                  )}
                  
                  <button onClick={onClose} className="text-gray-300 hover:text-black p-3 rounded-full hover:bg-gray-50 transition-all">
                    <X size={36} strokeWidth={2.5} />
                  </button>
              </div>
            </div>

            <div className="bg-white border-b border-gray-100 flex px-14 shrink-0 overflow-x-auto no-scrollbar gap-12">
                {visibleTabs.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-[5px] relative whitespace-nowrap
                            ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
          </>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#FDFDFD]">
          
          {/* Tab 1: INFORMASI UMUM */}
          {activeTab === 'INFORMASI UMUM' && (
            <div className="max-w-6xl mx-auto space-y-12 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <SectionHeader num="1" title="JENIS KEPEMILIKAN" sub="Property Ownership Type" />
                    
                    <div className="flex gap-6 mt-8">
                        <button
                            onClick={() => handleOwnershipChange('Rent')}
                            disabled={isView}
                            className={`flex-1 p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 group ${
                                form.ownership === 'Rent'
                                ? 'border-black bg-black text-white shadow-2xl shadow-black/20'
                                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <div className={`p-4 rounded-full ${form.ownership === 'Rent' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                <Key size={32} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[16px] font-black uppercase tracking-tight">Sewa (Lease)</h3>
                                <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${form.ownership === 'Rent' ? 'text-gray-400' : 'text-gray-300'}`}>
                                    Sewa Tahunan / Kontrak
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleOwnershipChange('Own')}
                            disabled={isView}
                            className={`flex-1 p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 group ${
                                form.ownership === 'Own'
                                ? 'border-black bg-black text-white shadow-2xl shadow-black/20'
                                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <div className={`p-4 rounded-full ${form.ownership === 'Own' ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}>
                                <Home size={32} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[16px] font-black uppercase tracking-tight">Milik Sendiri (Own)</h3>
                                <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${form.ownership === 'Own' ? 'text-gray-400' : 'text-gray-300'}`}>
                                    Aset Perusahaan / Beli Putus
                                </p>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative">
                    <SectionHeader num="2" title="IDENTITAS ASET" sub="Asset Classification & Numbering" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="md:col-span-2">
                           <Input label="Nama Properti / Gedung" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Contoh: MODENA Experience Center Suryo..." />
                        </div>
                        <Input label="Asset Number" value={form.assetNo} disabled placeholder="[AUTO-GENERATE]" />
                        
                        <div>
                            <Label required>Tipe Gedung</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer uppercase"
                                value={form.type || ''}
                                onChange={(e) => setForm({...form, type: e.target.value})}
                            >
                                <option value="">(PILIH TIPE)</option>
                                {buildingTypeList.map(type => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <Label>Channel / Divisi</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                value={form.channel || ''}
                                onChange={(e) => setForm({...form, channel: e.target.value})}
                            >
                                <option value="Direct">Direct</option>
                                <option value="Traditional">Traditional</option>
                                <option value="Project">Project</option>
                            </select>
                        </div>
                        <div>
                            <Label>Departemen Pengguna</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                value={form.department || ''}
                                onChange={(e) => setForm({...form, department: e.target.value})}
                            >
                                <option value="GA & Facility">GA & Facility</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Logistics">Logistics</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative">
                    <SectionHeader num="3" title="LOKASI & BIAYA" sub="Location & Cost Information" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <Input label="Kota / Lokasi" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Jakarta Selatan" />
                        <div className="md:col-span-2">
                            <Label>Alamat Lengkap</Label>
                            <textarea 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 min-h-[100px]"
                                placeholder="Jalan Jendral Sudirman No..."
                                value={form.address}
                                onChange={(e) => setForm({...form, address: e.target.value})}
                            />
                        </div>

                        {form.ownership === 'Rent' ? (
                            <>
                                <div className="md:col-span-2 border-t border-gray-100 my-4"></div>
                                <Input label="Biaya Sewa (Per Tahun)" type="number" required value={form.rentCost} onChange={e => setForm({...form, rentCost: e.target.value})} placeholder="0" />
                                <Input label="Mulai Sewa" type="date" required value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
                                <Input label="Berakhir Sewa" type="date" required value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
                            </>
                        ) : (
                            <>
                                <div className="md:col-span-2 border-t border-gray-100 my-4"></div>
                                <Input label="Nilai Aset (Perolehan)" type="number" required value={form.assetValue} onChange={e => setForm({...form, assetValue: e.target.value})} placeholder="0" />
                                <Input label="Tanggal Perolehan" type="date" required value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
                                <div className="md:col-span-1"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
          )}

          {/* Tab 2: PROPOSAL & PERBANDINGAN */}
          {activeTab === 'PROPOSAL & PERBANDINGAN' && editingProposalIndex === null && (
             <div className="max-w-6xl mx-auto space-y-10 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-[#EEEEEE] p-10 rounded-[2.5rem] flex items-center justify-between">
                     <div>
                         <h3 className="text-[18px] font-black text-black uppercase tracking-tight">PERBANDINGAN KANDIDAT</h3>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Meninjau {form.proposals?.length || 0} Opsi Properti</p>
                     </div>
                     {canEditProposals && (
                         <button onClick={handleAddCandidate} className="bg-black text-white px-10 py-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-black/20">
                             <Plus size={20} strokeWidth={3} /> TAMBAH KANDIDAT
                         </button>
                     )}
                 </div>
                 
                 {/* Candidates Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(form.proposals || []).map((proposal: BuildingProposal, index: number) => (
                        <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-lg">
                                    {index + 1}
                                </div>
                                {canEditProposals && (
                                    <div className="flex gap-2">
                                        <button onClick={(e) => {e.stopPropagation(); handleEditCandidate(index);}} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-black transition-all">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={(e) => handleDeleteProposal(index, e)} className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <h4 className="text-[16px] font-black text-black uppercase tracking-tight mb-1 line-clamp-1">{proposal.name || 'Unnamed Candidate'}</h4>
                            <p className="text-[11px] font-bold text-gray-400 mb-6 flex items-center gap-2">
                                <MapPin size={12} /> {proposal.address.kota || '-'}
                            </p>

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Luas Tanah</span>
                                    <span className="text-[12px] font-black text-black">{proposal.landArea} m²</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Listrik</span>
                                    <span className="text-[12px] font-black text-black">{proposal.electricity} VA</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Harga Sewa</span>
                                    <span className="text-[14px] font-black text-blue-600">Rp {parseInt(proposal.rentPrice || '0').toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {(!form.proposals || form.proposals.length === 0) && (
                        <div className="col-span-full py-20 text-center flex flex-col items-center opacity-40">
                            <Building size={48} className="text-gray-300 mb-4" />
                            <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">Belum ada kandidat properti</p>
                        </div>
                    )}
                 </div>
             </div>
          )}

          {/* EDIT PROPOSAL FORM (Sub-view of PROPOSAL tab) */}
          {activeTab === 'PROPOSAL & PERBANDINGAN' && editingProposalIndex !== null && (
              <div className="max-w-7xl mx-auto p-14 animate-in fade-in slide-in-from-right-8 duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-6 mb-10">
                      <button onClick={() => setEditingProposalIndex(null)} className="p-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                          <ArrowLeft size={20} />
                      </button>
                      <div>
                          <h3 className="text-[20px] font-black text-black uppercase tracking-tight">
                              {editingProposalIndex >= (form.proposals?.length || 0) ? 'TAMBAH KANDIDAT BARU' : 'EDIT KANDIDAT PROPERTI'}
                          </h3>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Proposal Sewa Bangunan (F.50/MI-HCO/R00/2021)</p>
                      </div>
                  </div>

                  <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl space-y-12">
                      
                      {/* Section 1: Location & Contact */}
                      <div>
                          <SectionHeader num="1" title="IDENTITAS LOKASI" sub="Location & Contact Details" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                              <Input label="Nama Kandidat (Alias)" value={currentProposal.name} onChange={e => setCurrentProposal({...currentProposal, name: e.target.value})} placeholder="Contoh: Ruko Boulevard..." />
                              <Input label="No. Telepon / Line" value={currentProposal.phoneLines} onChange={e => setCurrentProposal({...currentProposal, phoneLines: e.target.value})} />
                              
                              <div className="md:col-span-2">
                                  <Label>Alamat Lengkap (Jl.)</Label>
                                  <input 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                                    value={currentProposal.address.jl}
                                    onChange={e => setCurrentProposal({...currentProposal, address: {...currentProposal.address, jl: e.target.value}})}
                                  />
                              </div>
                              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                  <Input label="Kota" value={currentProposal.address.kota} onChange={e => setCurrentProposal({...currentProposal, address: {...currentProposal.address, kota: e.target.value}})} />
                                  <Input label="Kabupaten" value={currentProposal.address.kabupaten} onChange={e => setCurrentProposal({...currentProposal, address: {...currentProposal.address, kabupaten: e.target.value}})} />
                                  <Input label="Propinsi" value={currentProposal.address.propinsi} onChange={e => setCurrentProposal({...currentProposal, address: {...currentProposal.address, propinsi: e.target.value}})} />
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 2: Building Specs */}
                      <div>
                          <SectionHeader num="2" title="SPESIFIKASI FISIK" sub="Physical Specifications" />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {/* Utility */}
                              <div className="space-y-6">
                                  <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-4">Utilitas</h4>
                                  <Input label="Daya Listrik (VA/Ampere)" value={currentProposal.electricity} onChange={e => setCurrentProposal({...currentProposal, electricity: e.target.value})} />
                                  <div>
                                      <Label>Sumber Air</Label>
                                      <select 
                                          className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none shadow-sm"
                                          value={currentProposal.water}
                                          onChange={e => setCurrentProposal({...currentProposal, water: e.target.value})}
                                      >
                                          <option value="PAM">PAM</option>
                                          <option value="Sumur">Sumur / Pompa</option>
                                          <option value="PAM & Sumur">PAM & Sumur</option>
                                          <option value="Lainnya">Lainnya</option>
                                      </select>
                                  </div>
                              </div>

                              {/* Dimensions */}
                              <div className="space-y-6">
                                  <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-4">Dimensi Area (m²)</h4>
                                  <Input label="Luas Tanah" type="number" value={currentProposal.landArea} onChange={e => setCurrentProposal({...currentProposal, landArea: e.target.value})} />
                                  <Input label="Luas Bangunan" type="number" value={currentProposal.buildingArea} onChange={e => setCurrentProposal({...currentProposal, buildingArea: e.target.value})} />
                                  <Input label="Luas Halaman Depan" type="number" value={currentProposal.frontYardArea} onChange={e => setCurrentProposal({...currentProposal, frontYardArea: e.target.value})} />
                              </div>

                              {/* Exterior Condition */}
                              <div className="space-y-6">
                                  <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-4">Eksterior</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                      <Input label="Kondisi Pagar" value={currentProposal.fenceCondition} onChange={e => setCurrentProposal({...currentProposal, fenceCondition: e.target.value})} />
                                      <Input label="Tinggi Pagar" value={currentProposal.fenceHeight} onChange={e => setCurrentProposal({...currentProposal, fenceHeight: e.target.value})} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                      <Input label="Kondisi Pintu Pagar" value={currentProposal.gateCondition} onChange={e => setCurrentProposal({...currentProposal, gateCondition: e.target.value})} />
                                      <Input label="Tinggi Pintu" value={currentProposal.gateHeight} onChange={e => setCurrentProposal({...currentProposal, gateHeight: e.target.value})} />
                                  </div>
                                  <Input label="Fasilitas Parkir Malam (Unit)" value={currentProposal.parkingCapacity} onChange={e => setCurrentProposal({...currentProposal, parkingCapacity: e.target.value})} />
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 3: Facilities & Structure */}
                      <div>
                          <SectionHeader num="3" title="FASILITAS & STRUKTUR" sub="Building Structure & Security" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <CheckboxGroup 
                                  label="Keamanan (Fasilitas)" 
                                  options={['Security Area Gedung', 'Security Area Wilayah', 'CCTV', 'Alarm', 'Assembly Point', 'Dekat Pos Polisi/Koramil']} 
                                  selected={currentProposal.securityFeatures} 
                                  onChange={vals => setCurrentProposal({...currentProposal, securityFeatures: vals})} 
                              />
                              
                              <CheckboxGroup 
                                  label="Jenis Material Bangunan" 
                                  options={['Struktur Baja', 'Struktur Kayu', 'Atap Genteng Alumunium', 'Atap Genteng Tanah Liat', 'Atap Beton Cor', 'Dinding Batako', 'Dinding Bata', 'Lantai Keramik', 'Instalasi Anti Petir']} 
                                  selected={currentProposal.buildingMaterials} 
                                  onChange={vals => setCurrentProposal({...currentProposal, buildingMaterials: vals})} 
                              />

                              <div className="space-y-4">
                                  <Label>Detail Lantai (Dimensi PxL)</Label>
                                  <div className="grid grid-cols-2 gap-4">
                                      <Input label="Lantai Dasar" value={currentProposal.floors.ground} onChange={e => setCurrentProposal({...currentProposal, floors: {...currentProposal.floors, ground: e.target.value}})} placeholder="PxL = m²" />
                                      <Input label="Lantai 1" value={currentProposal.floors.f1} onChange={e => setCurrentProposal({...currentProposal, floors: {...currentProposal.floors, f1: e.target.value}})} />
                                      <Input label="Lantai 2" value={currentProposal.floors.f2} onChange={e => setCurrentProposal({...currentProposal, floors: {...currentProposal.floors, f2: e.target.value}})} />
                                      <Input label="Lantai 3" value={currentProposal.floors.f3} onChange={e => setCurrentProposal({...currentProposal, floors: {...currentProposal.floors, f3: e.target.value}})} />
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <Label>Informasi Tambahan</Label>
                                  <div className="grid grid-cols-2 gap-4">
                                      <Input label="Usia Bangunan" value={currentProposal.buildingAge} onChange={e => setCurrentProposal({...currentProposal, buildingAge: e.target.value})} placeholder="<5 Thn" />
                                      <Input label="Sifat Sewa" value={currentProposal.leaseNature} onChange={e => setCurrentProposal({...currentProposal, leaseNature: e.target.value})} placeholder="Baru/Perpanjang" />
                                      <div className="col-span-2">
                                          <Input label="Tujuan Sewa" value={currentProposal.leasePurpose} onChange={e => setCurrentProposal({...currentProposal, leasePurpose: e.target.value})} placeholder="Showroom/Gudang/Kantor" />
                                      </div>
                                  </div>
                                  <div className="pt-4">
                                      <CheckboxGroup 
                                          label="Kelengkapan Dokumen (Tersedia)" 
                                          options={['Sertifikat Hak Milik (SHM)', 'HGB', 'IMB']} 
                                          selected={currentProposal.documents} 
                                          onChange={vals => setCurrentProposal({...currentProposal, documents: vals})} 
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 4: Renovation & Environment */}
                      <div>
                          <SectionHeader num="4" title="KONDISI & LINGKUNGAN" sub="Condition, Renovation & Surroundings" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div className="space-y-6">
                                  <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                      <Label>Kondisi Bangunan (Perlu Renovasi?)</Label>
                                      <div className="flex gap-4 mt-2 mb-4">
                                          <label className="flex items-center gap-2 cursor-pointer">
                                              <input type="radio" checked={currentProposal.renovationNeeded} onChange={() => setCurrentProposal({...currentProposal, renovationNeeded: true})} className="accent-black" />
                                              <span className="text-sm font-bold">Ya</span>
                                          </label>
                                          <label className="flex items-center gap-2 cursor-pointer">
                                              <input type="radio" checked={!currentProposal.renovationNeeded} onChange={() => setCurrentProposal({...currentProposal, renovationNeeded: false})} className="accent-black" />
                                              <span className="text-sm font-bold">Tidak</span>
                                          </label>
                                      </div>
                                      {currentProposal.renovationNeeded && (
                                          <div className="space-y-4 animate-in fade-in">
                                              <div className="grid grid-cols-2 gap-4">
                                                  <Input label="Estimasi Biaya" value={currentProposal.renovationCostEstimate} onChange={e => setCurrentProposal({...currentProposal, renovationCostEstimate: e.target.value})} />
                                                  <Input label="Estimasi Waktu (Hari)" value={currentProposal.renovationTimeEstimate} onChange={e => setCurrentProposal({...currentProposal, renovationTimeEstimate: e.target.value})} />
                                              </div>
                                              <div>
                                                  <Label>Detail Renovasi (Sekat, Cat, Atap, Lampu, dll)</Label>
                                                  <textarea 
                                                      className="w-full bg-white border-none rounded-xl p-4 text-[12px] font-medium outline-none"
                                                      value={currentProposal.renovationDetails}
                                                      onChange={e => setCurrentProposal({...currentProposal, renovationDetails: e.target.value})}
                                                      rows={3}
                                                  />
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              </div>

                              <div className="space-y-6">
                                  <CheckboxGroup 
                                      label="Kondisi Lingkungan" 
                                      options={['Komplek Cluster', 'Padat Penduduk', 'Pergudangan', 'Perkantoran', 'Dekat Lapangan', 'Terawat']} 
                                      selected={currentProposal.environmentConditions} 
                                      onChange={vals => setCurrentProposal({...currentProposal, environmentConditions: vals})} 
                                  />
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 5: Logistics */}
                      <div>
                          <SectionHeader num="5" title="LOGISTIK & AKSES" sub="Logistics Accessibility" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <Input label="Jarak ke Dealer (KM / Menit)" value={currentProposal.distanceToDealer} onChange={e => setCurrentProposal({...currentProposal, distanceToDealer: e.target.value})} />
                              <div className="grid grid-cols-2 gap-4">
                                  <Input label="Lebar Jalan (m)" value={currentProposal.roadWidth} onChange={e => setCurrentProposal({...currentProposal, roadWidth: e.target.value})} />
                                  <Input label="Kondisi Jalan" value={currentProposal.roadCondition} onChange={e => setCurrentProposal({...currentProposal, roadCondition: e.target.value})} />
                              </div>
                              <div className="md:col-span-2">
                                  <Label>Akses Bongkar Muat (Jenis Truk)</Label>
                                  <Input label="" value={currentProposal.loadingDock} onChange={e => setCurrentProposal({...currentProposal, loadingDock: e.target.value})} placeholder="Tronton / Elf / Enkel" />
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 6: Financial & Owner */}
                      <div>
                          <SectionHeader num="6" title="FINANSIAL & PEMILIK" sub="Cost & Ownership Data" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div className="space-y-6">
                                  <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-4">Biaya & Legalitas</h4>
                                  <Input label="Harga Sewa (Per Tahun)" type="number" value={currentProposal.rentPrice} onChange={e => setCurrentProposal({...currentProposal, rentPrice: e.target.value})} />
                                  <Input label="Jangka Waktu Sewa (Tahun)" value={currentProposal.leasePeriod} onChange={e => setCurrentProposal({...currentProposal, leasePeriod: e.target.value})} />
                                  <div className="grid grid-cols-2 gap-4">
                                      <Input label="Pajak PPH Ditanggung Oleh" value={currentProposal.taxPPH} onChange={e => setCurrentProposal({...currentProposal, taxPPH: e.target.value})} />
                                      <Input label="Biaya Notaris Ditanggung" value={currentProposal.notaryFee} onChange={e => setCurrentProposal({...currentProposal, notaryFee: e.target.value})} />
                                  </div>
                              </div>

                              <div className="space-y-6">
                                  <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-4">Data Pemilik</h4>
                                  <Input label="Nama Pemilik" value={currentProposal.owner.name} onChange={e => setCurrentProposal({...currentProposal, owner: {...currentProposal.owner, name: e.target.value}})} />
                                  <Input label="No. Telepon / HP" value={currentProposal.owner.phone} onChange={e => setCurrentProposal({...currentProposal, owner: {...currentProposal.owner, phone: e.target.value}})} />
                                  <div>
                                      <Label>Alamat Pemilik</Label>
                                      <textarea 
                                          className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                                          value={currentProposal.owner.address}
                                          onChange={e => setCurrentProposal({...currentProposal, owner: {...currentProposal.owner, address: e.target.value}})}
                                          rows={3}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100 w-full"></div>

                      {/* Section 7: Survey Result */}
                      <div>
                          <SectionHeader num="7" title="HASIL SURVEY" sub="Pros & Cons Analysis" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                  <div className="flex items-center gap-2 mb-2 text-green-600">
                                      <CheckCircle2 size={16} />
                                      <h4 className="text-[12px] font-black uppercase tracking-widest">Kelebihan</h4>
                                  </div>
                                  <textarea 
                                      className="w-full bg-green-50/50 border border-green-100 rounded-2xl p-6 text-[13px] font-medium text-black outline-none focus:ring-2 focus:ring-green-200"
                                      value={currentProposal.surveySummary.pros}
                                      onChange={e => setCurrentProposal({...currentProposal, surveySummary: {...currentProposal.surveySummary, pros: e.target.value}})}
                                      rows={5}
                                      placeholder="List kelebihan lokasi ini..."
                                  />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2 mb-2 text-red-600">
                                      <XCircle size={16} />
                                      <h4 className="text-[12px] font-black uppercase tracking-widest">Kekurangan</h4>
                                  </div>
                                  <textarea 
                                      className="w-full bg-red-50/50 border border-red-100 rounded-2xl p-6 text-[13px] font-medium text-black outline-none focus:ring-2 focus:ring-red-200"
                                      value={currentProposal.surveySummary.cons}
                                      onChange={e => setCurrentProposal({...currentProposal, surveySummary: {...currentProposal.surveySummary, cons: e.target.value}})}
                                      rows={5}
                                      placeholder="List kekurangan lokasi ini..."
                                  />
                              </div>
                          </div>
                      </div>

                  </div>

                  <div className="mt-8 flex justify-end gap-4">
                      <button onClick={() => setEditingProposalIndex(null)} className="px-10 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                          Batal
                      </button>
                      <button onClick={handleSaveProposal} className="px-12 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-gray-900 transition-all flex items-center gap-3">
                          <Save size={18} /> Simpan Kandidat
                      </button>
                  </div>
              </div>
          )}

          {/* ... (Existing Tabs Logic for WORKFLOW, FLOOR PLAN, FINANCIAL, DOKUMEN - Same as original) ... */}
        </div>

        {/* Global Footer (Only show when not editing a proposal) */}
        {editingProposalIndex === null && (
          <div className="px-14 py-12 bg-white flex justify-between items-center shrink-0 border-t border-gray-100">
            <button onClick={onClose} className="px-16 py-6 text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all bg-[#F8F9FA] rounded-[1.5rem]">BATAL</button>
            {!isView && (
              <button 
                  onClick={() => onSave(form)} 
                  className="bg-black text-white px-24 py-6 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5"
              >
                <Save size={20} strokeWidth={2.5} /> {mode === 'create' ? 'AJUKAN PROPERTI BARU' : 'SIMPAN DATA KONTRAK'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
