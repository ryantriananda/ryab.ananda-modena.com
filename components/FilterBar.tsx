
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
  const isService = moduleName === 'Servis' || moduleName === 'Permintaan Servis';

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Pill Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isApprovalTab = tab.toLowerCase().includes('persetujuan');
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-5 py-2.5 text-[12px] font-semibold transition-all rounded-lg flex items-center gap-2 whitespace-nowrap
                ${isActive 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {isApprovalTab && (
                   <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>0</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right Side: Search & Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || "Cari data..."} 
              className="w-full sm:w-64 bg-white pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-600 hover:text-gray-900 transition-all text-[12px] font-medium">
                <Upload size={14} /> <span className="hidden sm:inline">Impor</span>
              </button>
              <button className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-600 hover:text-gray-900 transition-all text-[12px] font-medium">
                <Download size={14} /> <span className="hidden sm:inline">Ekspor</span>
              </button>
              <button className="flex items-center gap-2 px-3.5 py-2.5 hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all text-[12px] font-medium">
                <Filter size={14} /> <span className="hidden sm:inline">Filter</span>
              </button>
            </div>

            {!hideAdd && (
              <button 
                onClick={onAddClick}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-[12px] flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                <Plus size={16} strokeWidth={2.5} /> {isService ? 'Buat Permintaan' : t('Add Data')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
