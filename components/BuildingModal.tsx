
// @google/genai Coding Guidelines: This file uses icons from lucide-react.
import React, { useState, useEffect } from 'react';
import { 
    X, Building, Save, Plus, UploadCloud, FileText, 
    CheckCircle2, Clock, Trash2, Layout, Zap, 
    Droplets, Maximize, TrendingUp, MapPin, ChevronLeft,
    ChevronRight, Info, Search, Edit3
} from 'lucide-react';
import { BuildingAssetRecord } from '../types';

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
  onSave: (data: Partial<BuildingAssetRecord>) => void;
  initialData?: BuildingAssetRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  mode = 'create',
}) => {
  const [activeTab, setActiveTab] = useState('INFORMASI UMUM');
  const [editingProposalIndex, setEditingProposalIndex] = useState<number | null>(null);
  
  const [form, setForm] = useState<any>({
    assetCode: '[AUTO-GENERATE]',
    assetCategory: 'Building',
    ownership: 'Sewa / Rental',
    assetType: 'Office',
    buildingName: '',
    channel: 'Direct',
    department: 'GA & Facility',
    proposals: [] as ProposalData[]
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

  const tabs = ['INFORMASI UMUM', 'PROPOSAL & PERBANDINGAN', 'WORKFLOW', 'DOKUMEN'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
            ...initialData,
            proposals: (initialData as any).proposals || []
        });
      } else {
        setForm({
            assetCode: '[AUTO-GENERATE]',
            assetCategory: 'Building',
            ownership: 'Sewa / Rental',
            assetType: 'Office',
            buildingName: '',
            channel: 'Direct',
            department: 'GA & Facility',
            proposals: []
        });
      }
      setEditingProposalIndex(null);
      setActiveTab('INFORMASI UMUM');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleAddCandidate = () => {
    const newProposal: ProposalData = {
        id: `KANDIDAT-${form.proposals.length + 1}`,
        name: `Kandidat ${form.proposals.length + 1}`,
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
    setEditingProposalIndex(form.proposals.length);
  };

  const handleEditCandidate = (index: number) => {
    setCurrentProposal(form.proposals[index]);
    setEditingProposalIndex(index);
  };

  const handleSaveProposal = () => {
    const newProposals = [...form.proposals];
    if (editingProposalIndex !== null) {
        newProposals[editingProposalIndex] = currentProposal;
    }
    setForm({ ...form, proposals: newProposals });
    setEditingProposalIndex(null);
  };

  const handleDeleteProposal = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newProposals = form.proposals.filter((_: any, i: number) => i !== index);
    setForm({ ...form, proposals: newProposals });
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
    <div className="flex gap-4 mb-10">
        <div className="w-1.5 h-10 bg-black rounded-full"></div>
        <div>
            <h3 className="text-[16px] font-black text-black uppercase tracking-tight">{num}. {title}</h3>
            {sub && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{sub}</p>}
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-[1300px] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header - Hidden when editing proposal to match screenshot 3 */}
        {editingProposalIndex === null && (
          <>
            <div className="px-14 py-10 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                  <Building size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[24px] font-black text-black uppercase tracking-tight leading-none">Manajemen Properti & Kontrak</h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2.5">Building Asset & Comparison Hub</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-black p-3 rounded-full hover:bg-gray-50 transition-all">
                <X size={36} strokeWidth={2.5} />
              </button>
            </div>

            <div className="bg-white border-b border-gray-100 flex px-14 shrink-0 overflow-x-auto no-scrollbar gap-12">
                {tabs.map(tab => (
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
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
                    <SectionHeader num="1" title="IDENTITAS ASET" sub="Asset Classification & Numbering" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="md:col-span-2">
                           <Input label="Nama Properti / Gedung" required value={form.buildingName} onChange={e => setForm({...form, buildingName: e.target.value})} placeholder="Input Nama Gedung..." />
                        </div>
                        <Input label="Asset Number" value={form.assetCode} disabled />
                        <Input label="Asset Category" required value={form.assetCategory} onChange={e => setForm({...form, assetCategory: e.target.value})} />
                        <Input label="Tipe Gedung" required value={form.assetType} onChange={e => setForm({...form, assetType: e.target.value})} />
                        <Input label="Model Kepemilikan" required value={form.ownership} onChange={e => setForm({...form, ownership: e.target.value})} />
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    <SectionHeader num="2" title="STRUKTUR & ORGANISASI" sub="Department & Channel Assignment" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Input label="Channel" required value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} />
                        <Input label="Department" required value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
                    </div>
                </div>
            </div>
          )}

          {/* Tab 2: PROPOSAL & PERBANDINGAN (FIXED BRANCH IMPROVEMENT) */}
          {activeTab === 'PROPOSAL & PERBANDINGAN' && (
            <div className="h-full">
               {editingProposalIndex === null ? (
                 <div className="max-w-6xl mx-auto space-y-10 p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-[#EEEEEE] p-10 rounded-[2.5rem] flex items-center justify-between">
                         <div>
                             <h3 className="text-[18px] font-black text-black uppercase tracking-tight">PERBANDINGAN KANDIDAT LOKASI</h3>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Meninjau {form.proposals.length} Opsi Properti Terbaik</p>
                         </div>
                         <button 
                            onClick={handleAddCandidate}
                            className="bg-black text-white px-10 py-5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/20"
                         >
                             <Plus size={20} strokeWidth={3} /> TAMBAH KANDIDAT OPSI
                         </button>
                    </div>
                    
                    {form.proposals.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3.5rem] min-h-[450px] flex flex-col items-center justify-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 shadow-inner">
                                <FileText size={48} />
                            </div>
                            <p className="text-[12px] font-black text-gray-300 uppercase tracking-[0.4em]">Belum ada proposal kandidat gedung</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {form.proposals.map((prop: ProposalData, idx: number) => (
                                <div 
                                    key={idx}
                                    onClick={() => handleEditCandidate(idx)}
                                    className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                                            <MapPin size={20} />
                                        </div>
                                        <button 
                                            onClick={(e) => handleDeleteProposal(idx, e)}
                                            className="text-gray-200 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <h4 className="text-[15px] font-black text-black uppercase tracking-tight mb-2">{prop.name}</h4>
                                    <p className="text-[11px] text-gray-400 font-medium line-clamp-2 min-h-[32px]">{prop.fullAddress || 'Alamat belum diisi...'}</p>
                                    
                                    <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[9px] font-black text-gray-300 uppercase">Luas Bangunan</div>
                                            <div className="text-[12px] font-black text-black">{prop.buildingArea || '0'} M²</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-gray-300 uppercase">Estimasi Sewa</div>
                                            <div className="text-[12px] font-black text-blue-600">Rp {parseInt(prop.rentPerYear || '0').toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                 </div>
               ) : (
                 <div className="animate-in fade-in duration-500 flex flex-col h-full bg-[#FDFDFD]">
                    {/* Candidate Sub-Header (Matches Image 3) */}
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

                    <div className="max-w-7xl mx-auto w-full p-14 pt-16">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
                          {/* Column Left: Lokasi & Fasilitas (Matches Image 2 Layout) */}
                          <div className="space-y-16">
                              <div className="space-y-12">
                                  <SectionHeader num="1" title="LOKASI & UTILITAS" />
                                  <div className="space-y-10">
                                      <Input 
                                        label="Alamat Lengkap (Jl.)" 
                                        value={currentProposal.fullAddress} 
                                        onChange={e => setCurrentProposal({...currentProposal, fullAddress: e.target.value})} 
                                        placeholder="Input Alamat Lengkap Properti..." 
                                      />
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
                                      <Input label="Daya Listrik (VA)" value={currentProposal.electricity} onChange={e => setCurrentProposal({...currentProposal, electricity: e.target.value})} placeholder="Input Daya..." />
                                      <Input label="Sumber Air" value={currentProposal.waterSource} onChange={e => setCurrentProposal({...currentProposal, waterSource: e.target.value})} placeholder="PAM" />
                                  </div>
                              </div>
                          </div>

                          {/* Column Right: Luas & Anggaran (Matches Image 2 Layout) */}
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
                                              <input 
                                                  className="bg-transparent border-none text-[26px] font-black text-black outline-none placeholder:text-gray-100 w-full"
                                                  placeholder="0"
                                                  value={currentProposal.rentPerYear}
                                                  onChange={e => setCurrentProposal({...currentProposal, rentPerYear: e.target.value})}
                                              />
                                          </div>
                                          <div className="h-[1.5px] bg-gray-50 mt-5"></div>
                                      </div>

                                      <div>
                                          <Label>Estimasi Pajak PPH Final (10%)</Label>
                                          <div className="flex items-baseline gap-3">
                                              <span className="text-[24px] font-black text-gray-300">Rp</span>
                                              <input 
                                                  className="bg-transparent border-none text-[26px] font-black text-black outline-none placeholder:text-gray-100 w-full"
                                                  placeholder="0"
                                                  value={currentProposal.taxEstimation}
                                                  onChange={e => setCurrentProposal({...currentProposal, taxEstimation: e.target.value})}
                                              />
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

          {/* Tab 3: WORKFLOW */}
          {activeTab === 'WORKFLOW' && (
            <div className="max-w-4xl mx-auto py-10 p-14 animate-in fade-in duration-500">
               <SectionHeader num="PERSETUJUAN KONTRAK" title="ASET" sub="Status Alur Kerja Real-Time" />
               <div className="space-y-16 pl-10 relative">
                   <div className="absolute left-[33px] top-4 bottom-4 w-[3px] bg-gray-100"></div>
                   <div className="flex gap-12 relative items-start">
                        <div className="w-16 h-16 bg-[#22C55E] text-white rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-2xl shadow-green-500/30">
                            <CheckCircle2 size={36} />
                        </div>
                        <div className="pt-2">
                            <h4 className="text-[18px] font-black text-black uppercase tracking-tight">PENGAJUAN AWAL GA</h4>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2"><Layout size={14}/> ADMIN FACILITY - 10 JAN 2024</p>
                            <div className="mt-5 inline-block bg-[#E8FDF5] text-[#059669] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#10B981]/20">SELESAI DIKIRIM</div>
                        </div>
                   </div>
                   {/* Tambahan step lainnya... */}
               </div>
            </div>
          )}

          {/* Tab 4: DOKUMEN */}
          {activeTab === 'DOKUMEN' && (
            <div className="max-w-6xl mx-auto p-14 animate-in fade-in duration-500">
               <SectionHeader num="LAMPIRAN" title="& BERKAS" sub="Legalitas & Kontrak Kerjasama" />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3.5rem] p-16 flex flex-col items-center justify-center min-h-[450px] group hover:border-black transition-all cursor-pointer text-center">
                        <div className="w-28 h-28 bg-[#F8F9FA] rounded-full flex items-center justify-center text-gray-200 mb-10 group-hover:bg-gray-100 transition-colors">
                            <Plus size={56} strokeWidth={1} />
                        </div>
                        <h4 className="text-[16px] font-black text-black uppercase tracking-[0.15em] mb-3">UNGGAH DOKUMEN BARU</h4>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">PDF, DOCX atau ZIP (Max 50MB)</p>
                   </div>
                   <div className="space-y-6">
                        {[
                            { name: 'SURAT_PERJANJIAN_SEWA.PDF', size: '2.4 MB', date: '12 JAN 2024' },
                            { name: 'SERTIFIKAT_BANGUNAN_HGB.PDF', size: '1.1 MB', date: '12 JAN 2024' }
                        ].map((file, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm flex items-center justify-between group hover:shadow-xl hover:translate-y-[-4px] transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200 group-hover:bg-black group-hover:text-white transition-all">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-black text-black uppercase tracking-tight">{file.name}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{file.size} • {file.date}</div>
                                    </div>
                                </div>
                                <button className="text-gray-200 hover:text-red-500 p-3 transition-colors"><Trash2 size={20} /></button>
                            </div>
                        ))}
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
                <Save size={20} strokeWidth={2.5} /> SIMPAN KONTRAK PROPERTI
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
