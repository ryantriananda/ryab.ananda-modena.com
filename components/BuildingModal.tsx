
// @google/genai Coding Guidelines: This file uses icons from lucide-react.
// Non-existent 'Tooltip' import is removed as it's not exported by lucide-react.

import React, { useState, useEffect } from 'react';
import { 
    X, Building, Settings, MapPin, 
    Layers, Clock, Save, 
    Activity, ShieldCheck, Calendar, Info, 
    Hash, Zap, Thermometer, Wind, Monitor, Trash2, Plus, UploadCloud, ChevronRight, CheckCircle2,
    FileText, Handshake, DollarSign, UserCheck
} from 'lucide-react';
import { BuildingAssetRecord, MaintenanceSchedule, MaintenanceProposal, CooperationDetail } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingAssetRecord>) => void;
  initialData?: BuildingAssetRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('Informasi Umum');
  const [form, setForm] = useState<Partial<BuildingAssetRecord>>({
    assetType: 'AC',
    maintenanceFrequency: 'Quarterly',
    status: 'Good',
    ownership: 'Own',
    buildingName: 'Head Office Satrio',
    schedules: [],
    proposals: [],
    cooperation: {
        activeVendor: '',
        contractStartDate: '',
        contractEndDate: '',
        serviceLevelAgreement: '',
        monthlyMaintenanceFee: ''
    }
  });

  const tabs = ['Informasi Umum', 'Jadwal Pemeliharaan', 'Riwayat Servis', 'Proposal & Kerja Sama', 'Dokumen Teknik'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ 
            assetType: 'AC', maintenanceFrequency: 'Quarterly', status: 'Good', ownership: 'Own',
            buildingName: 'Head Office Satrio', floor: 'Lantai 1',
            schedules: [],
            proposals: [],
            cooperation: {
                activeVendor: '',
                contractStartDate: '',
                contractEndDate: '',
                serviceLevelAgreement: '',
                monthlyMaintenanceFee: ''
            }
        });
      }
      setActiveTab('Informasi Umum');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

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

  const addScheduleRow = () => {
    const newSchedule: MaintenanceSchedule = {
        id: Date.now().toString(),
        taskName: '',
        plannedDate: '',
        technician: '',
        status: 'Scheduled'
    };
    setForm(prev => ({ ...prev, schedules: [...(prev.schedules || []), newSchedule] }));
  };

  const removeScheduleRow = (id: string) => {
    setForm(prev => ({ ...prev, schedules: (prev.schedules || []).filter(s => s.id !== id) }));
  };

  const updateScheduleField = (id: string, field: keyof MaintenanceSchedule, value: string) => {
    setForm(prev => ({
        ...prev,
        schedules: (prev.schedules || []).map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const addProposalRow = () => {
    const newProposal: MaintenanceProposal = {
        id: `PRP-${Date.now()}`,
        vendorName: '',
        proposalName: '',
        submissionDate: new Date().toISOString().split('T')[0],
        estimatedCost: '0',
        status: 'Pending'
    };
    setForm(prev => ({ ...prev, proposals: [...(prev.proposals || []), newProposal] }));
  };

  const updateProposalField = (id: string, field: keyof MaintenanceProposal, value: string) => {
    setForm(prev => ({
        ...prev,
        proposals: (prev.proposals || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removeProposalRow = (id: string) => {
    setForm(prev => ({ ...prev, proposals: (prev.proposals || []).filter(p => p.id !== id) }));
  };

  const assetTypes = [
    { label: 'AC (Air Conditioner)', value: 'AC', icon: <Wind size={14}/> },
    { label: 'APAR / Fire Safety', value: 'APAR', icon: <ShieldCheck size={14}/> },
    { label: 'CCTV / Security', value: 'CCTV', icon: <Monitor size={14}/> },
    { label: 'Genset / Listrik', value: 'Genset', icon: <Zap size={14}/> },
    { label: 'Lift / Eskalator', value: 'Lift', icon: <Layers size={14}/> },
    { label: 'Pompa Air', value: 'Pompa', icon: <Activity size={14}/> },
    { label: 'Fire Alarm System', value: 'Fire Alarm', icon: <Info size={14}/> },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-[1250px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-black rounded-2xl shadow-xl shadow-black/20 text-white">
                <Settings size={22} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">Manajemen Aset Fasilitas Gedung</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Non-Vehicle Asset Control & Monitoring</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 overflow-x-auto no-scrollbar gap-2">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
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
               
               {/* Section 1: Technical Spec */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <SectionHeader icon={Hash} title="1. Spesifikasi Teknis" sub="Asset Identification & Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                     <div className="md:col-span-2">
                        <Label required>Jenis Aset Gedung</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {assetTypes.map(type => (
                                <button
                                    key={type.value}
                                    onClick={() => !isView && setForm({...form, assetType: type.value})}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border text-[11px] font-black uppercase tracking-tighter transition-all
                                        ${form.assetType === type.value 
                                            ? 'bg-black text-white border-black shadow-lg scale-[1.02]' 
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}
                                    disabled={isView}
                                >
                                    {type.icon} {type.value}
                                </button>
                            ))}
                        </div>
                     </div>
                     <div>
                        <Label required>Nama Aset / Unit</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm transition-all bg-gray-50 focus:bg-white" value={form.assetName} onChange={e => setForm({...form, assetName: e.target.value})} placeholder="Contoh: AC SPLIT MEC 1..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Kode Aset (Internal)</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-mono font-bold text-gray-400 bg-gray-50/50" value={form.assetCode || '[Otomatis]'} disabled />
                     </div>
                     <div>
                        <Label>Merk / Brand</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} placeholder="Contoh: Panasonic, Daikin..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Model / Seri</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50" value={form.modelNumber} onChange={e => setForm({...form, modelNumber: e.target.value})} placeholder="Contoh: CS-PU9XKP..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Serial Number (S/N)</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-mono font-black text-black focus:border-black outline-none bg-gray-50" value={form.serialNumber} onChange={e => setForm({...form, serialNumber: e.target.value})} placeholder="Masukan nomor seri pabrik..." disabled={isView} />
                     </div>
                     <div>
                        <Label>Kapasitas / Rating</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} placeholder="Contoh: 1.5 PK, 500 KVA..." disabled={isView} />
                     </div>
                  </div>
               </div>

               {/* Section 2: Penempatan */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                  <SectionHeader icon={MapPin} title="2. Lokasi & Penempatan" sub="Physical Installation Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                     <div>
                        <Label required>Nama Gedung / Cabang</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none cursor-pointer" value={form.buildingName} onChange={e => setForm({...form, buildingName: e.target.value})} disabled={isView}>
                            <option value="Head Office Satrio">Head Office Satrio</option>
                            <option value="Warehouse Cakung">Warehouse Cakung</option>
                            <option value="MEC Kemang">MEC Kemang</option>
                        </select>
                     </div>
                     <div>
                        <Label required>Lantai / Area</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none cursor-pointer" value={form.floor} onChange={e => setForm({...form, floor: e.target.value})} disabled={isView}>
                            <option value="Basement">Basement</option>
                            <option value="Lantai 1">Lantai 1</option>
                            <option value="Lantai 2">Lantai 2</option>
                            <option value="Lantai 3">Lantai 3</option>
                            <option value="Roof Top">Roof Top</option>
                        </select>
                     </div>
                     <div className="md:col-span-2">
                        <Label>Detail Ruangan / Posisi Spesifik</Label>
                        <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 shadow-sm" value={form.roomName} onChange={e => setForm({...form, roomName: e.target.value})} placeholder="Contoh: Meeting Room GA Lt. 2..." disabled={isView} />
                     </div>
                  </div>
               </div>

               {/* Section 3: Maintenance & Health */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                  <SectionHeader icon={Clock} title="3. Parameter Pemeliharaan" sub="Maintenance Cycles & Current State" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                        <Label required>Frekuensi Maintenance</Label>
                        <select className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 appearance-none" value={form.maintenanceFrequency} onChange={e => setForm({...form, maintenanceFrequency: e.target.value as any})} disabled={isView}>
                            <option value="Monthly">Bulanan (Monthly)</option>
                            <option value="Quarterly">3 Bulanan (Quarterly)</option>
                            <option value="Yearly">Tahunan (Yearly)</option>
                            <option value="None">Insidental</option>
                        </select>
                    </div>
                    <div>
                        <Label>Status Kondisi Aset</Label>
                        <div className="flex gap-4">
                            {[
                                { label: 'Baik', value: 'Good', color: 'bg-green-500' },
                                { label: 'Rusak Ringan', value: 'Fair', color: 'bg-orange-500' },
                                { label: 'Rusak Berat', value: 'Critical', color: 'bg-red-500' }
                            ].map(st => (
                                <button
                                    key={st.value}
                                    onClick={() => !isView && setForm({...form, status: st.value as any})}
                                    className={`flex-1 py-4 px-2 rounded-2xl border text-[10px] font-black uppercase transition-all
                                        ${form.status === st.value 
                                            ? 'bg-black text-white border-black shadow-lg' 
                                            : 'bg-white text-gray-400 border-gray-100'}`}
                                    disabled={isView}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${st.color}`}></div>
                                        {st.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Tgl Pemeliharaan Terakhir</Label>
                        <input type="date" className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50 shadow-sm" value={form.lastMaintenanceDate} onChange={e => setForm({...form, lastMaintenanceDate: e.target.value})} disabled={isView} />
                    </div>
                    <div>
                        <Label>Tgl Rencana Berikutnya</Label>
                        <input type="date" className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-blue-600 focus:border-black outline-none bg-gray-50 shadow-sm" value={form.nextMaintenanceDate} onChange={e => setForm({...form, nextMaintenanceDate: e.target.value})} disabled={isView} />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Jadwal Pemeliharaan' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
                 <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <SectionHeader icon={Calendar} title="Agenda Pemeliharaan Manual" sub="Manual Schedule Entry & Tracking" />
                        {!isView && (
                            <button 
                                onClick={addScheduleRow}
                                className="bg-black text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
                            >
                                <Plus size={16} strokeWidth={3} /> Tambah Agenda
                            </button>
                        )}
                    </div>

                    <div className="overflow-hidden border border-gray-100 rounded-[2rem]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="p-6 w-14 text-center">#</th>
                                    <th className="p-6">Agenda / Tugas</th>
                                    <th className="p-6 w-56">Tgl Rencana</th>
                                    <th className="p-6 w-56">Teknisi / PIC</th>
                                    <th className="p-6 w-44 text-center">Status</th>
                                    {!isView && <th className="p-6 w-14 text-center"></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(form.schedules || []).map((sch, idx) => (
                                    <tr key={sch.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-6 text-center font-black text-gray-300 text-[12px]">{idx + 1}</td>
                                        <td className="p-6">
                                            <input 
                                                className="w-full bg-transparent border-none p-0 text-[13px] font-black text-black focus:ring-0 placeholder:text-gray-200" 
                                                value={sch.taskName}
                                                onChange={e => updateScheduleField(sch.id, 'taskName', e.target.value)}
                                                placeholder="Contoh: Cuci Kondensor AC..."
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6">
                                            <input 
                                                type="date"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-gray-600 focus:ring-0" 
                                                value={sch.plannedDate}
                                                onChange={e => updateScheduleField(sch.id, 'plannedDate', e.target.value)}
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6">
                                            <input 
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-gray-600 focus:ring-0 placeholder:text-gray-200" 
                                                value={sch.technician}
                                                onChange={e => updateScheduleField(sch.id, 'technician', e.target.value)}
                                                placeholder="Nama Vendor / Internal..."
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6">
                                            <select 
                                                className={`w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest text-center focus:ring-0 cursor-pointer
                                                    ${sch.status === 'Completed' ? 'text-green-500' : sch.status === 'Missed' ? 'text-red-500' : 'text-blue-500'}`}
                                                value={sch.status}
                                                onChange={e => updateScheduleField(sch.id, 'status', e.target.value as any)}
                                                disabled={isView}
                                            >
                                                <option value="Scheduled">Scheduled</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Missed">Missed</option>
                                            </select>
                                        </td>
                                        {!isView && (
                                            <td className="p-6 text-center">
                                                <button 
                                                    onClick={() => removeScheduleRow(sch.id)}
                                                    className="text-gray-200 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {(form.schedules || []).length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center">
                                            <div className="flex flex-col items-center opacity-30">
                                                <Calendar size={40} className="text-gray-400 mb-4" />
                                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Belum ada agenda terdaftar</p>
                                                {!isView && <p className="text-[9px] font-bold mt-2 text-gray-400 uppercase tracking-widest">Klik "Tambah Agenda" untuk membuat jadwal manual</p>}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
          )}

          {activeTab === 'Riwayat Servis' && (
             <div className="max-w-5xl mx-auto space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h4 className="text-[14px] font-black text-black uppercase">Service Log Table</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Audit trail pemeliharaan unit</p>
                    </div>
                    {!isView && (
                        <button className="bg-black text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all">
                            <Plus size={16} /> Catat Servis Baru
                        </button>
                    )}
                </div>
                {/* Empty State Table */}
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="p-6">Tgl Servis</th>
                                <th className="p-6">Teknisi / Vendor</th>
                                <th className="p-6">Deskripsi Pekerjaan</th>
                                <th className="p-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-black text-[11px] uppercase tracking-widest">Belum ada riwayat perbaikan tercatat</td></tr>
                        </tbody>
                    </table>
                </div>
             </div>
          )}

          {activeTab === 'Proposal & Kerja Sama' && (
            <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
                
                {/* Cooperation Section */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                    <SectionHeader icon={Handshake} title="Detail Kerja Sama Aktif" sub="Active Vendor & Contract" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="md:col-span-2">
                            <Label>Vendor Pemeliharaan Aktif</Label>
                            <input 
                                className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black focus:border-black outline-none bg-gray-50" 
                                value={form.cooperation?.activeVendor} 
                                onChange={e => setForm({...form, cooperation: {...form.cooperation, activeVendor: e.target.value}})}
                                placeholder="Contoh: PT Servis AC Jaya Utama" 
                                disabled={isView} 
                            />
                        </div>
                        <div>
                            <Label>Tgl Mulai Kontrak</Label>
                            <input type="date" className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none bg-gray-50" value={form.cooperation?.contractStartDate} onChange={e => setForm({...form, cooperation: {...form.cooperation, contractStartDate: e.target.value}})} disabled={isView} />
                        </div>
                        <div>
                            <Label>Tgl Berakhir Kontrak</Label>
                            <input type="date" className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none bg-gray-50" value={form.cooperation?.contractEndDate} onChange={e => setForm({...form, cooperation: {...form.cooperation, contractEndDate: e.target.value}})} disabled={isView} />
                        </div>
                        <div>
                            <Label>Biaya Bulanan (Avg)</Label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-300">RP</span>
                                <input className="w-full border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-[13px] font-black text-black outline-none bg-gray-50" value={form.cooperation?.monthlyMaintenanceFee} onChange={e => setForm({...form, cooperation: {...form.cooperation, monthlyMaintenanceFee: e.target.value}})} placeholder="0" disabled={isView} />
                            </div>
                        </div>
                        <div>
                            <Label>SLA / Respons Time</Label>
                            <input className="w-full border border-gray-100 rounded-2xl px-6 py-4 text-[13px] font-black text-black outline-none bg-gray-50" value={form.cooperation?.serviceLevelAgreement} onChange={e => setForm({...form, cooperation: {...form.cooperation, serviceLevelAgreement: e.target.value}})} placeholder="Contoh: 1x24 Jam" disabled={isView} />
                        </div>
                    </div>
                </div>

                {/* Proposals Section */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <SectionHeader icon={FileText} title="Log Proposal Penawaran" sub="Maintenance & Upgrade Proposals" />
                        {!isView && (
                            <button 
                                onClick={addProposalRow}
                                className="bg-black text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
                            >
                                <Plus size={16} strokeWidth={3} /> Tambah Proposal
                            </button>
                        )}
                    </div>

                    <div className="overflow-hidden border border-gray-100 rounded-[2rem]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="p-6">Vendor & Judul</th>
                                    <th className="p-6 w-40">Tgl Kirim</th>
                                    <th className="p-6 w-44 text-right">Nilai Estimasi</th>
                                    <th className="p-6 w-44 text-center">Status</th>
                                    {!isView && <th className="p-6 w-14"></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(form.proposals || []).map((prop) => (
                                    <tr key={prop.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-6">
                                            <input 
                                                className="w-full bg-transparent border-none p-0 text-[13px] font-black text-black focus:ring-0" 
                                                value={prop.vendorName}
                                                onChange={e => updateProposalField(prop.id, 'vendorName', e.target.value)}
                                                placeholder="Nama Vendor..."
                                                disabled={isView}
                                            />
                                            <input 
                                                className="w-full bg-transparent border-none p-0 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1 focus:ring-0" 
                                                value={prop.proposalName}
                                                onChange={e => updateProposalField(prop.id, 'proposalName', e.target.value)}
                                                placeholder="Nama Project / Penawaran..."
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6">
                                            <input 
                                                type="date"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-gray-600 focus:ring-0" 
                                                value={prop.submissionDate}
                                                onChange={e => updateProposalField(prop.id, 'submissionDate', e.target.value)}
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6 text-right">
                                            <input 
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-black text-right focus:ring-0" 
                                                value={prop.estimatedCost}
                                                onChange={e => updateProposalField(prop.id, 'estimatedCost', e.target.value)}
                                                disabled={isView}
                                            />
                                        </td>
                                        <td className="p-6">
                                            <select 
                                                className={`w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest text-center focus:ring-0 cursor-pointer
                                                    ${prop.status === 'Approved' ? 'text-green-500' : prop.status === 'Rejected' ? 'text-red-500' : 'text-blue-500'}`}
                                                value={prop.status}
                                                onChange={e => updateProposalField(prop.id, 'status', e.target.value as any)}
                                                disabled={isView}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewing">Reviewing</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        {!isView && (
                                            <td className="p-6 text-center">
                                                <button onClick={() => removeProposalRow(prop.id)} className="text-gray-200 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {(form.proposals || []).length === 0 && (
                                    <tr><td colSpan={5} className="p-20 text-center text-gray-300 font-black text-[11px] uppercase tracking-widest italic opacity-30">Belum ada proposal masuk</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'Dokumen Teknik' && (
            <div className="max-w-5xl mx-auto py-12 space-y-10 animate-in zoom-in-95 duration-500">
                <SectionHeader icon={ShieldCheck} title="Berkas Pendukung" sub="Technical Manuals & Warranty" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-200 rounded-[3rem] bg-white group hover:border-black transition-all cursor-pointer">
                        <UploadCloud size={40} className="text-gray-300 group-hover:text-black mb-4 transition-colors" />
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Unggah Buku Manual / Kartu Garansi</p>
                        <p className="text-[9px] font-bold text-gray-300 mt-3 uppercase tracking-widest italic">PDF atau JPG (Max 10MB)</p>
                    </div>
                    <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col justify-center">
                         <div className="space-y-4">
                            <div className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300"><Settings size={18}/></div>
                                <div>
                                    <div className="text-[11px] font-black text-black">TECHNICAL_SPEC.PDF</div>
                                    <div className="text-[9px] font-bold text-gray-400 uppercase">Uploaded by Admin</div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Global Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all bg-gray-50 rounded-2xl hover:bg-gray-100 active:scale-95">Batal</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="bg-black text-white px-20 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-4">
              <Save size={18} strokeWidth={2.5} /> Simpan Data Aset Gedung
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
