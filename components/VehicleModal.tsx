
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Image as ImageIcon, Trash2, UploadCloud, Car, Shield, FileText, Briefcase, Navigation, DollarSign } from 'lucide-react';
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
  const [isDragging, setIsDragging] = useState(false);
  
  const [form, setForm] = useState<Partial<VehicleRecord>>({
    status: 'Aktif',
    channel: 'Human Capital Operation',
    cabang: 'Pusat'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({ status: 'Aktif', channel: 'Human Capital Operation', cabang: 'Pusat' });
      setImagePreview(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isView) setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isView && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const SectionHeader = ({ icon: Icon, title, sub }: { icon: any, title: string, sub?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-1 h-6 bg-black rounded-full shadow-sm"></div>
      <div>
          <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em] leading-none">{title}</h3>
          {sub && <p className="text-[8px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{sub}</p>}
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
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4 overflow-hidden animate-in fade-in duration-300">
      <div className="bg-[#FBFBFB] w-full max-w-[1200px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-black rounded-2xl shadow-xl shadow-black/20 text-white">
                <Car size={22} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                   {mode === 'edit' ? 'Update Vehicle Asset' : mode === 'view' ? 'Vehicle Asset Profile' : 'New Vehicle Database Entry'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Corporate Fleet Management System</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader icon={Shield} title="Vehicle Specification" sub="Core Unit Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="No. Registrasi" value={form.noRegistrasi} field="noRegistrasi" disabled={true} placeholder="Auto-Generated" className="md:col-span-1" />
                  <InputField label="No. Polisi" value={form.noPolisi} field="noPolisi" placeholder="B 1708 CZY" required />
                  <InputField label="Description" value={form.nama} field="nama" placeholder="Toyota Avanza 1.3 CVT..." className="md:col-span-2" required />
                  
                  <InputField label="Merek" value={form.merek} field="merek" placeholder="TOYOTA" />
                  <InputField label="Tipe Kendaraan" value={form.tipeKendaraan} field="tipeKendaraan" placeholder="AVANZA" />
                  
                  <InputField label="Model" value={form.model} field="model" placeholder="A/T" />
                  <InputField label="Tahun Pembuatan" value={form.tahunPembuatan} field="tahunPembuatan" placeholder="2022" />
                  
                  <InputField label="Warna" value={form.warna} field="warna" placeholder="Putih" />
                  <InputField label="Isi Silinder" value={form.isiSilinder} field="isiSilinder" placeholder="1329 CC" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader icon={Briefcase} title="Allocation & Usage" sub="Assigned Dept & User" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField label="Channel" value={form.channel} field="channel" options={['Human Capital Operation', 'Management', 'Traditional', 'HR', 'HCO']} required />
                  <SelectField label="Dept / Cabang" value={form.cabang} field="cabang" options={['Pusat', 'Purwokerto', 'Pekanbaru', 'Palembang', 'Medan', 'Manado', 'Malang', 'Kediri']} required />
                  <InputField label="Pengguna Utama" value={form.pengguna} field="pengguna" placeholder="Full Name" className="md:col-span-2" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader icon={FileText} title="Legal Documents" sub="Validity & Numbers" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="No. BPKB" value={form.noBpkb} field="noBpkb" placeholder="S-03714594" className="md:col-span-2" />
                  <InputField label="BPKB Remarks" value={form.keteranganBpkb} field="keteranganBpkb" className="md:col-span-2" />
                  
                  <InputField label="Masa Berlaku (1Y)" value={form.masaBerlaku1} field="masaBerlaku1" type="date" />
                  <InputField label="Masa Berlaku (5Y)" value={form.masaBerlaku5} field="masaBerlaku5" type="date" />
                  <InputField label="Masa Berlaku KIR" value={form.masaBerlakuKir} field="masaBerlakuKir" type="date" className="md:col-span-2" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader icon={DollarSign} title="Purchase & Insurance" sub="Financial Tracking" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Tgl Beli" value={form.tglBeli} field="tglBeli" type="date" />
                  <div className="relative">
                    <Label required>Harga Beli (IDR)</Label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">RP</span>
                       <input 
                         type="number" 
                         className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-6 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm transition-all"
                         value={form.hargaBeli || ''}
                         onChange={(e) => setForm({...form, hargaBeli: e.target.value})}
                         disabled={isView}
                         placeholder="0"
                       />
                    </div>
                  </div>
                  <InputField label="No Polis Asuransi" value={form.noPolisAsuransi} field="noPolisAsuransi" className="md:col-span-2" />
                  <InputField label="Jangka Pertanggungan" value={form.jangkaPertanggungan} field="jangkaPertanggungan" type="date" className="md:col-span-2" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                <SectionHeader icon={UploadCloud} title="Vehicle Media" sub="Visual Attachment" />
                <div 
                    onClick={() => !isView && fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`relative border-2 border-dashed rounded-[1.5rem] h-56 flex flex-col items-center justify-center transition-all overflow-hidden bg-white
                      ${imagePreview ? 'border-gray-200' : 'border-gray-100 hover:border-black hover:bg-gray-50/50'}
                      ${isDragging ? 'border-black bg-gray-100 scale-[0.99]' : ''}
                      ${!isView ? 'cursor-pointer' : 'cursor-default'}
                    `}
                 >
                    {imagePreview ? (
                      <div className="relative w-full h-full group">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                          {!isView && (
                              <button 
                                  onClick={removeImage}
                                  className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                  <Trash2 size={16} />
                              </button>
                          )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all mb-4 bg-white ${isDragging ? 'scale-110' : ''}`}>
                              <UploadCloud size={24} className={isDragging ? 'text-black' : 'text-gray-300'} />
                          </div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-6">
                              {isDragging ? 'Release to Upload' : 'Click or Drag Image Here'}
                          </p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all bg-gray-50 rounded-2xl active:scale-95">Cancel</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="bg-black text-white px-20 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-4">
              <Save size={18} strokeWidth={2.5} /> Save Vehicle Record
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
