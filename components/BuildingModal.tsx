
import React, { useState, useEffect } from 'react';
import { X, Save, Building, MapPin, Phone, FileText, CheckCircle2, Clock, AlertCircle, Trash2, Plus, ChevronDown, User, Home, DollarSign, Ruler, Zap } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('INFORMASI UTAMA');
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    status: 'Pending',
    ownership: 'Rent',
    workflow: []
  });

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
            assetNo: '[AUTO]',
            name: '',
            type: '',
            location: '',
            address: '',
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
      setActiveTab('INFORMASI UTAMA');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
      // Merge currentProposal into form.proposals
      const updatedProposals = form.proposals ? [...form.proposals] : [];
      if (updatedProposals.length > 0) {
          updatedProposals[0] = { ...updatedProposals[0], ...currentProposal } as BuildingProposal;
      } else {
          updatedProposals.push({ id: `PROP-${Date.now()}`, ...currentProposal } as BuildingProposal);
      }
      
      onSave({ ...form, proposals: updatedProposals });
  };

  const SectionHeader = ({ num, title, sub }: { num?: string, title: string, sub?: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      {num && <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">{num}</div>}
      <div>
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
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

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Building size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Branch Improvement Request' : mode === 'edit' ? 'Edit Branch Proposal' : 'Branch Detail'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Expansion & Relocation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8 overflow-x-auto no-scrollbar">
            {['INFORMASI UTAMA', 'DATA KANDIDAT', 'WORKFLOW', 'DOKUMEN LEGAL'].map(tab => (
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
            {activeTab === 'INFORMASI UTAMA' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="md:col-span-2">
                        <SectionHeader title="IDENTITAS REQUEST" sub="Basic Project Information" />
                    </div>

                    <Input 
                        label="Judul Project / Nama Cabang" 
                        value={form.name || ''} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        placeholder="Contoh: Relokasi MHC Bintaro"
                    />
                    
                    <div>
                        <Label>Tipe Properti</Label>
                        <div className="relative">
                            <select 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                value={form.type || ''}
                                onChange={(e) => setForm({...form, type: e.target.value})}
                            >
                                <option value="">(Pilih Tipe)</option>
                                {buildingTypeList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                            </select>
                            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <Input 
                        label="Target Lokasi (Kota/Area)" 
                        value={form.location || ''} 
                        onChange={e => setForm({...form, location: e.target.value})} 
                        placeholder="Contoh: Jakarta Selatan"
                        icon={MapPin}
                    />

                    <div>
                        <Label>Jenis Pengajuan</Label>
                        <div className="flex gap-4">
                            {['Own', 'Rent'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => !isView && setForm({...form, ownership: type as any})}
                                    disabled={isView}
                                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                        form.ownership === type 
                                        ? 'bg-black text-white border-black shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {type === 'Own' ? 'Pembelian (Beli)' : 'Sewa (Sewa/Kontrak)'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <Label>Catatan / Alasan Relokasi</Label>
                        <textarea 
                            disabled={isView}
                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm min-h-[120px] resize-none"
                            placeholder="Jelaskan alasan kebutuhan..."
                            value={form.address || ''}
                            onChange={(e) => setForm({...form, address: e.target.value})}
                        />
                    </div>

                    <Input 
                        label="Estimasi Tanggal Mulai" 
                        value={form.startDate || ''} 
                        onChange={e => setForm({...form, startDate: e.target.value})} 
                        type="date"
                    />

                    <Input 
                        label="Estimasi Tanggal Selesai" 
                        value={form.endDate || ''} 
                        onChange={e => setForm({...form, endDate: e.target.value})} 
                        type="date"
                        disabled={form.ownership === 'Own' || isView}
                    />
                </div>
            )}

            {activeTab === 'DATA KANDIDAT' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Section 1: Lokasi & Fisik */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="LOKASI & SPESIFIKASI FISIK" sub="Physical Building Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <Input 
                                    label="Nama Kandidat / Label" 
                                    value={currentProposal.name} 
                                    onChange={e => setCurrentProposal({...currentProposal, name: e.target.value})}
                                    placeholder="Contoh: Ruko Boulevard No. 5"
                                    icon={Building}
                                />
                            </div>
                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                <Input label="Jalan / Alamat" value={currentProposal.address?.jl} onChange={e => updateProposalAddress('jl', e.target.value)} />
                                <Input label="Kota" value={currentProposal.address?.kota} onChange={e => updateProposalAddress('kota', e.target.value)} />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Luas Tanah (m2)" value={currentProposal.landArea} onChange={e => setCurrentProposal({...currentProposal, landArea: e.target.value})} placeholder="0" icon={Ruler} />
                                <Input label="Luas Bangunan (m2)" value={currentProposal.buildingArea} onChange={e => setCurrentProposal({...currentProposal, buildingArea: e.target.value})} placeholder="0" icon={Ruler} />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Jml Lantai" value={currentProposal.totalFloors} onChange={e => setCurrentProposal({...currentProposal, totalFloors: e.target.value})} placeholder="0" />
                                <Input label="Kapasitas Parkir (Mobil)" value={currentProposal.parkingCapacity} onChange={e => setCurrentProposal({...currentProposal, parkingCapacity: e.target.value})} placeholder="0" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Utilitas & Fasilitas */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="UTILITAS & KONDISI" sub="Utilities & Environment" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Input label="Daya Listrik (VA)" value={currentProposal.electricity} onChange={e => setCurrentProposal({...currentProposal, electricity: e.target.value})} placeholder="e.g. 16500" icon={Zap} />
                            <Input label="Sumber Air" value={currentProposal.water} onChange={e => setCurrentProposal({...currentProposal, water: e.target.value})} placeholder="PAM / Jetpump" />
                            <Input label="Line Telepon" value={currentProposal.phoneLines} onChange={e => setCurrentProposal({...currentProposal, phoneLines: e.target.value})} placeholder="Jumlah Line" icon={Phone} />
                            
                            <div className="md:col-span-3">
                                <Label>Kondisi Jalan / Akses</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Lebar Jalan (meter)" value={currentProposal.roadWidth} onChange={e => setCurrentProposal({...currentProposal, roadWidth: e.target.value})} />
                                    <Input placeholder="Kondisi (Aspal/Beton/Rusak)" value={currentProposal.roadCondition} onChange={e => setCurrentProposal({...currentProposal, roadCondition: e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Pemilik & Legalitas */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="PEMILIK & LEGALITAS" sub="Ownership Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input label="Nama Pemilik" value={currentProposal.owner?.name} onChange={e => updateOwner('name', e.target.value)} icon={User} />
                            <Input label="No. Telepon" value={currentProposal.owner?.phone} onChange={e => updateOwner('phone', e.target.value)} icon={Phone} />
                            <div className="md:col-span-2">
                                <Input label="Alamat Pemilik" value={currentProposal.owner?.address} onChange={e => updateOwner('address', e.target.value)} icon={Home} />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Harga & Sewa */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                        <SectionHeader title="BIAYA & SEWA" sub="Financial Proposal" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <Label>Harga Sewa Per Tahun (IDR)</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl pl-12 pr-5 py-4 text-[16px] font-black text-black outline-none"
                                        value={currentProposal.rentPrice}
                                        onChange={e => setCurrentProposal({...currentProposal, rentPrice: e.target.value})}
                                        placeholder="0"
                                    />
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                                </div>
                            </div>
                            <Input label="Periode Sewa (Tahun)" value={currentProposal.leasePeriod} onChange={e => setCurrentProposal({...currentProposal, leasePeriod: e.target.value})} placeholder="e.g. 5 Tahun" icon={Clock} />
                            
                            <Input label="Pajak PPH Sewa" value={currentProposal.taxPPH} onChange={e => setCurrentProposal({...currentProposal, taxPPH: e.target.value})} placeholder="Ditanggung Siapa?" />
                            <Input label="Biaya Notaris" value={currentProposal.notaryFee} onChange={e => setCurrentProposal({...currentProposal, notaryFee: e.target.value})} placeholder="Sharing / Full?" />
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

            {activeTab === 'DOKUMEN LEGAL' && (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                    <FileText size={64} className="text-gray-300 mb-6" />
                    <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Dokumen belum tersedia</h3>
                    <p className="text-[10px] font-bold text-gray-300 mt-2">Silakan simpan data gedung terlebih dahulu untuk upload dokumen.</p>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
            Batal
          </button>
          {!isView && (
            <button 
                onClick={handleSave} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
