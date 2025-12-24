
import React, { useState, useEffect } from 'react';
import { 
    X, Save, Box, MapPin, Tag, Activity, FileText, 
    GitBranch, Users, Plus, UploadCloud, Download, 
    Trash2, CheckCircle2, Clock, AlertCircle, Calendar,
    DollarSign, FileCheck
} from 'lucide-react';
import { BuildingAssetRecord, MaintenanceProposal } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingAssetRecord>) => void;
  initialData?: BuildingAssetRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingAssetItemModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('GENERAL INFO');
  const [form, setForm] = useState<Partial<BuildingAssetRecord>>({
    assetCode: '[AUTO]',
    status: 'Good',
    approvalStatus: 'Approved',
    maintenanceFrequency: 'Quarterly',
    ownership: 'Own'
  });

  // Mock data for proposals if not exists
  const [proposals, setProposals] = useState<MaintenanceProposal[]>([
      { id: 'PROP-01', vendorName: 'PT Cool Technic', proposalName: 'Perbaikan Kompresor', submissionDate: '2024-02-20', estimatedCost: '1.500.000', status: 'Reviewing' },
      { id: 'PROP-02', vendorName: 'CV Service Mandiri', proposalName: 'Perbaikan Kompresor & Isi Freon', submissionDate: '2024-02-21', estimatedCost: '1.850.000', status: 'Pending' }
  ]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        if(initialData.proposals) setProposals(initialData.proposals);
      } else {
        setForm({
            assetCode: '[AUTO]',
            status: 'Good',
            approvalStatus: 'Approved',
            maintenanceFrequency: 'Quarterly',
            ownership: 'Own'
        });
        setProposals([]);
      }
      setActiveTab('GENERAL INFO');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const tabs = ['GENERAL INFO', 'PROPOSAL & VENDOR', 'WORKFLOW', 'DOKUMEN'];

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "" }: any) => (
    <div>
      <Label>{label}</Label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                <Box size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Register Aset Baru' : mode === 'edit' ? 'Edit Aset Gedung' : 'Detail Aset Gedung'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Facility Equipment Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={32} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-12 shrink-0 overflow-x-auto no-scrollbar gap-10">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] relative
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-12 bg-[#FBFBFB] flex-1 overflow-y-auto custom-scrollbar">
            
            {/* TAB: GENERAL INFO */}
            {activeTab === 'GENERAL INFO' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Identity */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2 bg-gray-50 rounded-xl"><Tag size={18} className="text-black"/></div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">Identitas Aset</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Nama Aset" value={form.assetName} field="assetName" placeholder="Contoh: AC Split Daikin 1PK" />
                            <InputField label="Kode Aset" value={form.assetCode} field="assetCode" disabled={true} />
                            
                            <div>
                                <Label>Tipe Aset</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                    value={form.assetType || ''}
                                    onChange={(e) => setForm({...form, assetType: e.target.value})}
                                >
                                    <option value="">Pilih Tipe</option>
                                    <option value="AC">AC</option>
                                    <option value="APAR">APAR</option>
                                    <option value="CCTV">CCTV</option>
                                    <option value="Genset">Genset</option>
                                    <option value="Lift">Lift</option>
                                    <option value="Pompa">Pompa Air</option>
                                    <option value="Furniture">Furniture</option>
                                </select>
                            </div>
                            
                            <InputField label="Merek / Brand" value={form.brand} field="brand" placeholder="Daikin, Toto, dll" />
                        </div>
                    </div>

                    {/* Location & Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 bg-gray-50 rounded-xl"><MapPin size={18} className="text-black"/></div>
                                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">Lokasi</h3>
                            </div>
                            <div className="space-y-6">
                                <InputField label="Gedung / Cabang" value={form.buildingName} field="buildingName" placeholder="Head Office" />
                                <div className="grid grid-cols-2 gap-6">
                                    <InputField label="Lantai" value={form.floor} field="floor" placeholder="Lantai 1" />
                                    <InputField label="Ruangan" value={form.roomName} field="roomName" placeholder="Lobby" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 bg-gray-50 rounded-xl"><Activity size={18} className="text-black"/></div>
                                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">Kondisi</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <Label>Kondisi Fisik</Label>
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                        value={form.status || ''}
                                        onChange={(e) => setForm({...form, status: e.target.value as any})}
                                    >
                                        <option value="Good">Good (Baik)</option>
                                        <option value="Fair">Fair (Cukup)</option>
                                        <option value="Critical">Critical (Rusak)</option>
                                        <option value="Maintenance">Under Maintenance</option>
                                    </select>
                                </div>
                                <div>
                                    <Label>Frekuensi Maintenance</Label>
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                        value={form.maintenanceFrequency || ''}
                                        onChange={(e) => setForm({...form, maintenanceFrequency: e.target.value as any})}
                                    >
                                        <option value="Monthly">Monthly (Bulanan)</option>
                                        <option value="Quarterly">Quarterly (3 Bulanan)</option>
                                        <option value="Yearly">Yearly (Tahunan)</option>
                                        <option value="None">None</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: PROPOSAL & VENDOR */}
            {activeTab === 'PROPOSAL & VENDOR' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-[14px] font-black text-black uppercase tracking-widest">Comparison Table</h3>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">Bandingkan penawaran maintenance untuk aset ini</p>
                        </div>
                        {!isView && (
                            <button className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/20">
                                <Plus size={14} strokeWidth={3} /> Tambah Vendor
                            </button>
                        )}
                    </div>

                    {proposals.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {proposals.map((prop, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-6">
                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] font-black text-black uppercase tracking-tight">{prop.vendorName}</h4>
                                                <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wide">{prop.proposalName}</p>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <span className="text-[10px] font-mono font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded"><Calendar size={10} className="inline mr-1 mb-0.5"/> {prop.submissionDate}</span>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                                                        prop.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                        {prop.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimasi Biaya</p>
                                            <p className="text-[18px] font-black text-black font-mono">Rp {prop.estimatedCost}</p>
                                            <div className="flex gap-2 mt-4 justify-end">
                                                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-black transition-all" title="View Detail"><FileText size={16} /></button>
                                                {!isView && <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-all" title="Remove"><Trash2 size={16} /></button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 flex flex-col items-center justify-center opacity-50">
                            <Users size={48} className="text-gray-300 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Belum ada proposal vendor</p>
                        </div>
                    )}
                </div>
            )}

            {/* TAB: WORKFLOW */}
            {activeTab === 'WORKFLOW' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-[63px] top-12 bottom-12 w-[2px] bg-gray-100"></div>

                        <div className="space-y-10 relative z-10">
                            {/* Step 1: Created */}
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
                                    <Plus size={20} strokeWidth={3} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Asset Registered</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">Created by Ibnu Faisal on 12 Jan 2024</p>
                                </div>
                            </div>

                            {/* Step 2: Approval Status */}
                            <div className="flex gap-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                                    form.approvalStatus === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                                    form.approvalStatus === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                                    'bg-orange-500 text-white shadow-orange-200'
                                }`}>
                                    {form.approvalStatus === 'Approved' ? <CheckCircle2 size={20} /> : 
                                     form.approvalStatus === 'Rejected' ? <AlertCircle size={20} /> : <Clock size={20} />}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Status: {form.approvalStatus}</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {form.approvalStatus === 'Approved' ? 'Approved by Manager on 13 Jan 2024' : 'Currently pending review'}
                                    </p>
                                </div>
                            </div>

                            {/* Step 3: Latest Activity */}
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 border-4 border-white">
                                    <GitBranch size={20} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-tight">Maintenance Scheduled</h4>
                                    <p className="text-[11px] text-gray-300 mt-1">Next schedule: 20 Mar 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: DOKUMEN */}
            {activeTab === 'DOKUMEN' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Upload Area */}
                        {!isView && (
                            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:border-black hover:bg-gray-50 transition-all cursor-pointer group h-64">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
                                    <UploadCloud size={24} />
                                </div>
                                <p className="text-[11px] font-black text-black uppercase tracking-widest mb-2">Upload Dokumen</p>
                                <p className="text-[10px] text-gray-400 text-center">Manual Book, Kartu Garansi, atau Foto Fisik Aset</p>
                            </div>
                        )}

                        {/* Document List Mock */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center h-64 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all">
                                <FileCheck size={100} />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-black uppercase">Manual Book.pdf</h4>
                                    <p className="text-[10px] text-gray-400">2.4 MB • Uploaded 12 Jan 2024</p>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                <Download size={14} /> Download
                            </button>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center h-64 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all">
                                <FileCheck size={100} />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-black uppercase">Warranty Card.jpg</h4>
                                    <p className="text-[10px] text-gray-400">1.1 MB • Uploaded 12 Jan 2024</p>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                <Download size={14} /> Download
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Aset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
