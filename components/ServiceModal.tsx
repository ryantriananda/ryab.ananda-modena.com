
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<ServiceRecord>>({
    noPolisi: '',
    aset: '',
    tglRequest: new Date().toISOString().split('T')[0],
    vendor: '',
    kmKendaraan: '',
    masalah: '',
    jenisServis: 'Servis Rutin',
    statusApproval: 'Pending',
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
          statusApproval: 'Pending',
          spareParts: []
        });
        setParts([]);
      }
      setActiveTab('DETAILS');
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

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
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

        <div className="bg-white border-b border-gray-100 flex px-8 shrink-0 gap-6">
            <button onClick={() => setActiveTab('DETAILS')} className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 ${activeTab === 'DETAILS' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Details</button>
            <button onClick={() => setActiveTab('WORKFLOW')} className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 ${activeTab === 'WORKFLOW' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Workflow</button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#FBFBFB]">
          
          {activeTab === 'DETAILS' && (
          <>
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
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
                  </div>
                </div>

                <div>
                    <Label>Kategori Pemeliharaan</Label>
                    <div className="flex gap-4">
                        {['Servis Rutin', 'Non-Rutin'].map(type => {
                            const isSelected = form.jenisServis === type;
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
                                    <span className="text-[11px] font-black uppercase tracking-widest">{type}</span>
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
                      value={form.vendor}
                      onChange={(e) => setForm({...form, vendor: e.target.value})}
                      disabled={isView}
                    />
                  </div>
                </div>

                <div>
                  <Label>Deskripsi Masalah</Label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-sm font-medium min-h-[120px] focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                    value={form.masalah}
                    onChange={(e) => setForm({...form, masalah: e.target.value})}
                    disabled={isView}
                  />
                </div>
              </div>
            </div>

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
                      <th className="pb-4 px-2">NAMA BARANG</th>
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
          </>
          )}

          {activeTab === 'WORKFLOW' && (
              <div className="flex-1 p-12 overflow-y-auto">
                  <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute left-[51px] top-12 bottom-12 w-[2px] bg-gray-100"></div>
                        <div className="space-y-10 relative z-10">
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
                                    <Wrench size={20} strokeWidth={3} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Service Request Created</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">On {form.tglRequest}</p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                                    form.statusApproval === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                                    form.statusApproval === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                                    'bg-orange-500 text-white shadow-orange-200'
                                }`}>
                                    {form.statusApproval === 'Approved' ? <CheckCircle2 size={20} /> : 
                                     form.statusApproval === 'Rejected' ? <X size={20} /> : <Clock size={20} />}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Status: {form.statusApproval}</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {form.statusApproval === 'Approved' ? 'Service Approved' : 'Waiting for approval'}
                                    </p>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-gray-100 flex justify-between bg-white shrink-0">
          <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all bg-gray-50 rounded-xl">Batal</button>
          {!isView && (
            <button onClick={handleSave} className="bg-black text-white px-16 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/20">Simpan Laporan Servis</button>
          )}
        </div>
      </div>
    </div>
  );
};
