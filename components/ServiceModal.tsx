
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, Wrench, Plus, Upload, Trash2, Calendar, Clock, ChevronRight, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ServiceRecord, VehicleRecord, SparePart } from '../types';

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
    noPolisi: '',
    aset: '',
    tglRequest: new Date().toISOString().split('T')[0],
    vendor: '',
    kmKendaraan: '',
    masalah: '',
    jenisServis: 'Servis Rutin',
    spareParts: []
  });

  const [parts, setParts] = useState<SparePart[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setParts(initialData.spareParts || []);
      } else {
        setForm({
          noPolisi: '',
          aset: '',
          tglRequest: new Date().toISOString().split('T')[0],
          vendor: '',
          kmKendaraan: '',
          masalah: '',
          jenisServis: 'Servis Rutin',
          spareParts: []
        });
        setParts([]);
      }
    }
  }, [isOpen, initialData]);

  const isView = mode === 'view';

  const addPart = () => {
    setParts([...parts, { name: '', qty: 1, price: '0' }]);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const updatePart = (index: number, field: keyof SparePart, value: any) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], [field]: value };
    setParts(newParts);
  };

  const totalBiaya = useMemo(() => {
    return parts.reduce((acc, curr) => {
      const priceStr = curr.price.toString().replace(/[^0-9]/g, '');
      const price = parseInt(priceStr) || 0;
      return acc + (curr.qty * price);
    }, 0);
  }, [parts]);

  const handleSave = () => {
    onSave({ ...form, spareParts: parts, estimasiBiaya: totalBiaya.toString() });
    onClose();
  };

  if (!isOpen) return null;

  // Fix: make children optional to resolve TS error where children are passed via JSX but reported as missing
  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
                <Wrench size={18} className="text-black" />
            </div>
            <h2 className="text-[14px] font-black text-black uppercase tracking-widest">Input Catatan Pemeliharaan</h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#FBFBFB]">
          
          {/* Main Form (Left) */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
            
            {/* Vehicle Unit Data */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 bg-black rounded-full"></div>
                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Data Unit Kendaraan</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label>Pilih Unit</Label>
                  <div className="relative">
                    <select 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold bg-white focus:border-black outline-none appearance-none shadow-sm"
                      value={form.noPolisi}
                      onChange={(e) => {
                        const v = vehicleList.find(x => x.noPolisi === e.target.value);
                        setForm({...form, noPolisi: e.target.value, aset: v?.nama});
                      }}
                      disabled={isView}
                    >
                      <option value="">(Pilih Unit)</option>
                      {vehicleList.map(v => <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Jenis Servis Flagging */}
                <div>
                    <Label>Kategori Pemeliharaan</Label>
                    <div className="flex gap-4">
                        {['Servis Rutin', 'Non-Rutin'].map(type => {
                            const isSelected = form.jenisServis === type;
                            const isRutin = type === 'Servis Rutin';
                            return (
                                <button
                                    key={type}
                                    onClick={() => !isView && setForm({...form, jenisServis: type})}
                                    disabled={isView}
                                    className={`flex-1 py-4 rounded-xl border transition-all relative overflow-hidden group ${
                                        isSelected 
                                        ? 'bg-black text-white border-black shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2 relative z-10">
                                        {isRutin ? <CheckCircle2 size={16} className={isSelected ? 'text-green-400' : 'text-gray-300'} /> : <AlertTriangle size={16} className={isSelected ? 'text-orange-400' : 'text-gray-300'} />}
                                        <span className="text-[11px] font-black uppercase tracking-widest">{type}</span>
                                    </div>
                                    {isSelected && <div className="absolute inset-0 bg-white/10" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Odometer (KM)</Label>
                    <input 
                      type="text"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold placeholder:text-gray-300 focus:border-black outline-none shadow-sm"
                      placeholder="Contoh: 45000"
                      value={form.kmKendaraan}
                      onChange={(e) => setForm({...form, kmKendaraan: e.target.value})}
                      disabled={isView}
                    />
                  </div>
                  <div>
                    <Label>Bengkel / Rekanan</Label>
                    <input 
                      type="text"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold placeholder:text-gray-300 focus:border-black outline-none shadow-sm"
                      placeholder="Nama Bengkel"
                      value={form.vendor}
                      onChange={(e) => setForm({...form, vendor: e.target.value})}
                      disabled={isView}
                    />
                  </div>
                </div>

                <div>
                  <Label>Bukti Kwitansi / Foto (IMG)</Label>
                  <div className="border-2 border-dashed border-gray-100 rounded-2xl py-12 flex flex-col items-center justify-center bg-gray-50/20 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <Upload size={32} className="text-gray-300 group-hover:text-black mb-3 transition-colors" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Klik untuk unggah lampiran</p>
                  </div>
                </div>

                <div>
                  <Label>Deskripsi Masalah</Label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-sm font-medium min-h-[120px] focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                    placeholder="Jelaskan keluhan unit..."
                    value={form.masalah}
                    onChange={(e) => setForm({...form, masalah: e.target.value})}
                    disabled={isView}
                  />
                </div>
              </div>
            </div>

            {/* Spare Parts Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-black rounded-full"></div>
                  <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Rincian Suku Cadang</h3>
                </div>
                {!isView && (
                  <button 
                    onClick={addPart}
                    className="bg-black text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
                  >
                    <Plus size={14} strokeWidth={3} /> Tambah Item
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-4 px-2">NAMA BARANG / DESKRIPSI</th>
                      <th className="pb-4 px-2 text-center w-24">QTY</th>
                      <th className="pb-4 px-2 text-right w-40">HARGA (RP)</th>
                      <th className="pb-4 px-2 text-right w-40">SUBTOTAL</th>
                      {!isView && <th className="pb-4 w-12"></th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {parts.map((part, idx) => {
                      const priceStr = part.price.toString().replace(/[^0-9]/g, '');
                      const price = parseInt(priceStr) || 0;
                      const subtotal = part.qty * price;
                      return (
                        <tr key={idx} className="group">
                          <td className="py-4 px-2">
                            <input 
                              type="text"
                              className="w-full border-none p-0 text-[12px] font-bold text-black focus:ring-0 placeholder:text-gray-300 bg-transparent"
                              placeholder="Input Nama Barang..."
                              value={part.name}
                              onChange={(e) => updatePart(idx, 'name', e.target.value)}
                              disabled={isView}
                            />
                          </td>
                          <td className="py-4 px-2">
                            <input 
                              type="number"
                              className="w-full border-none p-0 text-[12px] font-black text-center focus:ring-0 bg-transparent"
                              value={part.qty}
                              onChange={(e) => updatePart(idx, 'qty', parseInt(e.target.value) || 0)}
                              disabled={isView}
                            />
                          </td>
                          <td className="py-4 px-2 text-right">
                            <input 
                              type="text"
                              className="w-full border-none p-0 text-[12px] font-black text-right focus:ring-0 bg-transparent"
                              value={part.price}
                              onChange={(e) => updatePart(idx, 'price', e.target.value)}
                              disabled={isView}
                            />
                          </td>
                          <td className="py-4 px-2 text-right font-black text-[12px] text-gray-400">
                            Rp {subtotal.toLocaleString('id-ID')}
                          </td>
                          {!isView && (
                            <td className="py-4 px-2 text-right">
                              <button onClick={() => removePart(idx)} className="text-gray-200 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                    {parts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center">
                          <p className="text-[11px] font-medium text-gray-300 italic">Belum ada rincian penggantian suku cadang.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="pt-10 pb-4 text-right">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TOTAL BIAYA PERBAIKAN</span>
                      </td>
                      <td className="pt-10 pb-4 text-right">
                        <span className="text-[18px] font-black text-blue-600">Rp {totalBiaya.toLocaleString('id-ID')}</span>
                      </td>
                      {!isView && <td className="pt-10"></td>}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="w-full lg:w-[320px] bg-white border-l border-gray-100 p-8 overflow-y-auto shrink-0 custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-black" />
                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Riwayat Sebelumnya</h3>
              </div>
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">1 LOG</span>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3">
              <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-blue-600 leading-relaxed">
                Klik log di bawah untuk melihat rincian riwayat servis sebelumnya.
              </p>
            </div>

            <div className="space-y-4">
              {/* History Card 1 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-black transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-mono font-black text-black bg-gray-50 px-2 py-0.5 rounded">SRV/2024/001</span>
                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-300">
                    <Calendar size={10} />
                    10 FEB 2024
                  </div>
                </div>
                <h4 className="text-[11px] font-black text-black uppercase mb-1">Servis Rutin</h4>
                <p className="text-[10px] text-gray-400 italic line-clamp-2 mb-4 leading-relaxed">
                  "Suara mesin kasar dan tarikan berat pada tanjakan"
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="text-[10px] font-black text-orange-600">45.000 KM</div>
                  <div className="text-[10px] font-black text-black">Rp 1.250.000</div>
                </div>
              </div>
              
              <div className="h-24 border-2 border-dashed border-gray-50 rounded-2xl flex items-center justify-center opacity-30">
                <ChevronRight size={24} className="text-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-between bg-white shrink-0">
          <button 
            onClick={onClose}
            className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all bg-gray-50 rounded-xl"
          >
            Batal
          </button>
          {!isView && (
            <button 
              onClick={handleSave}
              className="bg-black text-white px-16 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/20"
            >
              Simpan Laporan Servis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
