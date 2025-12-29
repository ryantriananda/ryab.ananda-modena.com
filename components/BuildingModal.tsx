
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Building, MapPin, Phone, FileText, CheckCircle2, Clock, AlertCircle, Trash2, Plus, ChevronDown, User, Home, DollarSign, Ruler, Zap, Key, UploadCloud, MousePointer2, TrendingUp, PieChart } from 'lucide-react';
import { BuildingRecord, GeneralMasterItem, BuildingProposal, WorkflowStep } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
  buildingTypeList?: GeneralMasterItem[];
}

export const BuildingModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingTypeList = []
}) => {
  const [activeTab, setActiveTab] = useState('INFORMASI UMUM');
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    status: 'Pending',
    ownership: 'Rent',
    workflow: [],
    // Mock financial data defaults
    rentCost: '250000000',
    totalMaintenanceCost: '45000000',
    utilityCost: '12000000'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for a proposal being edited
  const [currentProposal, setCurrentProposal] = useState<Partial<BuildingProposal>>({
      name: '',
      address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
      floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
      owner: { name: '', address: '', phone: '' },
      surveySummary: { pros: '', cons: '' },
      securityFeatures: [],
      buildingMaterials: [],
      documents: [],
      environmentConditions: []
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        if (initialData.proposals && initialData.proposals.length > 0) {
            setCurrentProposal(initialData.proposals[0]);
        }
      } else {
        setForm({
            status: 'Pending',
            ownership: 'Rent',
            assetNo: 'REQ-BI-NEW-01',
            name: '',
            type: 'MHC',
            location: '',
            address: '',
            rentCost: '250000000',
            totalMaintenanceCost: '45000000',
            utilityCost: '12000000',
            workflow: [
                { role: 'BM', status: 'Pending' },
                { role: 'Regional Branches', status: 'Pending' },
                { role: 'AVP Dealership', status: 'Pending' },
                { role: 'Owner', status: 'Pending' }
            ]
        });
        setCurrentProposal({
            name: '',
            address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
            floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
            owner: { name: '', address: '', phone: '' },
            surveySummary: { pros: '', cons: '' },
            securityFeatures: [],
            buildingMaterials: [],
            documents: [],
            environmentConditions: []
        });
      }
      setActiveTab('INFORMASI UMUM');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
      const updatedProposals = form.proposals ? [...form.proposals] : [];
      if (updatedProposals.length > 0) {
          updatedProposals[0] = { ...updatedProposals[0], ...currentProposal } as BuildingProposal;
      } else {
          updatedProposals.push({ id: `PROP-${Date.now()}`, ...currentProposal } as BuildingProposal);
      }
      
      onSave({ ...form, proposals: updatedProposals });
  };

  const handleFloorPlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setForm(prev => ({ ...prev, floorPlanImage: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const SectionHeader = ({ num, title, sub }: { num?: string, title: string, sub?: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      {num && <div className="w-1.5 h-6 bg-black rounded-full"></div>}
      <div>
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
        {sub && <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{sub}</p>}
      </div>
    </div>
  );

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
      {children}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, icon?: any }) => (
    <div className="mb-4">
      {props.label && <Label>{props.label}</Label>}
      <div className="relative">
        <input 
            {...props}
            className={`w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 ${props.className} ${props.icon ? 'pl-12' : ''}`}
            disabled={isView || props.disabled}
        />
        {props.icon && <props.icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  const updateProposalAddress = (field: string, value: string) => {
      setCurrentProposal(prev => ({
          ...prev,
          address: { ...prev.address!, [field]: value }
      }));
  };

  const updateOwner = (field: string, value: string) => {
      setCurrentProposal(prev => ({
          ...prev,
          owner: { ...prev.owner!, [field]: value }
      }));
  };

  // Financial Calculations
  const rent = parseInt(form.rentCost || '0');
  const maintenance = parseInt(form.totalMaintenanceCost || '0');
  const utility = parseInt(form.utilityCost || '0');
  const duration = 5; // Default 5 years for calculation
  const tco = rent + (maintenance * duration) + (utility * duration);
  const burnRate = tco / (duration * 12);

  const formatCurrency = (val: number) => "Rp " + val.toLocaleString('id-ID');

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Building size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {form.name || 'NEW BRANCH REQUEST'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
                    {form.assetNo} • {form.type || 'BRANCH'}
                </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-[#FFF7ED] text-[#EA580C] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#FDBA74]/50">
                  {form.status || 'PENDING'}
              </span>
              <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
                <X size={28} strokeWidth={2} />
              </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8 overflow-x-auto no-scrollbar">
            {['INFORMASI UMUM', 'PROPOSAL & PERBANDINGAN', 'WORKFLOW', 'FLOOR PLAN', 'FINANCIAL SUMMARY', 'DOKUMEN'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] whitespace-nowrap
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
            {activeTab === 'INFORMASI UMUM' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Section 1: Jenis Kepemilikan */}
                    <div>
                        <SectionHeader num="1" title="1. JENIS KEPEMILIKAN" sub="PROPERTY OWNERSHIP TYPE" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => !isView && setForm({...form, ownership: 'Rent'})}
                                disabled={isView}
                                className={`h-40 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-300 group border-2
                                    ${form.ownership === 'Rent' 
                                    ? 'bg-black text-white border-black shadow-2xl shadow-black/20 scale-[1.02]' 
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                            >
                                <div className={`p-4 rounded-full ${form.ownership === 'Rent' ? 'bg-white/20' : 'bg-gray-50'}`}>
                                    <Key size={24} />
                                </div>
                                <div className="text-center">
                                    <span className="text-[14px] font-black uppercase tracking-widest block">SEWA (LEASE)</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 block ${form.ownership === 'Rent' ? 'text-white/60' : 'text-gray-300'}`}>SEWA TAHUNAN / KONTRAK</span>
                                </div>
                            </button>

                            <button
                                onClick={() => !isView && setForm({...form, ownership: 'Own'})}
                                disabled={isView}
                                className={`h-40 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-300 group border-2
                                    ${form.ownership === 'Own' 
                                    ? 'bg-black text-white border-black shadow-2xl shadow-black/20 scale-[1.02]' 
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                            >
                                <div className={`p-4 rounded-full ${form.ownership === 'Own' ? 'bg-white/20' : 'bg-gray-50'}`}>
                                    <Home size={24} />
                                </div>
                                <div className="text-center">
                                    <span className="text-[14px] font-black uppercase tracking-widest block">MILIK SENDIRI (OWN)</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 block ${form.ownership === 'Own' ? 'text-white/60' : 'text-gray-300'}`}>ASET PERUSAHAAN / BELI PUTUS</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Identitas Aset */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader num="2" title="2. IDENTITAS ASET" sub="ASSET CLASSIFICATION & NUMBERING" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <Label>NAMA PROPERTI / GEDUNG <span className="text-red-500">*</span></Label>
                                <input 
                                    type="text"
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-black/5"
                                    value={form.name || ''} 
                                    onChange={e => setForm({...form, name: e.target.value})} 
                                    placeholder="Contoh: MODENA Home Center Bintaro"
                                    disabled={isView}
                                />
                            </div>
                            
                            <div>
                                <Label>ASSET NUMBER</Label>
                                <div className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-5 text-[14px] font-black text-gray-400 cursor-not-allowed">
                                    {form.assetNo}
                                </div>
                            </div>

                            <div>
                                <Label>TIPE GEDUNG <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                        value={form.type || ''}
                                        onChange={(e) => setForm({...form, type: e.target.value})}
                                    >
                                        <option value="">(PILIH TIPE)</option>
                                        {buildingTypeList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <Label>LOKASI / ALAMAT LENGKAP</Label>
                                <textarea 
                                    disabled={isView}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[13px] font-medium text-black outline-none transition-all placeholder:text-gray-300 shadow-sm min-h-[120px] resize-none"
                                    placeholder="Input alamat lengkap gedung..."
                                    value={form.address || ''}
                                    onChange={(e) => setForm({...form, address: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'PROPOSAL & PERBANDINGAN' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-[#F8F9FA] rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center">
                        <div className="mb-6">
                            <h3 className="text-[16px] font-black text-black uppercase tracking-tight">PERBANDINGAN KANDIDAT</h3>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">MENINJAU 1 OPSI PROPERTI</p>
                        </div>
                        
                        {/* Placeholder for Candidates List */}
                        {/* If we had candidates, map them here. Since mock only has 1, we show placeholder for add */}
                        
                        <button className="bg-black text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 shadow-xl transition-all flex items-center gap-3">
                            <Plus size={16} /> Tambah Kandidat
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'FLOOR PLAN' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="VISUAL FLOOR PLAN" sub="INTERACTIVE ASSET MAPPING" />
                        
                        <div className="relative min-h-[400px] bg-[#F8F9FA] rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group">
                            {form.floorPlanImage ? (
                                <>
                                    <img src={form.floorPlanImage} alt="Floor Plan" className="w-full h-full object-contain" />
                                    {!isView && (
                                        <button 
                                            onClick={() => setForm(prev => ({ ...prev, floorPlanImage: undefined }))}
                                            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all backdrop-blur-sm"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md text-gray-300 group-hover:text-black transition-colors">
                                        <UploadCloud size={24} />
                                    </div>
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-6">Upload Denah Lantai (JPG/PNG)</p>
                                    
                                    {!isView && (
                                        <div className="flex gap-4 justify-center">
                                            <button 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-gray-100 hover:bg-black hover:text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                            >
                                                <UploadCloud size={14} /> Upload Map Image
                                            </button>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFloorPlanUpload} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {form.floorPlanImage && (
                            <div className="mt-6 flex justify-end">
                                <button className="bg-blue-50 text-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-2">
                                    <MousePointer2 size={14} /> Click Map to Add Pin
                                </button>
                            </div>
                        )}
                        
                        <div className="mt-8 border-t border-gray-100 pt-6">
                             <p className="text-[10px] font-mono text-gray-300 text-center uppercase tracking-widest">----------------------------------------------------------------------------------------</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'FINANCIAL SUMMARY' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Dark Card Summary */}
                    <div className="bg-black text-white p-12 rounded-[3rem] shadow-2xl shadow-black/30 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">TOTAL COST OF OWNERSHIP (TCO)</p>
                                <h2 className="text-[42px] font-black tracking-tighter leading-none mb-2">Rp 1.307.000.000</h2>
                                <p className="text-[10px] text-gray-500 font-medium">Estimated over 5 years</p>
                            </div>
                            <div className="flex flex-col justify-center md:items-start">
                                <div className="flex items-center justify-between w-full mb-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AVG. MONTHLY BURN RATE</p>
                                </div>
                                <h3 className="text-[28px] font-black tracking-tight leading-none mb-1">Rp 21.833.333,333</h3>
                            </div>
                        </div>

                        <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full backdrop-blur-md hidden md:block">
                            <TrendingUp size={32} className="text-green-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cost Breakdown */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <SectionHeader num="1" title="1. COST BREAKDOWN" sub="ANNUAL EXPENSE ANALYSIS" />
                            
                            <div className="space-y-6 mt-8">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[11px] font-black text-black">Rent / Lease</span>
                                        <span className="text-[11px] font-mono font-bold text-black">Rp {parseInt(form.rentCost || '0').toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[80%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[11px] font-black text-black">Maintenance</span>
                                        <span className="text-[11px] font-mono font-bold text-black">Rp {parseInt(form.totalMaintenanceCost || '0').toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-400 w-[20%] rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[11px] font-black text-black">Utilities (Electric/Water)</span>
                                        <span className="text-[11px] font-mono font-bold text-black">Rp {parseInt(form.utilityCost || '0').toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[15%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Health */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <SectionHeader num="2" title="2. FINANCIAL HEALTH" sub="ASSET PERFORMANCE" />
                            
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                                    <p className="text-[9px] font-black text-green-800 uppercase tracking-widest mb-2">EFFICIENCY SCORE</p>
                                    <h3 className="text-[32px] font-black text-black">A+</h3>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                    <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest mb-2">BUDGET USAGE</p>
                                    <h3 className="text-[32px] font-black text-black">82%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'WORKFLOW' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute left-[63px] top-12 bottom-12 w-[2px] bg-gray-100"></div>
                        <div className="space-y-10 relative z-10">
                            {/* Header Step: Created */}
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
                                    <FileText size={20} strokeWidth={3} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Request Created</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">Proposal Initiated on {form.startDate || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Workflow Steps */}
                            {form.workflow?.map((step: WorkflowStep, index: number) => (
                                <div key={index} className="flex gap-8">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg transition-all ${
                                        step.status === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                                        step.status === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                        {step.status === 'Approved' ? <CheckCircle2 size={20} /> : 
                                         step.status === 'Rejected' ? <X size={20} /> : <Clock size={20} />}
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{step.role}</span>
                                            {step.date && <span className="text-[9px] font-mono font-bold text-gray-300 bg-gray-50 px-2 py-0.5 rounded">{step.date}</span>}
                                        </div>
                                        <h4 className="text-[13px] font-black text-black uppercase tracking-tight">
                                            {step.status === 'Pending' ? 'Waiting for Approval' : `Status: ${step.status}`}
                                        </h4>
                                        {step.approver && (
                                            <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
                                                <User size={12} /> {step.approver}
                                            </p>
                                        )}
                                        {step.comment && (
                                            <div className="mt-2 p-3 bg-gray-50 rounded-xl text-[11px] text-gray-600 italic border border-gray-100">
                                                "{step.comment}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                  </div>
              </div>
            )}

            {activeTab === 'DOKUMEN' && (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                    <FileText size={64} className="text-gray-300 mb-6" />
                    <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Dokumen belum tersedia</h3>
                    <p className="text-[10px] font-bold text-gray-300 mt-2">Silakan simpan data gedung terlebih dahulu untuk upload dokumen.</p>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-[#F8F9FA] rounded-[1.2rem] hover:bg-gray-100 hover:text-black transition-all">
            BATAL
          </button>
          {!isView && (
            <button 
                onClick={handleSave} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-[1.2rem] hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN DATA KONTRAK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
