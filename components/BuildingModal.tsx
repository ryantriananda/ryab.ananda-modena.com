import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, Home, ChevronDown, Plus, Trash2, CheckCircle, MapPin, Layers, Settings, ArrowRight, GitMerge, FileText as FileIcon, Save, Upload } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-xl">
              <Building size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {mode === 'create' ? 'Tambah Gedung Baru' : mode === 'edit' ? 'Edit Data Gedung' : 'Detail Gedung'}
              </h2>
              <p className="text-sm text-gray-500">Manajemen properti & kontrak</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-50 border-b border-gray-100 flex px-6 shrink-0 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingProposalIndex(null); }}
              className={`py-3 px-5 text-sm font-medium transition-all border-b-2 whitespace-nowrap
                ${activeTab === tab 
                  ? 'border-blue-600 text-blue-600 bg-white -mb-px rounded-t-lg' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {activeTab === 'Informasi Umum' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Identitas Gedung */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                  Identitas Gedung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Nama Gedung</label>
                    <input 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" 
                      value={form.name || ''} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      placeholder="Masukkan nama gedung..." 
                      disabled={isView} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Tipe Gedung</label>
                    <div className="relative">
                      <select 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer" 
                        value={form.type} 
                        onChange={e => setForm({...form, type: e.target.value})} 
                        disabled={isView}
                      >
                        <option value="Office">Office</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Showroom">Showroom</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Model Kepemilikan</label>
                    <div className="relative">
                      <select 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer" 
                        value={form.ownership} 
                        onChange={e => setForm({...form, ownership: e.target.value as any})} 
                        disabled={isView}
                      >
                        <option value="Rent">Sewa / Rental</option>
                        <option value="Own">Milik Sendiri</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lokasi */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                  Lokasi
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Kota / Wilayah</label>
                    <input 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" 
                      value={form.location || ''} 
                      onChange={e => setForm({...form, location: e.target.value})} 
                      placeholder="Contoh: Jakarta Selatan" 
                      disabled={isView} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Alamat Lengkap</label>
                    <textarea 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none min-h-[100px] resize-none transition-all" 
                      value={form.address || ''} 
                      onChange={e => setForm({...form, address: e.target.value})} 
                      placeholder="Jl. Raya No. 1..." 
                      disabled={isView} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Proposal & Perbandingan' && (
            <div className="space-y-6">
              {editingProposalIndex === null ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Perbandingan Kandidat Lokasi</h3>
                      <p className="text-sm text-gray-500 mt-1">Reviewing {(form.proposals || []).length} kandidat gedung</p>
                    </div>
                    {!isView && (
                      <button 
                        onClick={addProposal} 
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                      >
                        <Plus size={18} /> Tambah Kandidat
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(form.proposals || []).map((prop, idx) => (
                      <div key={prop.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-blue-300 hover:shadow-md transition-all group">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                          <span className="text-xs font-semibold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">{prop.optionName}</span>
                          {!isView && (
                            <button onClick={() => removeProposal(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16}/>
                            </button>
                          )}
                        </div>
                        <div className="p-4 space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Alamat</p>
                            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{prop.address.jl || 'Belum diisi'}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-[10px] text-blue-600 font-medium">Sewa / Tahun</p>
                              <p className="text-sm font-bold text-blue-700">{prop.costs.rent ? `Rp ${parseInt(prop.costs.rent).toLocaleString('id-ID')}` : '-'}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-[10px] text-gray-500 font-medium">Luas Bangunan</p>
                              <p className="text-sm font-bold text-gray-900">{prop.areas.building || '0'} M²</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setEditingProposalIndex(idx)} 
                            className="w-full py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                          >
                            {isView ? 'Lihat Detail' : 'Edit Detail'} <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(form.proposals || []).length === 0 && (
                      <div className="col-span-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <FileIcon size={40} className="text-gray-300 mb-3" />
                        <p className="text-sm font-medium text-gray-500">Belum ada proposal kandidat</p>
                        <p className="text-xs text-gray-400 mt-1">Klik "Tambah Kandidat" untuk memulai</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setEditingProposalIndex(null)} className="p-2 hover:bg-gray-200 rounded-lg transition-all text-gray-500">
                        <X size={20} />
                      </button>
                      <h3 className="text-sm font-semibold text-gray-900">Detail: {form.proposals![editingProposalIndex].optionName}</h3>
                    </div>
                    <button 
                      onClick={() => setEditingProposalIndex(null)} 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                      Kembali
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Lokasi */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <MapPin size={16} className="text-blue-600" /> Informasi Lokasi
                        </h4>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1.5">Alamat (Jl.)</label>
                          <input disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].address.jl} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, jl: e.target.value } })} />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Kota</label>
                            <input disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].address.kota} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kota: e.target.value } })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Kabupaten</label>
                            <input disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].address.kabupaten} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, kabupaten: e.target.value } })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Propinsi</label>
                            <input disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].address.propinsi} onChange={e => updateProposal(editingProposalIndex!, { address: { ...form.proposals![editingProposalIndex!].address, propinsi: e.target.value } })} />
                          </div>
                        </div>
                      </div>

                      {/* Utilitas */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <Settings size={16} className="text-blue-600" /> Utilitas
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Daya Listrik (VA)</label>
                            <input disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].electricity} onChange={e => updateProposal(editingProposalIndex!, { electricity: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Sumber Air</label>
                            <select disabled={isView} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].water} onChange={e => updateProposal(editingProposalIndex!, { water: e.target.value })}>
                              <option value="">Pilih...</option>
                              <option value="PAM">PAM</option>
                              <option value="Sumur">Sumur / Pompa</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Luas */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <Layers size={16} className="text-blue-600" /> Luas & Fisik
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Luas Tanah (M²)</label>
                            <input disabled={isView} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].areas.land} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, land: e.target.value } })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Luas Bangunan (M²)</label>
                            <input disabled={isView} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].areas.building} onChange={e => updateProposal(editingProposalIndex!, { areas: { ...form.proposals![editingProposalIndex!].areas, building: e.target.value } })} />
                          </div>
                        </div>
                      </div>

                      {/* Biaya */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <DollarSign size={16} className="text-blue-600" /> Biaya & Anggaran
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Biaya Sewa per Tahun (Rp)</label>
                            <input disabled={isView} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-600 focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].costs.rent} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, rent: e.target.value } })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">Estimasi Pajak PPH (Rp)</label>
                            <input disabled={isView} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 outline-none" value={form.proposals![editingProposalIndex].costs.tax} onChange={e => updateProposal(editingProposalIndex!, { costs: { ...form.proposals![editingProposalIndex!].costs, tax: e.target.value } })} />
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
            <div className="max-w-2xl mx-auto py-6 space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <GitMerge size={16} className="text-blue-600" /> Persetujuan Kontrak
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                      <CheckCircle size={20} />
                    </div>
                    <div className="w-0.5 h-12 bg-emerald-200"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="text-sm font-semibold text-gray-900">Pengajuan Awal</h4>
                    <p className="text-xs text-gray-500 mt-1">Oleh: Admin Facility - 10 Jan 2024</p>
                    <span className="inline-flex mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium ring-1 ring-emerald-600/20">Selesai</span>
                  </div>
                </div>
                <div className="flex gap-4 opacity-50">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">2</div>
                    <div className="w-0.5 h-12 bg-gray-100"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="text-sm font-semibold text-gray-500">Review Manager GA</h4>
                    <p className="text-xs text-gray-400 mt-1 italic">Menunggu antrian...</p>
                  </div>
                </div>
                <div className="flex gap-4 opacity-30">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">3</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-500">Approval Direktur</h4>
                    <p className="text-xs text-gray-400 mt-1 italic">Belum dimulai</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Dokumen' && (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              <Upload size={40} className="text-gray-300 mb-4" />
              <p className="text-sm font-medium text-gray-500">Belum ada dokumen diunggah</p>
              <p className="text-xs text-gray-400 mt-1">Drag & drop atau klik untuk upload</p>
              <button className="mt-4 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                Pilih File
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between bg-white shrink-0">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            Batal
          </button>
          {!isView && (
            <button 
              onClick={() => onSave(form)} 
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
            >
              <Save size={18} />
              Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
