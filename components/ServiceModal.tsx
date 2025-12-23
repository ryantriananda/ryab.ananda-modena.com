import React, { useState, useEffect, useMemo } from 'react';
import { X, Wrench, Plus, Upload, Trash2, Calendar, Clock, ChevronRight, Info, Save } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Wrench size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {mode === 'create' ? 'Buat Permintaan Servis' : mode === 'edit' ? 'Edit Permintaan' : 'Detail Permintaan'}
              </h2>
              <p className="text-sm text-gray-500">Catatan pemeliharaan kendaraan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Main Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Vehicle Info Card */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-5">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                Data Unit Kendaraan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pilih Unit Kendaraan</label>
                  <select 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    value={form.noPolisi}
                    onChange={(e) => {
                      const v = vehicleList.find(x => x.noPolisi === e.target.value);
                      setForm({...form, noPolisi: e.target.value, aset: v?.nama});
                    }}
                    disabled={isView}
                  >
                    <option value="">-- Pilih Kendaraan --</option>
                    {vehicleList.map(v => <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Odometer (KM)</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="Contoh: 45000"
                    value={form.kmKendaraan}
                    onChange={(e) => setForm({...form, kmKendaraan: e.target.value})}
                    disabled={isView}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Bengkel / Rekanan</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="Nama Bengkel"
                    value={form.vendor}
                    onChange={(e) => setForm({...form, vendor: e.target.value})}
                    disabled={isView}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Lampiran Kwitansi</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 hover:border-blue-300 transition-all cursor-pointer group">
                  <Upload size={28} className="text-gray-300 group-hover:text-blue-500 mb-2 transition-colors" />
                  <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Klik untuk upload file</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF (max 5MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Deskripsi Masalah</label>
                <textarea 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white min-h-[100px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Jelaskan keluhan atau masalah pada kendaraan..."
                  value={form.masalah}
                  onChange={(e) => setForm({...form, masalah: e.target.value})}
                  disabled={isView}
                />
              </div>
            </div>

            {/* Spare Parts */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                  Rincian Suku Cadang
                </h3>
                {!isView && (
                  <button 
                    onClick={addPart}
                    className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                  >
                    <Plus size={16} /> Tambah
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left p-3 text-xs font-semibold text-gray-500">Nama Barang</th>
                      <th className="text-center p-3 text-xs font-semibold text-gray-500 w-20">Qty</th>
                      <th className="text-right p-3 text-xs font-semibold text-gray-500 w-32">Harga</th>
                      <th className="text-right p-3 text-xs font-semibold text-gray-500 w-32">Subtotal</th>
                      {!isView && <th className="w-12"></th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {parts.map((part, idx) => {
                      const priceStr = part.price.toString().replace(/[^0-9]/g, '');
                      const price = parseInt(priceStr) || 0;
                      const subtotal = part.qty * price;
                      return (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="p-3">
                            <input 
                              type="text"
                              className="w-full border-0 p-0 text-sm text-gray-900 focus:ring-0 bg-transparent placeholder:text-gray-400"
                              placeholder="Nama barang..."
                              value={part.name}
                              onChange={(e) => updatePart(idx, 'name', e.target.value)}
                              disabled={isView}
                            />
                          </td>
                          <td className="p-3">
                            <input 
                              type="number"
                              className="w-full border-0 p-0 text-sm text-center font-medium focus:ring-0 bg-transparent"
                              value={part.qty}
                              onChange={(e) => updatePart(idx, 'qty', parseInt(e.target.value) || 0)}
                              disabled={isView}
                            />
                          </td>
                          <td className="p-3 text-right">
                            <input 
                              type="text"
                              className="w-full border-0 p-0 text-sm text-right font-medium focus:ring-0 bg-transparent"
                              value={part.price}
                              onChange={(e) => updatePart(idx, 'price', e.target.value)}
                              disabled={isView}
                            />
                          </td>
                          <td className="p-3 text-right font-semibold text-gray-600">
                            Rp {subtotal.toLocaleString('id-ID')}
                          </td>
                          {!isView && (
                            <td className="p-3 text-center">
                              <button onClick={() => removePart(idx)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                    {parts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                          Belum ada suku cadang ditambahkan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {/* Total */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Total Biaya</span>
                  <span className="text-xl font-bold text-blue-600">Rp {totalBiaya.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - History */}
          <div className="w-full lg:w-80 bg-gray-50 border-l border-gray-100 p-5 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                Riwayat Servis
              </h3>
              <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-lg">1 Log</span>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 flex gap-2">
              <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Klik log untuk melihat detail riwayat servis sebelumnya.
              </p>
            </div>

            <div className="space-y-3">
              {/* History Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">SRV/2024/001</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} />
                    10 Feb 2024
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Servis Rutin</h4>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  "Suara mesin kasar dan tarikan berat pada tanjakan"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs font-semibold text-orange-600">45.000 KM</span>
                  <span className="text-xs font-bold text-gray-900">Rp 1.250.000</span>
                </div>
              </div>
            </div>
          </div>
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
              onClick={handleSave}
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
