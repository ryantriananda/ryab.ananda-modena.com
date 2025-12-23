
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Car, Shield, FileText, Briefcase, MapPin, DollarSign, UploadCloud, Trash2, Calendar, User, Info } from 'lucide-react';
import { VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VehicleRecord>) => void;
  initialData?: VehicleRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const VehicleModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<VehicleRecord>>({
    status: 'Aktif',
    ownership: 'Milik Modena',
    channel: 'Human Capital Operation',
    cabang: 'Pusat'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        // Assuming there might be an image property in future, or use a dummy for initialData
      } else {
        setForm({ 
            status: 'Aktif', 
            ownership: 'Milik Modena', 
            channel: 'Human Capital Operation', 
            cabang: 'Pusat'
        });
        setImagePreview(null);
      }
    }
  }, [isOpen, initialData]);

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
        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-200 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  const SelectField = ({ label, value, field, options, className = "", required = false }: any) => (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <div className="relative">
        <select 
            disabled={isView}
            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm transition-all cursor-pointer"
            value={value || ''}
            onChange={(e) => setForm({...form, [field]: e.target.value})}
        >
            <option value="">(Pilih Opsi)</option>
            {options.map((opt: any) => (
                <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
            ))}
        </select>
        {!isView && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 overflow-hidden">
      <div className="bg-[#FBFBFB] w-full max-w-[1300px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-black rounded-2xl shadow-xl shadow-black/20 text-white">
                <Car size={22} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                   {mode === 'edit' ? 'Perbarui Data Aset' : mode === 'view' ? 'Rincian Aset Kendaraan' : 'Input Data Aset Kendaraan'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Vehicle Asset & Database Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body - Grid Layout 2 Columns */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column */}
            <div className="space-y-12">
              
              {/* Card 1: ASSET SETUP */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-5"></div>
                <SectionHeader title="ASSET SETUP" sub="General Asset Information" />
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <Label required>Flagging Kepemilikan</Label>
                    <div className="flex gap-4">
                        {['Milik Modena', 'Sewa'].map(type => {
                            const isSelected = form.ownership === type;
                            return (
                                <button
                                    key={type}
                                    onClick={() => !isView && setForm({...form, ownership: type as any})}
                                    disabled={isView}
                                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border transition-all 
                                        ${isSelected 
                                            ? 'bg-black text-white border-black shadow-lg scale-[1.02]' 
                                            : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                  </div>
                  <InputField label="No. Polisi" value={form.noPolisi} field="noPolisi" required placeholder="B 1234 ABC" />
                  <InputField label="Deskripsi Unit" value={form.nama} field="nama" placeholder="Toyota Avanza 1.3 CVT..." required />
                </div>
              </div>

              {/* Card 2: VEHICLE SPECIFICATION */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader title="VEHICLE SPECIFICATION" sub="Core Unit Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Merek" value={form.merek} field="merek" placeholder="TOYOTA" />
                  <InputField label="Tipe Kendaraan" value={form.tipeKendaraan} field="tipeKendaraan" placeholder="AVANZA" />
                  
                  <InputField label="Model" value={form.model} field="model" placeholder="A/T" />
                  <InputField label="Tahun Pembuatan" value={form.tahunPembuatan} field="tahunPembuatan" placeholder="2022" />
                  
                  <InputField label="Warna" value={form.warna} field="warna" placeholder="Putih" />
                  <InputField label="Isi Silinder" value={form.isiSilinder} field="isiSilinder" placeholder="1329 CC" />
                  
                  <InputField label="No. Rangka" value={form.noRangka} field="noRangka" placeholder="Input nomor rangka..." />
                  <InputField label="No. Mesin" value={form.noMesin} field="noMesin" placeholder="Input nomor mesin..." />
                </div>
              </div>

              {/* Card 3: ALLOCATION & USAGE */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader title="ALLOCATION & USAGE" sub="Assigned Dept & User" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField label="Channel" value={form.channel} field="channel" options={['Human Capital Operation', 'Management', 'Traditional', 'Direct']} required />
                  <SelectField label="Dept / Cabang" value={form.cabang} field="cabang" options={['Pusat', 'Jakarta', 'Surabaya', 'Medan']} required />
                  <InputField label="Pengguna Utama" value={form.pengguna} field="pengguna" placeholder="Full Name" className="md:col-span-2" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              
              {/* Card 4: LEGAL DOCUMENTS */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader title="LEGAL DOCUMENTS" sub="Validity & Numbers" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="No. BPKB" value={form.noBpkb} field="noBpkb" placeholder="S-03714594" className="md:col-span-2" />
                  <InputField label="BPKB Remarks" value={form.keteranganBpkb} field="keteranganBpkb" className="md:col-span-2" placeholder="Masukan catatan BPKB..." />
                  
                  <InputField label="Masa Berlaku STNK (1Y)" value={form.masaBerlaku1} field="masaBerlaku1" type="date" />
                  <InputField label="Masa Berlaku STNK (5Y)" value={form.masaBerlaku5} field="masaBerlaku5" type="date" />
                  <InputField label="Masa Berlaku KIR" value={form.masaBerlakuKir} field="masaBerlakuKir" type="date" className="md:col-span-2" />
                </div>
              </div>

              {/* Card 5: PURCHASE & INSURANCE */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader title="PURCHASE & INSURANCE" sub="Financial Tracking" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Tgl Beli / Serah Terima" value={form.tglBeli} field="tglBeli" type="date" />
                  <div className="relative">
                    <Label>Harga Beli (IDR)</Label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">RP</span>
                       <input 
                         type="number" 
                         className="w-full bg-white border border-gray-100 rounded-2xl pl-10 pr-6 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm transition-all"
                         value={form.hargaBeli || ''}
                         onChange={(e) => setForm({...form, hargaBeli: e.target.value})}
                         disabled={isView}
                         placeholder="0"
                       />
                    </div>
                  </div>
                  <InputField label="No Polis Asuransi" value={form.noPolisAsuransi} field="noPolisAsuransi" className="md:col-span-2" placeholder="Input nomor polis..." />
                  <InputField label="Jangka Pertanggungan" value={form.jangkaPertanggungan} field="jangkaPertanggungan" type="date" className="md:col-span-2" />
                </div>
              </div>

              {/* Card 6: VEHICLE MEDIA */}
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader title="VEHICLE MEDIA" sub="Visual Attachment" />
                <div 
                    onClick={() => !isView && fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-[1.5rem] h-56 flex flex-col items-center justify-center transition-all overflow-hidden bg-white
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
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all mb-4 bg-white`}>
                              <UploadCloud size={24} className="text-gray-300" />
                          </div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-6 leading-relaxed">
                              Klik atau seret file gambar kendaraan ke sini
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
        </div>

        {/* Global Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all bg-gray-50 rounded-2xl active:scale-95">Batal</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="bg-black text-white px-20 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-4">
              <Save size={18} strokeWidth={2.5} /> Simpan Data Aset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
