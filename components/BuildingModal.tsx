
import React, { useState, useEffect } from 'react';
import { 
    X, Building, DollarSign, Home, Plus, Trash2, CheckCircle, MapPin, 
    Layers, Settings, ArrowRight, GitMerge, FileText as FileIcon, 
    LayoutGrid, Briefcase, Users, Navigation, ShieldCheck, Clock, Save
} from 'lucide-react';
import { BuildingRecord, BuildingProposal } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('Informasi Umum');
  const [editingProposalIndex, setEditingProposalIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    ownership: 'Rent',
    status: 'Draft',
    type: 'Office',
    proposals: [],
    channel: 'Direct',
    department: 'GA & Facility'
  });

  const tabs = form.ownership === 'Own' 
    ? ['Informasi Umum', 'Dokumen'] 
    : ['Informasi Umum', 'Proposal & Perbandingan', 'Workflow', 'Dokumen'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setActiveTab('Informasi Umum');
      } else {
        setForm({ 
            ownership: 'Rent', status: 'Draft', type: 'Office', proposals: [],
            channel: 'Direct', department: 'GA & Facility', location: 'Jakarta'
        });
        setActiveTab('Informasi Umum');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const addProposal = () => {
    const newProposal: BuildingProposal = {
      id: Date.now().toString(),
      optionName: `Kandidat ${(form.proposals?.length || 0) + 1}`,
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

  // Fix: make children optional to resolve TS error where children are passed via JSX but reported as missing
  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title, sub }: { icon: any, title: string, sub?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-1.5 h-8 bg-black rounded-full shadow-sm"></div>
      <div>
          <h3 className="text-[12px] font-black text-black uppercase tracking-[0.15em] leading-none">{title}</h3>
          {sub && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-[1250px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-black rounded-2xl shadow-xl shadow-black/20 text-white">
                <Building size={22} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">Manajemen Properti & Kontrak</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Building Asset & Comparison Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Navigation Tabs - Image 2 Style */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 overflow-x-auto no-scrollbar gap-2">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => { setActiveTab(tab); setEditingProposalIndex(null); }}
                    className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 whitespace-nowrap
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {activeTab === 'Informasi Umum' && (
            <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
               
               {/* Section 1: Core Fields from Image 1 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <SectionHeader icon={LayoutGrid} title="1. Identitas Aset" sub="Asset Classification & Numbering" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                     <div className="md:col-span-2">
                        <Label required>Nama Properti / Gedung</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm transition-all bg-gray-50 focus:bg-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Input Nama Gedung..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Asset Number</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-mono font-bold text-gray-400 bg-gray-50/50" value={form.assetNo || '[AUTO-GENERATE]'} disabled />
                     </div>
                     <div>
                        <Label required>Asset Category</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black bg-gray-50" value="Building" readOnly />
                     </div>
                     <div>
                        <Label required>Tipe Gedung</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none cursor-pointer" value={form.type} onChange={e => setForm({...form, type: e.target.value})} disabled={isView}>
                            <option value="Office">Office</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Showroom">Showroom</option>
                            <option value="Home Center">Home Center</option>
                        </select>
                     </div>
                     <div>
                        <Label required>Model Kepemilikan</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none cursor-pointer" value={form.ownership} onChange={e => setForm({...form, ownership: e.target.value as any})} disabled={isView}>
                            <option value="Rent">Sewa / Rental</option>
                            <option value="Own">Milik Sendiri</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* Section 2: Channel & Dept from Image 1 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                  <SectionHeader icon={Briefcase} title="2. Struktur & Organisasi" sub="Department & Channel Assignment" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                     <div>
                        <Label required>Channel</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none" value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} disabled={isView}>
                            <option value="Direct">Direct</option>
                            <option value="Indirect">Indirect</option>
                            <option value="HCO">HCO</option>
                        </select>
                     </div>
                     <div>
                        <Label required>Department</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none" value={form.department} onChange={e => setForm({...form, department: e.target.value})} disabled={isView}>
                            <option value="GA & Facility">GA & Facility</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Logistics">Logistics</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* Section 3: Localization from Image 1 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                  <SectionHeader icon={Navigation} title="3. Lokasi & Alamat" sub="Physical Location Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                        <Label required>Asset Location (City/Branch)</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none" value={form.location} onChange={e => setForm({...form, location: e.target.value})} disabled={isView}>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Surabaya">Surabaya</option>
                            <option value="Bandung">Bandung</option>
                            <option value="Medan">Medan</option>
                        </select>
                    </div>
                    <div>
                        <Label>Sub - Location (Building Detail)</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 shadow-sm" value={form.subLocation} onChange={e => setForm({...form, subLocation: e.target.value})} placeholder="Ex: Lantai 3, Sayap Barat..." disabled={isView} />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Alamat Lengkap</Label>
                        <textarea className="w-full border border-gray-100 rounded-3xl px-8 py-6 text-[13px] font-medium focus:border-black outline-none min-h-[140px] shadow-sm bg-gray-50 leading-relaxed resize-none" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Input alamat lengkap sesuai sertifikat/kontrak..." disabled={isView} />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Proposal & Perbandingan' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               {editingProposalIndex === null ? (
                 <>
                    <div className="flex justify-between items-end mb-8 bg-black/5 p-8 rounded-[2rem]">
                        <div>
                            <h3 className="text-[20px] font-black text-black uppercase tracking-tighter">Perbandingan Kandidat Lokasi</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Meninjau {(form.proposals || []).length} opsi properti terbaik</p>
                        </div>
                        {!isView && (
                          <button onClick={addProposal} className="bg-black text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 active:scale-95">
                              <Plus size={18} strokeWidth={3} /> Tambah Kandidat Opsi
                          </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {(form.proposals || []).map((prop, idx) => (
                            <div key={prop.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group hover:border-black transition-all duration-500 hover:-translate-y-2">
                                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/40">
                                    <span className="text-[10px] font-black text-black uppercase tracking-[0.15em] px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-100">{prop.optionName}</span>
                                    {!isView && <button onClick={() => removeProposal(idx)} className="text-gray-200 hover:text-red-500 transition-all transform hover:rotate-90 p-1"><Trash2 size={18}/></button>}
                                </div>
                                <div className="p-10 space-y-8">
                                    <div>
                                        <Label>Alamat Penawaran</Label>
                                        <p className="text-[13px] font-black text-black uppercase leading-relaxed line-clamp-2 min-h-[3rem]">{prop.address.jl || 'Belum diisi'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100 group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors">
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Sewa / Tahun</p>
                                            <p className="text-[14px] font-black text-blue-600">{prop.costs.rent ? `Rp ${parseInt(prop.costs.rent).toLocaleString('id-ID')}` : 'N/A'}</p>
                                        </div>
                                        <div className="bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100 group-hover:bg-black/5 transition-colors">
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Luas Bangunan</p>
                                            <p className="text-[14px] font-black text-black">{prop.areas.building || '0'} M²</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingProposalIndex(idx)} className="w-full py-5 bg-black text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3">
                                        {isView ? 'Lihat Spesifikasi' : 'Edit Spesifikasi'} <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(form.proposals || []).length === 0 && (
                          <div className="col-span-full py-32 flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6"><FileIcon size={32} className="text-gray-200" /></div>
                             <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Belum ada proposal kandidat gedung</p>
                          </div>
                        )}
                    </div>
                 </>
               ) : (
                 /* Detailed Proposal Editor */
                 <div className="bg-white rounded-[3rem] border border-gray-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
                    <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-6">
                            <button onClick={() => setEditingProposalIndex(null)} className="p-3 hover:bg-gray-50 rounded-full transition-all text-gray-300 hover:text-black border border-transparent hover:border-gray-100">
                                <X size={28} strokeWidth={2.5} />
                            </button>
                            <div>
                                <h3 className="text-[16px] font-black text-black uppercase tracking-[0.15em]">Detail Teknis & Survey: {form.proposals![editingProposalIndex].optionName}</h3>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Deep Comparison Matrix</p>
                            </div>
                        </div>
                        <button onClick={() => setEditingProposalIndex(null)} className="bg-black text-white px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-black/20 transition-all hover:bg-gray-800">
                            Simpan & Kembali
                        </button>
                    </div>

                    <div className="p-14 bg-[#FBFBFB]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-12">
                                <SectionHeader icon={MapPin} title="1. Lokasi & Utilitas" />
                                <div className="space-y-8">
                                    <div><Label>Alamat Lengkap (Jl.)</Label><input disabled={isView} className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-[13px] font-black bg-white" value={form.proposals![editingProposalIndex].address.jl} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, jl: e.target.value } })} /></div>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div><Label>Kota</Label><input disabled={isView} className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-[12px] font-bold bg-white" value={form.proposals![editingProposalIndex].address.kota} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kota: e.target.value } })} /></div>
                                        <div><Label>Kabupaten</Label><input disabled={isView} className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-[12px] font-bold bg-white" value={form.proposals![editingProposalIndex].address.kabupaten} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kabupaten: e.target.value } })} /></div>
                                        <div><Label>Propinsi</Label><input disabled={isView} className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-[12px] font-bold bg-white" value={form.proposals![editingProposalIndex].address.propinsi} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, propinsi: e.target.value } })} /></div>
                                    </div>
                                </div>
                                <SectionHeader icon={Settings} title="2. Fasilitas Teknis" />
                                <div className="grid grid-cols-2 gap-6">
                                    <div><Label>Daya Listrik (VA)</Label><input disabled={isView} className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-[13px] font-black bg-white" value={form.proposals![editingProposalIndex].electricity} onChange={e => updateProposal(editingProposalIndex!, { electricity: e.target.value })} /></div>
                                    <div><Label>Sumber Air</Label><select disabled={isView} className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-[13px] font-black bg-white appearance-none" value={form.proposals![editingProposalIndex].water} onChange={e => updateProposal(editingProposalIndex!, { water: e.target.value })}><option value="PAM">PAM</option><option value="Sumur">Sumur / Pompa</option><option value="Dual">PAM & Sumur</option></select></div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <SectionHeader icon={Layers} title="3. Luas & Struktur" />
                                <div className="grid grid-cols-2 gap-6">
                                    <div><Label>Luas Tanah (M²)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-[13px] font-black bg-white" value={form.proposals![editingProposalIndex].areas.land} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, land: e.target.value } })} /></div>
                                    <div><Label>Luas Bangunan (M²)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-[13px] font-black bg-white" value={form.proposals![editingProposalIndex].areas.building} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, building: e.target.value } })} /></div>
                                </div>
                                <SectionHeader icon={DollarSign} title="4. Analisa Anggaran" />
                                <div className="space-y-6">
                                    <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm space-y-6">
                                        <div><Label>Biaya Sewa / Tahun (Gross)</Label><div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-gray-300">Rp</span><input disabled={isView} type="number" className="w-full border-b border-gray-100 py-3 pl-8 text-[18px] font-black text-blue-600 outline-none focus:border-blue-600 transition-all" value={form.proposals![editingProposalIndex].costs.rent} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, rent: e.target.value } })} /></div></div>
                                        <div><Label>Estimasi Pajak PPH Final (10%)</Label><div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-gray-300">Rp</span><input disabled={isView} type="number" className="w-full border-b border-gray-100 py-3 pl-8 text-[14px] font-bold text-gray-500 outline-none" value={form.proposals![editingProposalIndex].costs.tax} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, tax: e.target.value } })} /></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in duration-500">
               <SectionHeader icon={GitMerge} title="Persetujuan Kontrak Aset" sub="Status Alur Kerja Real-time" />
               <div className="space-y-0 pl-4">
                  
                  {/* Step 1 - Completed */}
                  <div className="flex gap-10">
                     <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-xl shadow-green-100"><CheckCircle size={24} strokeWidth={2.5} /></div>
                        <div className="w-1 h-24 bg-green-200"></div>
                     </div>
                     <div className="pt-2">
                        <h4 className="text-[13px] font-black text-black uppercase tracking-widest">Pengajuan Awal GA</h4>
                        <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest flex items-center gap-2"><Users size={12} /> Admin Facility - 10 Jan 2024</p>
                        <div className="mt-4 px-6 py-2.5 bg-green-50 rounded-xl text-[10px] font-black text-green-700 inline-flex items-center gap-2 border border-green-100 uppercase tracking-[0.15em]">Selesai Dikirim</div>
                     </div>
                  </div>

                  {/* Step 2 - Active */}
                  <div className="flex gap-10">
                     <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-2xl shadow-black/20 ring-4 ring-gray-50 animate-pulse"><Clock size={24} strokeWidth={2.5} /></div>
                        <div className="w-1 h-24 bg-gray-100"></div>
                     </div>
                     <div className="pt-2">
                        <h4 className="text-[13px] font-black text-black uppercase tracking-widest">Review Manager GA</h4>
                        <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest flex items-center gap-2"><Users size={12} /> Ibnu Faisal - HRGA Manager</p>
                        <div className="mt-4 px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black inline-flex items-center gap-2 border border-black uppercase tracking-[0.15em] shadow-lg">Sedang Ditinjau</div>
                     </div>
                  </div>

                  {/* Step 3 - Future */}
                  <div className="flex gap-10 opacity-30">
                     <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-gray-300">3</div>
                     </div>
                     <div className="pt-2">
                        <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-widest">Approval Direksi</h4>
                        <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold italic tracking-widest">Menunggu Antrian...</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Dokumen' && (
            <div className="max-w-5xl mx-auto py-12 space-y-10 animate-in zoom-in-95 duration-500">
                <SectionHeader icon={ShieldCheck} title="Lampiran & Berkas" sub="Legalitas & Kontrak Kerjasama" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Zone */}
                    <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-200 rounded-[3rem] bg-white group hover:border-black transition-all cursor-pointer">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <Plus size={40} className="text-gray-300 group-hover:text-black transition-colors" />
                        </div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-black transition-colors">Unggah Dokumen Baru</p>
                        <p className="text-[9px] font-bold text-gray-300 mt-3 uppercase tracking-widest italic">PDF, DOCX atau Zip (Max 50MB)</p>
                    </div>

                    {/* File List Simulated */}
                    <div className="space-y-4">
                        {[
                            { name: 'Surat_Perjanjian_Sewa.pdf', size: '2.4 MB', date: '12 Jan 2024' },
                            { name: 'Sertifikat_Bangunan_HGB.pdf', size: '1.1 MB', date: '12 Jan 2024' },
                            { name: 'Foto_Survey_Opsi_1.zip', size: '15.8 MB', date: '14 Jan 2024' }
                        ].map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-black transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:text-black group-hover:bg-black/5 transition-all"><FileIcon size={20} /></div>
                                    <div>
                                        <h5 className="text-[11px] font-black text-black uppercase tracking-tight">{file.name}</h5>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{file.size} • {file.date}</p>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black text-gray-300 hover:text-red-500 p-2"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Global Footer - Premium Style */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all bg-gray-50 rounded-2xl hover:bg-gray-100 active:scale-95">Batal</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="bg-black text-white px-20 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-4">
              <Save size={18} strokeWidth={2.5} /> Simpan Kontrak Properti
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
