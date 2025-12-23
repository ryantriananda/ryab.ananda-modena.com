import React, { useState, useEffect } from 'react';
import { X, Save, ChevronDown, Building2 } from 'lucide-react';
import { GeneralAssetRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<GeneralAssetRecord>) => void;
  initialData?: Partial<GeneralAssetRecord>;
  mode?: 'create' | 'edit' | 'view';
}

export const AssetGeneralModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create' 
}) => {
  const [form, setForm] = useState<Partial<GeneralAssetRecord>>({
    assetNumber: '[Auto Generate]',
    assetCategory: 'Building',
    ownership: 'Rent',
    type: '',
    assetLocation: '',
    channel: '',
    department: '',
    subLocation: '',
    address: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(prev => ({ ...prev, ...initialData }));
      } else {
        setForm({
          assetNumber: '[Auto Generate]',
          assetCategory: 'Building',
          ownership: 'Rent',
          type: '',
          assetLocation: '',
          channel: '',
          department: '',
          subLocation: '',
          address: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-xl">
              <Building2 size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {mode === 'create' ? 'Tambah Gedung Baru' : mode === 'edit' ? 'Edit Data Gedung' : 'Detail Gedung'}
              </h2>
              <p className="text-sm text-gray-500">Informasi umum aset gedung</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Asset Number */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Nomor Aset</label>
              <input 
                value={form.assetNumber} 
                readOnly 
                disabled 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400"
              />
            </div>
            
            {/* Asset Category */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Kategori Aset</label>
              <input 
                value={form.assetCategory} 
                onChange={(e) => setForm({...form, assetCategory: e.target.value})} 
                disabled={isView}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Tipe <span className="text-red-500">*</span>
              </label>
              <input 
                value={form.type} 
                onChange={(e) => setForm({...form, type: e.target.value})} 
                placeholder="Contoh: Office, Warehouse..."
                disabled={isView}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {/* Ownership */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Kepemilikan</label>
              <div className="relative">
                <select 
                  value={form.ownership} 
                  onChange={(e) => setForm({...form, ownership: e.target.value})}
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="Rent">Sewa</option>
                  <option value="Own">Milik Sendiri</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Asset Location */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Lokasi Aset <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={form.assetLocation} 
                  onChange={(e) => setForm({...form, assetLocation: e.target.value})}
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="">-- Pilih Lokasi --</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Bandung">Bandung</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Channel */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Channel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={form.channel} 
                  onChange={(e) => setForm({...form, channel: e.target.value})}
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="">-- Pilih Channel --</option>
                  <option value="Direct">Direct</option>
                  <option value="Indirect">Indirect</option>
                  <option value="HCO">HCO</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Departemen <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={form.department} 
                  onChange={(e) => setForm({...form, department: e.target.value})}
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="">-- Pilih Departemen --</option>
                  <option value="Finance">Finance</option>
                  <option value="Operation">Operation</option>
                  <option value="IT">IT</option>
                  <option value="HRGA">HRGA</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sub Location */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Sub Lokasi</label>
              <input 
                value={form.subLocation} 
                onChange={(e) => setForm({...form, subLocation: e.target.value})} 
                placeholder="Contoh: Lantai 5, Gudang A..."
                disabled={isView}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Alamat Lengkap</label>
              <textarea 
                disabled={isView}
                maxLength={255}
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all min-h-[100px] resize-none disabled:bg-gray-50 disabled:text-gray-400"
                placeholder="Masukkan alamat lengkap gedung..."
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.address?.length || 0}/255</p>
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
