
import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, Calendar, Home, ChevronsUpDown, FileText, Plus, Trash2, CheckCircle, AlertTriangle, Shield, MapPin, Layers, Settings, User } from 'lucide-react';
import { BuildingRecord, BuildingProposal } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('General');
  const [editingProposalIndex, setEditingProposalIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    ownership: 'Rent',
    status: 'Draft',
    type: 'Office',
    proposals: []
  });

  const tabs = form.ownership === 'Own' 
    ? ['General', 'Documents'] 
    : ['General', 'Proposal & Comparison', 'Workflow', 'Documents'];

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({ ownership: 'Rent', status: 'Draft', type: 'Office', proposals: [] });
      setActiveTab('General');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const addProposal = () => {
    const newProposal: BuildingProposal = {
      id: Date.now().toString(),
      optionName: `Option ${ (form.proposals?.length || 0) + 1}`,
      address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
      phoneLines: '',
      electricity: '',
      water: '',
      areas: { land: '', building: '', frontYard: '' },
      conditions: { fence: '', gate: '', parking: '' },
      security: [],
      floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
      materials: [],
      legal: { shm: false, hgb: false, imb: false },
      costs: { rent: '', tax: '', notary: '' },
      owner: { name: '', phone: '', address: '' },
      survey: { pros: [], cons: [] }
    };
    setForm({ ...form, proposals: [...(form.proposals || []), newProposal] });
    setEditingProposalIndex((form.proposals?.length || 0));
  };

  const updateProposal = (idx: number, data: Partial<BuildingProposal>) => {
    const newProposals = [...(form.proposals || [])];
    newProposals[idx] = { ...newProposals[idx], ...data };
    setForm({ ...form, proposals: newProposals });
  };

  const removeProposal = (idx: number) => {
    const newProposals = (form.proposals || []).filter((_, i) => i !== idx);
    setForm({ ...form, proposals: newProposals });
    setEditingProposalIndex(null);
  };

  const FormLabel = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <Icon size={16} className="text-black" />
      <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const Input = (props: any) => (
    <input 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50 shadow-sm"
    />
  );

  const Select = (props: any) => (
    <div className="relative">
        <select 
        {...props}
        disabled={isView || props.disabled}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black focus:border-black outline-none transition-all appearance-none disabled:bg-gray-50 shadow-sm"
        >
        {props.children}
        </select>
        <ChevronsUpDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-[#F8F9FA] w-full h-full flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-10 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[20px] font-black text-black uppercase tracking-tight">
                {initialData ? `Improvement: ${form.name}` : 'New Branch Improvement'}
            </h2>
            <div className="flex items-center gap-3 mt-1">
                <span className="bg-black text-white text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">{form.status}</span>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Asset ID: {form.assetNo || 'AWAITING GENERATION'}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-red-500 p-2 transition-all">
            <X size={28} />
          </button>
        </div>

        {/* Custom Tabs Navigation */}
        <div className="px-10 flex bg-white shadow-sm shrink-0 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
                key={tab}
                onClick={() => { setActiveTab(tab); setEditingProposalIndex(null); }}
                className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.15em] transition-all border-b-4 whitespace-nowrap
                ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
            >
                {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {activeTab === 'General' && (
            <div className="space-y-10 max-w-6xl mx-auto">
              <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                <SectionHeader icon={Home} title="BUILDING IDENTITY" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-12">
                    <FormLabel required>Nama Gedung</FormLabel>
                    <Input value={form.name || ''} placeholder="Ex: Gedung Modena Center Point" onChange={(e: any) => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Building Type</FormLabel>
                    <Select value={form.type || ''} onChange={(e: any) => setForm({...form, type: e.target.value})}>
                      <option value="Office">Office</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Showroom">Showroom</option>
                    </Select>
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Ownership Model</FormLabel>
                    <Select value={form.ownership || ''} onChange={(e: any) => setForm({...form, ownership: e.target.value as any})}>
                      <option value="Rent">Rental Proposal</option>
                      <option value="Own">Ownership Asset</option>
                    </Select>
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>General Location</FormLabel>
                    <Input value={form.location || ''} placeholder="City/Region" onChange={(e: any) => setForm({...form, location: e.target.value})} />
                  </div>
                  <div className="md:col-span-12">
                    <FormLabel>Full Address</FormLabel>
                    <textarea 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-[12px] font-black text-black focus:border-black outline-none min-h-[100px] shadow-sm transition-all placeholder:text-gray-300"
                        value={form.address || ''}
                        placeholder="Street, District, Regency..."
                        onChange={(e) => setForm({...form, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Proposal & Comparison' && (
            <div className="max-w-7xl mx-auto space-y-10">
              {editingProposalIndex === null ? (
                /* COMPARISON VIEW */
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-[18px] font-black text-black uppercase tracking-tight">Comparison Board</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Reviewing {(form.proposals || []).length} candidate locations</p>
                      </div>
                      <button 
                        onClick={addProposal}
                        className="bg-black text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/20"
                      >
                        <Plus size={18} /> Add Candidate
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(form.proposals || []).map((prop, idx) => (
                        <div key={prop.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden group hover:border-black transition-all">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <span className="text-[10px] font-black text-black uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">{prop.optionName}</span>
                                <button onClick={() => removeProposal(idx)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div>
                                    <FormLabel>Proposed Address</FormLabel>
                                    <p className="text-[12px] font-black text-black uppercase leading-relaxed line-clamp-2">{prop.address.jl || 'Empty Address'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">Monthly Rent</p>
                                        <p className="text-[12px] font-black text-black">{prop.costs.rent ? `Rp ${parseInt(prop.costs.rent).toLocaleString()}` : 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">Building Area</p>
                                        <p className="text-[12px] font-black text-black">{prop.areas.building || '0'} M²</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setEditingProposalIndex(idx)}
                                    className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
                                >
                                    Edit Details
                                </button>
                            </div>
                        </div>
                      ))}
                      {(form.proposals || []).length === 0 && (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                             <Building size={48} className="text-gray-200 mb-6" />
                             <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">No proposals added yet.</p>
                        </div>
                      )}
                   </div>
                </div>
              ) : (
                /* DETAILED PROPOSAL FORM (MATCHING PDF IMAGE 1) */
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                    <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setEditingProposalIndex(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-black">
                                <X size={24} />
                            </button>
                            <h3 className="text-[14px] font-black text-black uppercase tracking-widest">Editing Candidate: {form.proposals![editingProposalIndex].optionName}</h3>
                        </div>
                        <button 
                            onClick={() => setEditingProposalIndex(null)}
                            className="bg-black text-white px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/20"
                        >
                            Done Editing
                        </button>
                    </div>

                    <div className="p-12 space-y-12">
                        {/* SECTION 1: Alamat Lokasi */}
                        <div className="space-y-8">
                            <SectionHeader icon={MapPin} title="1. Alamat Lokasi" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <FormLabel>Jl.</FormLabel>
                                    <Input 
                                        value={form.proposals![editingProposalIndex].address.jl} 
                                        onChange={(e: any) => updateProposal(editingProposalIndex, { address: { ...form.proposals![editingProposalIndex].address, jl: e.target.value } })} 
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-6 md:col-span-2">
                                    <div>
                                        <FormLabel>Kota</FormLabel>
                                        <Input 
                                            value={form.proposals![editingProposalIndex].address.kota} 
                                            onChange={(e: any) => updateProposal(editingProposalIndex, { address: { ...form.proposals![editingProposalIndex].address, kota: e.target.value } })} 
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Kabupaten</FormLabel>
                                        <Input 
                                            value={form.proposals![editingProposalIndex].address.kabupaten} 
                                            onChange={(e: any) => updateProposal(editingProposalIndex, { address: { ...form.proposals![editingProposalIndex].address, kabupaten: e.target.value } })} 
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Propinsi</FormLabel>
                                        <Input 
                                            value={form.proposals![editingProposalIndex].address.propinsi} 
                                            onChange={(e: any) => updateProposal(editingProposalIndex, { address: { ...form.proposals![editingProposalIndex].address, propinsi: e.target.value } })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2-4: Utilities */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="space-y-6">
                                <SectionHeader icon={Settings} title="2. Telp Lines" />
                                <Input placeholder="1 / 2 / 3 / 4" value={form.proposals![editingProposalIndex].phoneLines} onChange={(e:any) => updateProposal(editingProposalIndex, { phoneLines: e.target.value })} />
                            </div>
                            <div className="space-y-6">
                                <SectionHeader icon={Settings} title="3. Listrik" />
                                <Input placeholder="... Ampere/110-220V" value={form.proposals![editingProposalIndex].electricity} onChange={(e:any) => updateProposal(editingProposalIndex, { electricity: e.target.value })} />
                            </div>
                            <div className="space-y-6">
                                <SectionHeader icon={Settings} title="4. Air" />
                                <Select value={form.proposals![editingProposalIndex].water} onChange={(e:any) => updateProposal(editingProposalIndex, { water: e.target.value })}>
                                    <option value="">(Select Type)</option>
                                    <option value="PAM">PAM</option>
                                    <option value="Pompa">Pompa</option>
                                    <option value="Sumur">Sumur</option>
                                </Select>
                            </div>
                        </div>

                        {/* SECTION 5: Spesifikasi Fisik */}
                        <div className="space-y-8">
                            <SectionHeader icon={Layers} title="5. Luas Tanah & Bangunan" />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div><FormLabel>Luas Tanah (M²)</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].areas.land} onChange={(e:any) => updateProposal(editingProposalIndex, { areas: { ...form.proposals![editingProposalIndex].areas, land: e.target.value } })} /></div>
                                <div><FormLabel>Luas Bangunan (M²)</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].areas.building} onChange={(e:any) => updateProposal(editingProposalIndex, { areas: { ...form.proposals![editingProposalIndex].areas, building: e.target.value } })} /></div>
                                <div><FormLabel>Luas Halaman Depan (M²)</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].areas.frontYard} onChange={(e:any) => updateProposal(editingProposalIndex, { areas: { ...form.proposals![editingProposalIndex].areas, frontYard: e.target.value } })} /></div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div><FormLabel>Kondisi Pagar</FormLabel><Input placeholder="Tembok/Besi/Tinggi" value={form.proposals![editingProposalIndex].conditions.fence} onChange={(e:any) => updateProposal(editingProposalIndex, { conditions: { ...form.proposals![editingProposalIndex].conditions, fence: e.target.value } })} /></div>
                                <div><FormLabel>Parkir Malam</FormLabel><Input placeholder="Unit Kendaraan" value={form.proposals![editingProposalIndex].conditions.parking} onChange={(e:any) => updateProposal(editingProposalIndex, { conditions: { ...form.proposals![editingProposalIndex].conditions, parking: e.target.value } })} /></div>
                            </div>
                        </div>

                        {/* SECURITY CHECKBOXES */}
                        <div className="space-y-6">
                            <SectionHeader icon={Shield} title="Keamanan" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {['Security Area Gedung', 'Security Area Wilayah', 'CCTV', 'Alarm', 'Assembly Point', 'Pos Polisi <500m'].map(sec => {
                                    const isChecked = form.proposals![editingProposalIndex].security.includes(sec);
                                    return (
                                        <button 
                                            key={sec} 
                                            onClick={() => {
                                                const current = form.proposals![editingProposalIndex].security;
                                                const next = isChecked ? current.filter(s => s !== sec) : [...current, sec];
                                                updateProposal(editingProposalIndex, { security: next });
                                            }}
                                            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${isChecked ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? 'border-white' : 'border-gray-200'}`}>
                                                {isChecked && <CheckCircle size={12} className="text-white" />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{sec}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* SECTION 6: Floors */}
                        <div className="space-y-6">
                            <SectionHeader icon={Layers} title="6. Jumlah Tingkat (M²)" />
                            <div className="grid grid-cols-5 gap-4">
                                {['ground', 'f1', 'f2', 'f3', 'f4'].map(f => (
                                    <div key={f}>
                                        <FormLabel>{f.toUpperCase()}</FormLabel>
                                        <Input 
                                            type="number" 
                                            placeholder="M2" 
                                            value={(form.proposals![editingProposalIndex].floors as any)[f]} 
                                            onChange={(e:any) => updateProposal(editingProposalIndex, { floors: { ...form.proposals![editingProposalIndex].floors, [f]: e.target.value } })} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 16: Costs */}
                        <div className="space-y-8">
                            <SectionHeader icon={DollarSign} title="16-19. Biaya & Legalitas" />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div><FormLabel>Biaya Sewa / Tahun</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].costs.rent} onChange={(e:any) => updateProposal(editingProposalIndex, { costs: { ...form.proposals![editingProposalIndex].costs, rent: e.target.value } })} /></div>
                                <div><FormLabel>Pajak PPH (Rp)</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].costs.tax} onChange={(e:any) => updateProposal(editingProposalIndex, { costs: { ...form.proposals![editingProposalIndex].costs, tax: e.target.value } })} /></div>
                                <div><FormLabel>Biaya Notaris (Rp)</FormLabel><Input type="number" value={form.proposals![editingProposalIndex].costs.notary} onChange={(e:any) => updateProposal(editingProposalIndex, { costs: { ...form.proposals![editingProposalIndex].costs, notary: e.target.value } })} /></div>
                            </div>
                        </div>
                    </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="max-w-6xl mx-auto bg-white p-12 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
               <SectionHeader icon={FileText} title="DOCUMENTS & ATTACHMENTS" />
               <div className="flex flex-col items-center justify-center p-20 border-4 border-dashed border-gray-50 rounded-[40px] bg-gray-50/20">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                     <FileText size={40} className="text-gray-200" />
                  </div>
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">No Documents Found</p>
                  <button className="mt-8 px-12 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 shadow-xl shadow-black/20">Upload Folder</button>
               </div>
            </div>
          )}
        </div>

        {/* Global Footer Actions */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Autosaved just now</span>
          </div>
          <div className="flex gap-4">
            <button 
                onClick={onClose}
                className="px-12 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
            >
                Dismiss
            </button>
            {!isView && (
                <button 
                    onClick={() => onSave(form)}
                    className="px-16 py-4 text-[10px] font-black text-white bg-black rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/30 tracking-[0.2em]"
                >
                    Finalize Entry
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
