
// @google/genai Coding Guidelines: This file uses icons from lucide-react.
import React, { useState, useEffect } from 'react';
import { 
    X, Building, Save, Plus, UploadCloud, FileText, 
    CheckCircle2, Clock, Trash2, Layout, Zap, 
    Droplets, Maximize, TrendingUp, MapPin, ChevronLeft,
    ChevronRight, Info, Search, Edit3, DollarSign, Wallet,
    ChevronDown, Printer, FileCheck, AlertCircle, XCircle
} from 'lucide-react';
import { BuildingRecord, WorkflowStep } from '../types';

interface ProposalData {
  id: string;
  name: string;
  fullAddress: string;
  city: string;
  district: string;
  province: string;
  electricity: string;
  waterSource: string;
  landArea: string;
  buildingArea: string;
  rentPerYear: string;
  taxEstimation: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
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
    isLeaseProposalFilled: false
  });

  const [currentProposal, setCurrentProposal] = useState<ProposalData>({
    id: '',
    name: '',
    fullAddress: '',
    city: '',
    district: '',
    province: '',
    electricity: '',
    waterSource: 'PAM',
    landArea: '',
    buildingArea: '',
    rentPerYear: '',
    taxEstimation: ''
  });

  // Calculate visible tabs based on ownership
  const visibleTabs = form.ownership === 'Own' 
    ? ['INFORMASI UMUM', 'DOKUMEN']
    : ['INFORMASI UMUM', 'PROPOSAL & PERBANDINGAN', 'WORKFLOW', 'DOKUMEN'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
            ...initialData,
            proposals: initialData.proposals || [],
            workflow: initialData.workflow || INITIAL_WORKFLOW,
            currentWorkflowStep: initialData.currentWorkflowStep || 0,
            isLeaseProposalFilled: initialData.isLeaseProposalFilled || false
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
            isLeaseProposalFilled: false
        });
      }
      setEditingProposalIndex(null);
      setActiveTab('INFORMASI UMUM');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isWorkflowCompleted = form.currentWorkflowStep === 3 && form.workflow?.[3].status === 'Approved';
  const canEditProposals = !isView && (form.currentWorkflowStep === 0 || form.workflow?.[form.currentWorkflowStep || 0].status === 'Rejected');

  const handleOwnershipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newOwnership = e.target.value as 'Own' | 'Rent';
      setForm({ ...form, ownership: newOwnership });
      
      if (newOwnership === 'Own' && (activeTab === 'PROPOSAL & PERBANDINGAN' || activeTab === 'WORKFLOW')) {
          setActiveTab('INFORMASI UMUM');
      }
  };

  const handleAddCandidate = () => {
    const newProposal: ProposalData = {
        id: `KANDIDAT-${(form.proposals?.length || 0) + 1}`,
        name: `Kandidat ${(form.proposals?.length || 0) + 1}`,
        fullAddress: '',
        city: '',
        district: '',
        province: '',
        electricity: '',
        waterSource: 'PAM',
        landArea: '',
        buildingArea: '',
        rentPerYear: '',
        taxEstimation: ''
    };
    setCurrentProposal(newProposal);
    setEditingProposalIndex(form.proposals?.length || 0);
  };

  const handleEditCandidate = (index: number) => {
    if(form.proposals) {
        setCurrentProposal(form.proposals[index] as unknown as ProposalData); 
        setEditingProposalIndex(index);
    }
  };

  const handleSaveProposal = () => {
    const newProposals = [...(form.proposals || [])];
    if (editingProposalIndex !== null) {
        newProposals[editingProposalIndex] = currentProposal as any;
    } else {
        newProposals.push(currentProposal as any);
    }
    setForm({ ...form, proposals: newProposals });
    setEditingProposalIndex(null);
  };

  const handleDeleteProposal = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newProposals = (form.proposals || []).filter((_, i) => i !== index);
    setForm({ ...form, proposals: newProposals });
  };

  const handleWorkflowAction = (action: 'Approve' | 'Reject') => {
      const currentStepIdx = form.currentWorkflowStep || 0;
      const newWorkflow = [...(form.workflow || [])];
      const today = new Date().toISOString().split('T')[0];

      if (action === 'Approve') {
          newWorkflow[currentStepIdx] = {
              ...newWorkflow[currentStepIdx],
              status: 'Approved',
              date: today,
              approver: 'User (Simulation)'
          };
          
          let nextStepIdx = currentStepIdx;
          if (currentStepIdx < 3) {
              nextStepIdx = currentStepIdx + 1;
              newWorkflow[nextStepIdx] = { ...newWorkflow[nextStepIdx], status: 'Pending', date: undefined, approver: undefined };
          }

          setForm({
              ...form,
              workflow: newWorkflow,
              currentWorkflowStep: nextStepIdx,
              status: nextStepIdx === 3 && action === 'Approve' ? 'Approved' : 'On Progress'
          });
      } else {
          newWorkflow[currentStepIdx] = {
              ...newWorkflow[currentStepIdx],
              status: 'Rejected',
              date: today,
              approver: 'User (Simulation)',
              comment: 'Rejected, please revise proposal.'
          };

          newWorkflow[0] = { ...newWorkflow[0], status: 'Pending', date: undefined, approver: undefined };
          
          for(let i = 1; i <= currentStepIdx; i++) {
             if (i !== 0) newWorkflow[i] = { ...newWorkflow[i], status: 'Pending', date: undefined, approver: undefined };
          }

          setForm({
              ...form,
              workflow: newWorkflow,
              currentWorkflowStep: 0,
              status: 'Rejected'
          });
      }
  };

  const handleFillLeaseProposal = () => {
      setForm({ ...form, isLeaseProposalFilled: true, status: 'Completed' });
      alert("Proposal Sewa Gedung has been filled successfully!");
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

  // Status Badge Logic for Header
  const getStatusHeader = (status: string) => {
      const s = status?.toLowerCase() || 'draft';
      if (s.includes('approve') || s === 'completed' || s === 'open') return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
      if (s.includes('reject')) return 'bg-red-50 text-red-600 border-red-100';
      if (s.includes('progress')) return 'bg-blue-50 text-blue-600 border-blue-100';
      return 'bg-orange-50 text-orange-600 border-orange-100'; // Pending
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-[1300px] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header with Status Above */}
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
                  {/* Status Badge Diatas */}
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
                        className={`py-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-[5px] relative
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
                {/* Section 1: IDENTITAS ASET */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
                    <SectionHeader num="1" title="IDENTITAS ASET" sub="Asset Classification & Numbering" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="md:col-span-2">
                           <Input label="Nama Properti / Gedung" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Input Nama Gedung..." />
                        </div>
                        <Input label="Asset Number" value={form.assetNo} disabled placeholder="[AUTO-GENERATE]" />
                        <Input label="Asset Category" value={form.assetCategory} onChange={e => setForm({...form, assetCategory: e.target.value})} />
                        <Input label="Tipe Gedung" required value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
                        
                        <div>
                            <Label required>Model Kepemilikan</Label>
                            <div className="relative">
                                <select
                                    disabled={isView}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all shadow-sm focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer"
                                    value={form.ownership}
                                    onChange={handleOwnershipChange}
                                >
                                    <option value="Rent">Sewa / Rental</option>
                                    <option value="Own">Milik Sendiri (Own)</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: STRUKTUR & ORGANISASI */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    <SectionHeader num="2" title="STRUKTUR & ORGANISASI" sub="Department & Channel Assignment" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Input label="Channel" required value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} />
                        <Input label="Department" required value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
                    </div>
                </div>

                {/* Section 3: LOKASI & ALAMAT */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    <SectionHeader num="3" title="LOKASI & ALAMAT" sub="Physical Location Details" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Input label="Asset Location (City/Branch)" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                        <Input label="Sub - Location (Building Detail)" value={form.subLocation} onChange={e => setForm({...form, subLocation: e.target.value})} placeholder="Ex: Lantai 3, Sayap Barat..." />
                        <div className="md:col-span-2">
                            <Label>Alamat Lengkap</Label>
                            <textarea 
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5 min-h-[100px]"
                                value={form.address}
                                onChange={e => setForm({...form, address: e.target.value})}
                                disabled={isView}
                                placeholder="Input alamat lengkap sesuai sertifikat/kontrak..."
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4: INFORMASI FINANSIAL & HARGA */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    <SectionHeader num="4" title="INFORMASI FINANSIAL & HARGA" sub="Asset Valuation & Costs" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <Label>Nilai Aset / Harga Perolehan</Label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-gray-400">Rp</span>
                                <input 
                                    type="text"
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl pl-12 pr-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5"
                                    value={form.assetValue}
                                    onChange={e => setForm({...form, assetValue: e.target.value})}
                                    disabled={isView}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        
                        <div className={`${form.ownership === 'Own' ? 'opacity-50 pointer-events-none' : ''}`}>
                            <Label>Biaya Sewa / Tahun (Jika Rental)</Label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-gray-400">Rp</span>
                                <input 
                                    type="text"
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl pl-12 pr-6 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5"
                                    value={form.rentCost}
                                    onChange={e => setForm({...form, rentCost: e.target.value})}
                                    disabled={isView || form.ownership === 'Own'}
                                    placeholder={form.ownership === 'Own' ? "Not Applicable" : "0"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5: PERIODE KONTRAK */}
                <div className={`bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-opacity duration-300 ${form.ownership === 'Own' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                    <SectionHeader num="5" title="PERIODE KONTRAK" sub="Lease Duration & Validity" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Input label="Tanggal Mulai (Start Date)" type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required={form.ownership === 'Rent'} />
                        <Input label="Tanggal Berakhir (End Date)" type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required={form.ownership === 'Rent'} />
                    </div>
                </div>

            </div>
          )}

          {/* Tab 2: PROPOSAL & PERBANDINGAN */}
          {activeTab === 'PROPOSAL & PERBANDINGAN' && (
            <div className="h-full">
               {editingProposalIndex === null ? (
                 <div className="max-w-6xl mx-auto space-y-10 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-[#EEEEEE] p-10 rounded-[2.5rem] flex items-center justify-between">
                         <div>
                             <h3 className="text-[18px] font-black text-black uppercase tracking-tight">PERBANDINGAN KANDIDAT LOKASI</h3>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Meninjau {form.proposals?.length || 0} Opsi Properti Terbaik</p>
                         </div>
                         {/* Only allow adding if we are at the start of workflow or it was rejected (back to BM) */}
                         {canEditProposals && (
                             <button 
                                onClick={handleAddCandidate}
                                className="bg-black text-white px-10 py-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/20"
                             >
                                 <Plus size={20} strokeWidth={3} /> TAMBAH KANDIDAT OPSI
                             </button>
                         )}
                    </div>
                    
                    {!canEditProposals && (
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center gap-3">
                            <Info size={18} className="text-orange-500" />
                            <p className="text-[11px] font-black text-orange-600 uppercase tracking-wide">
                                Opsi komparasi dikunci karena sedang dalam proses approval. Jika direject, opsi akan terbuka kembali untuk revisi.
                            </p>
                        </div>
                    )}

                    {(form.proposals || []).length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3.5rem] min-h-[450px] flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 shadow-inner">
                                <FileText size={48} />
                            </div>
                            <p className="text-[12px] font-black text-gray-300 uppercase tracking-[0.4em]">Belum ada proposal kandidat gedung</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(form.proposals || []).map((prop: any, idx: number) => (
                                <div 
                                    key={idx}
                                    onClick={() => canEditProposals && handleEditCandidate(idx)}
                                    className={`bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm transition-all group relative overflow-hidden
                                        ${canEditProposals ? 'hover:shadow-xl hover:translate-y-[-4px] cursor-pointer' : 'opacity-80 cursor-default'}
                                    `}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                                            <MapPin size={20} />
                                        </div>
                                        {canEditProposals && (
                                            <button 
                                                onClick={(e) => handleDeleteProposal(idx, e)}
                                                className="text-gray-200 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <h4 className="text-[15px] font-black text-black uppercase tracking-tight mb-2">{prop.name || prop.optionName}</h4>
                                    <p className="text-[11px] text-gray-400 font-medium line-clamp-2 min-h-[32px]">{prop.fullAddress || (prop.address?.jl ? `${prop.address.jl}, ${prop.address.kota}` : 'Alamat belum diisi...')}</p>
                                    
                                    <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[9px] font-black text-gray-300 uppercase">Luas Bangunan</div>
                                            <div className="text-[12px] font-black text-black">{prop.buildingArea || prop.areas?.building || '0'} M²</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-gray-300 uppercase">Estimasi Sewa</div>
                                            <div className="text-[12px] font-black text-blue-600">Rp {parseInt(prop.rentPerYear || prop.costs?.rent || '0').toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                 </div>
               ) : (
                 <div className="animate-in fade-in duration-500 flex flex-col h-full bg-[#FDFDFD]">
                    {/* Detail Edit View */}
                    <div className="px-14 py-10 bg-white flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
                      <div className="flex items-center gap-8">
                        <button 
                          onClick={() => setEditingProposalIndex(null)}
                          className="text-gray-300 hover:text-black transition-all"
                        >
                          <X size={28} strokeWidth={2.5} />
                        </button>
                        <div>
                          <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">Detail Teknis & Survey: {currentProposal.name}</h2>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Deep Comparison Matrix</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleSaveProposal}
                        className="bg-black text-white px-12 py-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center gap-3"
                      >
                        <CheckCircle2 size={18} /> SIMPAN & KEMBALI
                      </button>
                    </div>
                    {/* Reusing simplified structure for detail inputs */}
                    <div className="max-w-7xl mx-auto w-full p-14 pt-16">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
                          <div className="space-y-16">
                              <div className="space-y-12">
                                  <SectionHeader num="1" title="LOKASI & UTILITAS" />
                                  <div className="space-y-10">
                                      <Input label="Alamat Lengkap (Jl.)" value={currentProposal.fullAddress} onChange={e => setCurrentProposal({...currentProposal, fullAddress: e.target.value})} placeholder="Input Alamat Lengkap..." />
                                      <div className="grid grid-cols-3 gap-8">
                                          <Input label="Kota" value={currentProposal.city} onChange={e => setCurrentProposal({...currentProposal, city: e.target.value})} />
                                          <Input label="Kabupaten" value={currentProposal.district} onChange={e => setCurrentProposal({...currentProposal, district: e.target.value})} />
                                          <Input label="Propinsi" value={currentProposal.province} onChange={e => setCurrentProposal({...currentProposal, province: e.target.value})} />
                                      </div>
                                  </div>
                              </div>
                              <div className="space-y-12">
                                  <SectionHeader num="2" title="FASILITAS TEKNIS" />
                                  <div className="grid grid-cols-2 gap-10">
                                      <Input label="Daya Listrik (VA)" value={currentProposal.electricity} onChange={e => setCurrentProposal({...currentProposal, electricity: e.target.value})} />
                                      <Input label="Sumber Air" value={currentProposal.waterSource} onChange={e => setCurrentProposal({...currentProposal, waterSource: e.target.value})} />
                                  </div>
                              </div>
                          </div>
                          <div className="space-y-16">
                              <div className="space-y-12">
                                  <SectionHeader num="3" title="LUAS & STRUKTUR" />
                                  <div className="grid grid-cols-2 gap-10">
                                      <Input label="Luas Tanah (M²)" value={currentProposal.landArea} onChange={e => setCurrentProposal({...currentProposal, landArea: e.target.value})} />
                                      <Input label="Luas Bangunan (M²)" value={currentProposal.buildingArea} onChange={e => setCurrentProposal({...currentProposal, buildingArea: e.target.value})} />
                                  </div>
                              </div>
                              <div className="space-y-12">
                                  <SectionHeader num="4" title="ANALISA ANGGARAN" />
                                  <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-12">
                                      <div>
                                          <Label>Biaya Sewa / Tahun (Gross)</Label>
                                          <div className="flex items-baseline gap-3">
                                              <span className="text-[24px] font-black text-gray-300">Rp</span>
                                              <input className="bg-transparent border-none text-[26px] font-black text-black outline-none placeholder:text-gray-100 w-full" placeholder="0" value={currentProposal.rentPerYear} onChange={e => setCurrentProposal({...currentProposal, rentPerYear: e.target.value})} />
                                          </div>
                                          <div className="h-[1.5px] bg-gray-50 mt-5"></div>
                                      </div>
                                      <div>
                                          <Label>Estimasi Pajak PPH Final (10%)</Label>
                                          <div className="flex items-baseline gap-3">
                                              <span className="text-[24px] font-black text-gray-300">Rp</span>
                                              <input className="bg-transparent border-none text-[26px] font-black text-black outline-none placeholder:text-gray-100 w-full" placeholder="0" value={currentProposal.taxEstimation} onChange={e => setCurrentProposal({...currentProposal, taxEstimation: e.target.value})} />
                                          </div>
                                          <div className="h-[1.5px] bg-gray-50 mt-5"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* WORKFLOW TAB (Only visible for Rent) */}
          {activeTab === 'WORKFLOW' && (
             <div className="max-w-6xl mx-auto space-y-10 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Workflow Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        {form.workflow?.map((step, index) => {
                            const isCurrent = index === form.currentWorkflowStep;
                            const isCompleted = step.status === 'Approved';
                            const isRejected = step.status === 'Rejected';
                            const isPending = step.status === 'Pending';

                            return (
                                <div key={index} className={`relative pl-12 ${index !== (form.workflow?.length || 0) - 1 ? 'pb-12' : ''}`}>
                                    {/* Vertical Line */}
                                    {index !== (form.workflow?.length || 0) - 1 && (
                                        <div className={`absolute left-[19px] top-10 bottom-0 w-[2px] ${isCompleted ? 'bg-black' : 'bg-gray-100'}`}></div>
                                    )}
                                    
                                    {/* Icon */}
                                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-all
                                        ${isCompleted ? 'bg-black text-white' : isRejected ? 'bg-red-500 text-white' : isCurrent ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-gray-100 text-gray-400'}
                                    `}>
                                        {isCompleted ? <CheckCircle2 size={16} /> : isRejected ? <XCircle size={16} /> : isCurrent ? <TrendingUp size={16} /> : <Clock size={16} />}
                                    </div>

                                    {/* Content */}
                                    <div className={`bg-white border p-6 rounded-3xl transition-all ${isCurrent ? 'border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100' : 'border-gray-100 shadow-sm'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Step {index + 1}</span>
                                                <h4 className="text-[14px] font-black text-black uppercase tracking-tight mt-1">{step.role}</h4>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                                                ${isCompleted ? 'bg-green-50 text-green-600' : isRejected ? 'bg-red-50 text-red-600' : isCurrent ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}
                                            `}>
                                                {step.status}
                                            </span>
                                        </div>
                                        
                                        {step.date && (
                                            <p className="text-[11px] text-gray-500 font-medium mt-2">
                                                {isRejected ? 'Rejected' : 'Approved'} by {step.approver} on {step.date}
                                            </p>
                                        )}
                                        
                                        {step.comment && (
                                            <div className="mt-3 p-3 bg-red-50 rounded-xl text-[11px] text-red-600 font-medium">
                                                "{step.comment}"
                                            </div>
                                        )}

                                        {/* Action Buttons for Simulation */}
                                        {isCurrent && !isView && (
                                            <div className="flex gap-3 mt-6 border-t border-gray-50 pt-4">
                                                <button 
                                                    onClick={() => handleWorkflowAction('Approve')}
                                                    className="flex-1 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleWorkflowAction('Reject')}
                                                    className="flex-1 py-3 bg-white border border-red-200 text-red-500 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Actions & Lease Proposal */}
                    <div className="space-y-8">
                        {isWorkflowCompleted && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                                {/* Export to Print */}
                                <div className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group cursor-pointer">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                                        <Printer size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <Printer size={32} className="mb-6" />
                                        <h3 className="text-[16px] font-black uppercase tracking-tight leading-none mb-2">Export to Print</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Download Approved Document</p>
                                        <button className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                                            Print Document
                                        </button>
                                    </div>
                                </div>

                                {/* Lease Proposal Filling */}
                                <div className={`bg-white border-2 p-8 rounded-[2.5rem] relative overflow-hidden transition-all
                                    ${form.isLeaseProposalFilled ? 'border-green-500 bg-green-50/10' : 'border-blue-500 shadow-xl shadow-blue-500/10'}
                                `}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-2xl ${form.isLeaseProposalFilled ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                                            <FileCheck size={24} />
                                        </div>
                                        {form.isLeaseProposalFilled && <CheckCircle2 size={24} className="text-green-500" />}
                                    </div>
                                    
                                    <h3 className="text-[16px] font-black text-black uppercase tracking-tight leading-none mb-2">Proposal Sewa Gedung</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">
                                        {form.isLeaseProposalFilled ? 'Formulir telah dilengkapi.' : 'Lengkapi data sewa properti final.'}
                                    </p>
                                    
                                    {!form.isLeaseProposalFilled ? (
                                        <button 
                                            onClick={handleFillLeaseProposal}
                                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/30 active:scale-95"
                                        >
                                            Isi Proposal Sewa
                                        </button>
                                    ) : (
                                        <div className="w-full py-4 bg-green-100 text-green-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                                            Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {!isWorkflowCompleted && (
                            <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] text-center opacity-70">
                                <AlertCircle size={32} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                    Fitur Export & Proposal Sewa akan terbuka setelah seluruh approval selesai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
             </div>
          )}

          {/* DOKUMEN TAB (Visible for both) */}
          {activeTab === 'DOKUMEN' && (
             <div className="max-w-6xl mx-auto space-y-10 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:border-black hover:bg-gray-50 transition-all cursor-pointer group h-64">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
                            <UploadCloud size={24} />
                        </div>
                        <p className="text-[11px] font-black text-black uppercase tracking-widest mb-2">Upload Dokumen Legal</p>
                        <p className="text-[10px] text-gray-400 text-center">Sertifikat, PBB, IMB, atau Draft Kontrak</p>
                    </div>
                </div>
             </div>
          )}

        </div>

        {/* Global Footer */}
        {editingProposalIndex === null && (
          <div className="px-14 py-12 bg-white flex justify-between items-center shrink-0 border-t border-gray-100">
            <button onClick={onClose} className="px-16 py-6 text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all bg-[#F8F9FA] rounded-[1.5rem]">BATAL</button>
            {!isView && (
              <button 
                  onClick={() => onSave(form)} 
                  className="bg-black text-white px-24 py-6 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5"
              >
                <Save size={20} strokeWidth={2.5} /> SIMPAN DATA KONTRAK
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
