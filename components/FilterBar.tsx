
import React from 'react';
import { Search, Plus, Download, Upload, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  hideAdd?: boolean;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  searchPlaceholder, 
  moduleName,
  hideAdd = false
}) => {
  const { t } = useLanguage();
  const isService = moduleName === 'Servis';

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Side: Pill Tabs */}
        <div className="flex bg-[#F3F4F6] rounded-xl p-1 shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isApprovalTab = tab.toLowerCase().includes('persetujuan');
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg flex items-center gap-2
                ${isActive 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-200'
                }`}
              >
                {tab}
                {isApprovalTab && (
                   <span className={`px-1.5 py-0.5 rounded text-[8px] ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>0</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right Side: Search & Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || "Cari berdasarkan Karyawan, Barang..."} 
              className="w-64 bg-white pl-11 pr-4 py-2.5 text-[11px] font-bold border border-gray-200 rounded-xl focus:border-black outline-none transition-all placeholder:text-gray-300"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
              <Upload size={14} /> Impor
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
              <Download size={14} /> Ekspor
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
              <Filter size={14} /> Saring
            </button>
          </div>

          {!hideAdd && (
            <button 
              onClick={onAddClick}
              className="bg-black text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
            >
              <Plus size={16} strokeWidth={3} /> {isService ? 'Buat Permintaan' : t('Add Data')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
