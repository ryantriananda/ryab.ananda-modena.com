import React, { useState, useEffect } from 'react';
import { X, Save, Database } from 'lucide-react';
import { GeneralMasterItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialData?: GeneralMasterItem | null;
  title: string;
}

export const GeneralMasterModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, title }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData ? initialData.name : '');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Database size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {initialData ? `Edit ${title}` : `Tambah ${title}`}
              </h2>
              <p className="text-sm text-gray-500">Master data</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Nama {title} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              autoFocus
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
              placeholder={`Masukkan nama ${title.toLowerCase()}...`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            Batal
          </button>
          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
