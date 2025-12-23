
import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, Home, ChevronsUpDown, Plus, Trash2, CheckCircle, MapPin, Layers, Settings, ArrowRight, GitMerge, FileText as FileIcon } from 'lucide-react';
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
    proposals: []
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
        setForm({ ownership: 'Rent', status: 'Draft', type: 'Office', proposals: [] });
        setActiveTab('Informasi Umum');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const addProposal = () => {
    const newProposal: BuildingProposal = {
      id: Date.now().toString(),
      optionName: `Candidate ${(form.proposals?.length || 0) + 1}`,
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

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-6 bg-black rounded-full"></div>
      <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[1200px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
                <Building size={18} className="text-black" />
            </div>
            <div>
                <h2 className="text-[14px] font-black text-black uppercase tracking-widest leading-none">Manajemen Properti & Kontrak</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Gedung / Cabang / Gudang</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-100 flex px-8 shrink-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => { setActiveTab(tab); setEditingProposalIndex(null); }}
                    className={`py-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-black'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#FBFBFB]">
          {activeTab === 'Informasi Umum' && (
            <div className="max-w-4xl mx-auto space-y-10">
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <SectionHeader icon={Home} title="Identitas Gedung" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="md:col-span-2">
                        <Label>Nama Gedung</Label>
                        <input className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:border-black outline-none shadow-sm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Input nama gedung..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Tipe Gedung</Label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:border-black outline-none bg-white shadow-sm" value={form.type} onChange={e => setForm({...form, type: e.target.value})} disabled={isView}>
                            <option value="Office">Office</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Showroom">Showroom</option>
                        </select>
                     </div>
                     <div>
                        <Label>Model Kepemilikan</Label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:border-black outline-none bg-white shadow-sm" value={form.ownership} onChange={e => setForm({...form, ownership: e.target.value as any})} disabled={isView}>
                            <option value="Rent">Sewa / Rental</option>
                            <option value="Own">Milik Sendiri</option>
                        </select>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <SectionHeader icon={MapPin} title="Lokasi" />
                  <div className="space-y-6">
                    <div>
                        <Label>Kota / Wilayah</Label>
                        <input className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:border-black outline-none shadow-sm" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Contoh: Jakarta Selatan" disabled={isView} />
                    </div>
                    <div>
                        <Label>Alamat Lengkap</Label>
                        <textarea className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm font-medium focus:border-black outline-none min-h-[120px] shadow-sm" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Jl. Raya No. 1..." disabled={isView} />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Proposal & Perbandingan' && (
            <div className="space-y-8">
               {editingProposalIndex === null ? (
                 <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-[18px] font-black text-black uppercase tracking-tighter">Perbandingan Kandidat Lokasi</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Reviewing {(form.proposals || []).length} kandidat gedung baru</p>
                        </div>
                        {!isView && (
                          <button onClick={addProposal} className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                              <Plus size={18} /> Tambah Kandidat
                          </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(form.proposals || []).map((prop, idx) => (
                            <div key={prop.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden group hover:border-black transition-all">
                                <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                    <span className="text-[10px] font-black text-black uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">{prop.optionName}</span>
                                    {!isView && <button onClick={() => removeProposal(idx)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>}
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <Label>Proposed Address</Label>
                                        <p className="text-[12px] font-black text-black uppercase leading-relaxed line-clamp-2">{prop.address.jl || 'Belum diisi'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <p className="text-[8px] font-black text-gray-400 uppercase">Sewa / Tahun</p>
                                            <p className="text-[12px] font-black text-blue-600">{prop.costs.rent ? `Rp ${parseInt(prop.costs.rent).toLocaleString('id-ID')}` : 'N/A'}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <p className="text-[8px] font-black text-gray-400 uppercase">Luas Bangunan</p>
                                            <p className="text-[12px] font-black text-black">{prop.areas.building || '0'} M²</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingProposalIndex(idx)} className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                                        {isView ? 'Lihat Detail' : 'Edit Detail'} <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(form.proposals || []).length === 0 && (
                          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                             <FileIcon size={48} className="text-gray-200 mb-4" />
                             <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Belum ada proposal kandidat gedung</p>
                          </div>
                        )}
                    </div>
                 </>
               ) : (
                 <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setEditingProposalIndex(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-black">
                                <X size={24} />
                            </button>
                            <h3 className="text-[14px] font-black text-black uppercase tracking-widest">Detail Kandidat: {form.proposals![editingProposalIndex].optionName}</h3>
                        </div>
                        <button onClick={() => setEditingProposalIndex(null)} className="bg-black text-white px-10 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/20">
                            Kembali ke List
                        </button>
                    </div>

                    <div className="p-12 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-10">
                                <SectionHeader icon={MapPin} title="1. Informasi Lokasi" />
                                <div><Label>Alamat Lengkap (Jl.)</Label><input disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].address.jl} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, jl: e.target.value } })} /></div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div><Label>Kota</Label><input disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].address.kota} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kota: e.target.value } })} /></div>
                                    <div><Label>Kabupaten</Label><input disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].address.kabupaten} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kabupaten: e.target.value } })} /></div>
                                    <div><Label>Propinsi</Label><input disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].address.propinsi} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, propinsi: e.target.value } })} /></div>
                                </div>
                                <SectionHeader icon={Settings} title="2. Utilitas" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div><Label>Daya Listrik (VA)</Label><input disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].electricity} onChange={e => updateProposal(editingProposalIndex!, { electricity: e.target.value })} /></div>
                                    <div><Label>Sumber Air</Label><select disabled={isView} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white" value={form.proposals![editingProposalIndex].water} onChange={e => updateProposal(editingProposalIndex!, { water: e.target.value })}><option value="PAM">PAM</option><option value="Sumur">Sumur / Pompa</option></select></div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <SectionHeader icon={Layers} title="3. Luas & Fisik" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div><Label>Luas Tanah (M²)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].areas.land} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, land: e.target.value } })} /></div>
                                    <div><Label>Luas Bangunan (M²)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].areas.building} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, building: e.target.value } })} /></div>
                                </div>
                                <SectionHeader icon={DollarSign} title="4. Biaya & Anggaran" />
                                <div className="space-y-4">
                                    <div><Label>Biaya Sewa per Tahun (Rp)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-blue-600" value={form.proposals![editingProposalIndex].costs.rent} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, rent: e.target.value } })} /></div>
                                    <div><Label>Estimasi Pajak PPH (Rp)</Label><input disabled={isView} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold" value={form.proposals![editingProposalIndex].costs.tax} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, tax: e.target.value } })} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div className="max-w-3xl mx-auto py-10 space-y-12">
               <SectionHeader icon={GitMerge} title="Persetujuan Kontrak" />
               <div className="space-y-8">
                  <div className="flex gap-6">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg"><CheckCircle size={20} /></div>
                        <div className="w-0.5 h-16 bg-green-200"></div>
                     </div>
                     <div>
                        <h4 className="text-[12px] font-black text-black uppercase">Pengajuan Awal</h4>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Oleh: Admin Facility - 10 Jan 2024</p>
                        <div className="mt-3 px-4 py-2 bg-green-50 rounded-xl text-[10px] font-bold text-green-700 inline-block border border-green-100 uppercase">Selesai</div>
                     </div>
                  </div>
                  <div className="flex gap-6 opacity-40">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-white shadow-sm">2</div>
                        <div className="w-0.5 h-16 bg-gray-100"></div>
                     </div>
                     <div>
                        <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Review Manager GA</h4>
                        <p className="text-[10px] text-gray-300 mt-1 uppercase font-bold italic">Menunggu Antrian...</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Dokumen' && (
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <Plus size={32} className="text-gray-300" />
               </div>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Belum ada lampiran dokumen diunggah</p>
               <button className="mt-6 bg-white border border-gray-200 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-all shadow-sm">Unggah Folder Berkas</button>
            </div>
          )}
        </div>

        {/* Global Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all bg-gray-50 rounded-xl">Batal</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="bg-black text-white px-16 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/20">
              Simpan Kontrak Properti
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
