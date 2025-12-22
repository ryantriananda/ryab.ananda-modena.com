
import React, { useState, useEffect } from 'react';
import { X, Save, Wrench, Car, Calendar, DollarSign, Landmark, User } from 'lucide-react';
import { ServiceRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ServiceRecord>) => void;
  initialData?: ServiceRecord | null;
  mode?: 'create' | 'edit' | 'view';
  vehicleList: VehicleRecord[];
}

export const ServiceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    vehicleList
}) => {
  const [form, setForm] = useState<Partial<ServiceRecord>>({
    id: '',
    noPolisi: '',
    aset: '',
    tglRequest: new Date().toISOString().split('T')[0],
    jenisServis: 'Servis Rutin',
    vendor: '',
    kmKendaraan: '',
    estimasiBiaya: '',
    jenisPembayaran: 'Kasbon',
    namaBank: '',
    nomorRekening: '',
    status: 'Selesai',
    statusApproval: 'Approved'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
          id: `SRV-${Math.floor(Math.random() * 10000)}`,
          noPolisi: '',
          aset: '',
          tglRequest: new Date().toISOString().split('T')[0],
          jenisServis: 'Servis Rutin',
          vendor: '',
          kmKendaraan: '',
          estimasiBiaya: '',
          jenisPembayaran: 'Kasbon',
          namaBank: '',
          nomorRekening: '',
          status: 'Selesai',
          statusApproval: 'Approved'
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-1">*</span>}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props}
      disabled={isView || props.disabled}
      className={`w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm disabled:bg-gray-50/50 disabled:text-gray-400 ${props.className || ''}`}
    />
  );

  const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none transition-all appearance-none disabled:bg-gray-50/50 disabled:text-gray-400 shadow-sm cursor-pointer"
    >
      {props.children}
    </select>
  );

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-12 py-10 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-black rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
              <Wrench size={28} />
            </div>
            <div>
              <h2 className="text-[22px] font-black text-black uppercase tracking-tight leading-none">Service Maintenance</h2>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Log & Maintenance Details</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black p-3 rounded-full hover:bg-gray-50 transition-all">
            <X size={32} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            
            {/* Left Section: Vehicle Info */}
            <div className="space-y-10">
              <div>
                <Label required>Vehicle Unit</Label>
                <div className="relative">
                  <Select 
                    value={form.noPolisi} 
                    onChange={(e) => {
                      const v = vehicleList.find(x => x.noPolisi === e.target.value);
                      setForm({...form, noPolisi: e.target.value, aset: v?.nama});
                    }}
                  >
                    <option value="">Select Vehicle...</option>
                    {vehicleList.map(v => (
                      <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <Label required>Jenis Servis</Label>
                <Select 
                  value={form.jenisServis} 
                  onChange={(e) => setForm({...form, jenisServis: e.target.value})}
                >
                  <option value="Servis Rutin">Servis Rutin</option>
                  <option value="Perbaikan Mesin">Perbaikan Mesin</option>
                  <option value="Body Repair">Body Repair</option>
                  <option value="Ganti Ban">Ganti Ban</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label required>Odometer (KM)</Label>
                  <Input 
                    type="number"
                    value={form.kmKendaraan} 
                    onChange={(e) => setForm({...form, kmKendaraan: e.target.value})} 
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label required>Request Date</Label>
                  <Input 
                    type="date"
                    value={form.tglRequest} 
                    onChange={(e) => setForm({...form, tglRequest: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            {/* Right Section: Finance & Vendor */}
            <div className="space-y-10">
              <div>
                <Label required>Vendor Name</Label>
                <Input 
                  value={form.vendor} 
                  onChange={(e) => setForm({...form, vendor: e.target.value})} 
                  placeholder="Enter Workshop Name..."
                />
              </div>

              <div>
                <Label required>Estimasi Biaya</Label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[12px] font-black text-gray-300 uppercase">Rp</span>
                  <Input 
                    className="pl-12"
                    type="number"
                    value={form.estimasiBiaya} 
                    onChange={(e) => setForm({...form, estimasiBiaya: e.target.value})} 
                    placeholder="1000000"
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                <p className="text-[10px] font-black text-black uppercase tracking-widest border-b border-gray-50 pb-3">Payment Info</p>
                <div className="space-y-6">
                   <div>
                    <Label>Payment Method</Label>
                    <Select value={form.jenisPembayaran} onChange={(e) => setForm({...form, jenisPembayaran: e.target.value})}>
                      <option value="Kasbon">Kasbon</option>
                      <option value="Reimbursement">Reimbursement</option>
                      <option value="Corporate Card">Corporate Card</option>
                    </Select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Bank Name" value={form.namaBank} onChange={(e) => setForm({...form, namaBank: e.target.value})} />
                      <Input placeholder="Account No" value={form.nomorRekening} onChange={(e) => setForm({...form, nomorRekening: e.target.value})} />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-10 bg-white border-t border-gray-100 flex justify-end gap-6 shrink-0">
          <button 
            onClick={onClose} 
            className="px-12 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
          >
            Cancel
          </button>
          {!isView && (
            <button 
              onClick={handleSave} 
              className="px-20 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-black rounded-2xl shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-4"
            >
              <Save size={18} strokeWidth={3} /> Save Maintenance Log
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
