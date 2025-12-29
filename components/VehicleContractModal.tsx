
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Car, FileText, UploadCloud, Trash2, CheckCircle2, Clock, GitBranch } from 'lucide-react';
import { VehicleContractRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VehicleContractRecord>) => void;
  initialData?: VehicleContractRecord | null;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const VehicleContractModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  mode = 'create', 
  vehicleList = [] 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<VehicleContractRecord>>({
    status: 'Aktif',
    biayaSewa: '0',
    channel: 'Human Capital Operation',
    cabang: 'Pusat',
    ownership: 'Sewa',
    approvalStatus: 'Pending'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setImagePreview(initialData.attachmentUrl || null);
      } else {
        setForm({ 
            status: 'Aktif', 
            biayaSewa: '0', 
            channel: 'Human Capital Operation', 
            cabang: 'Pusat',
            ownership: 'Sewa',
            tglMulai: new Date().toISOString().split('T')[0],
            approvalStatus: 'Pending'
        });
        setImagePreview(null);
      }
      setActiveTab('DETAILS');
    }
  }, [isOpen, initialData]);

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedNoPol = e.target.value;
      const vehicle = vehicleList.find(v => v.noPolisi === selectedNoPol);
      
      if (vehicle) {
          setForm(prev => ({
              ...prev,
              noPolisi: vehicle.noPolisi,
              aset: vehicle.nama,
              merek: vehicle.merek,
              tipeKendaraan: vehicle.tipeKendaraan,
              model: vehicle.model,
              tahunPembuatan: vehicle.tahunPembuatan,
              warna: vehicle.warna,
              isiSilinder: vehicle.isiSilinder,
              channel: vehicle.channel,
              cabang: vehicle.cabang
          }));
      } else {
          setForm(prev => ({ ...prev, noPolisi: selectedNoPol, aset: '' }));
      }
  };

  if (!isOpen) return null;

  const isView = mode === 'view';

  const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-1.5 h-6 bg-black rounded-full shadow-sm"></div>
      <div>
          <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">{title}</h3>
          {sub && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1.5 tracking-widest">{sub}</p>}
      </div>
    </div>
  );

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", className = "", required = false }: any) => (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className={`w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-200 shadow-sm ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  const tabs = ['DETAILS', 'WORKFLOW'];

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 overflow-hidden">
      <div className="bg-[#FBFBFB] w-full max-w-[1300px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-black rounded-2xl shadow-xl shadow-black/20 text-white">
                <FileText size={22} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                   {mode === 'edit' ? 'Perbarui Kontrak' : mode === 'view' ? 'Rincian Kontrak' : 'Input Kontrak Baru'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Vehicle Lease Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[3px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
          {activeTab === 'DETAILS' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-12">
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-5"></div>
                    <SectionHeader title="CONTRACT SETUP" sub="General Contract Information" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="No. Kontrak" value={form.noKontrak} field="noKontrak" required placeholder="KTR/MDC/2024/001" className="md:col-span-2" />
                    <InputField label="Vendor / Lessor" value={form.vendor} field="vendor" required placeholder="PT. TRAC ASTRA / MPMRent" className="md:col-span-2" />
                    <InputField label="Tanggal Mulai" value={form.tglMulai} field="tglMulai" type="date" required />
                    <InputField label="Tanggal Berakhir" value={form.tglBerakhir} field="tglBerakhir" type="date" required />
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                    <SectionHeader title="VEHICLE SPECIFICATION" sub="Core Unit Details (Auto-Filled)" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                        <Label required>Pilih Unit Kendaraan</Label>
                        <div className="relative">
                            <select 
                                disabled={isView || mode === 'edit'}
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm transition-all cursor-pointer"
                                value={form.noPolisi || ''}
                                onChange={handleVehicleChange}
                            >
                                <option value="">-- Pilih Kendaraan dari Master Data --</option>
                                {vehicleList.map((v) => (
                                    <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama}</option>
                                ))}
                            </select>
                            {!isView && mode !== 'edit' && (
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                                    <Car size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                    <InputField label="Deskripsi Unit" value={form.aset} field="aset" disabled={true} />
                    <InputField label="Merek" value={form.merek} field="merek" disabled={true} />
                    </div>
                </div>
                </div>

                <div className="space-y-12">
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                    <SectionHeader title="ALLOCATION & COST" sub="Assigned Dept & Financials" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Channel" value={form.channel} field="channel" disabled={true} />
                    <InputField label="Dept / Cabang" value={form.cabang} field="cabang" disabled={true} />
                    <InputField label="Pengguna Utama" value={form.penggunaUtama} field="penggunaUtama" placeholder="Nama User" className="md:col-span-2" />
                    
                    <div className="relative md:col-span-2">
                        <Label required>Biaya Sewa (IDR / Bulan)</Label>
                        <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">RP</span>
                        <input 
                            type="number" 
                            className="w-full bg-white border border-gray-100 rounded-2xl pl-10 pr-6 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm transition-all"
                            value={form.biayaSewa || ''}
                            onChange={(e) => setForm({...form, biayaSewa: e.target.value})}
                            disabled={isView}
                            placeholder="0"
                        />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                    <SectionHeader title="CONTRACT ATTACHMENT" sub="Digital Copy" />
                    <div 
                        onClick={() => !isView && fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-[1.5rem] h-40 flex flex-col items-center justify-center transition-all overflow-hidden bg-white
                        ${imagePreview ? 'border-gray-200' : 'border-gray-100 hover:border-black hover:bg-gray-50/50'}
                        ${!isView ? 'cursor-pointer' : 'cursor-default'}
                        `}
                    >
                        {imagePreview ? (
                        <div className="relative w-full h-full group">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                            {!isView && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                                    className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                        ) : (
                        <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all mb-3 bg-white`}>
                                <UploadCloud size={20} className="text-gray-300" />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-6 leading-relaxed">
                                Upload Dokumen Kontrak (PDF/IMG)
                            </p>
                        </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setImagePreview(ev.target?.result as string);
                                reader.readAsDataURL(file);
                            }
                        }} />
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
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
                                    <FileText size={20} strokeWidth={3} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Contract Drafted</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">Submitted on {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                                    form.approvalStatus === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                                    form.approvalStatus === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                                    'bg-orange-500 text-white shadow-orange-200'
                                }`}>
                                    {form.approvalStatus === 'Approved' ? <CheckCircle2 size={20} /> : 
                                     form.approvalStatus === 'Rejected' ? <X size={20} /> : <Clock size={20} />}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Approval Status: {form.approvalStatus}</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {form.approvalStatus === 'Approved' ? 'Contract Approved' : 'Waiting for approval'}
                                    </p>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
          )}
        </div>

        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all bg-gray-50 rounded-2xl active:scale-95">Batal</button>
          {!isView && (
            <button onClick={() => onSave({...form, attachmentUrl: imagePreview || undefined})} className="bg-black text-white px-20 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-4">
              <Save size={18} strokeWidth={2.5} /> Simpan Kontrak
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
