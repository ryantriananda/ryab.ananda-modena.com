import React from 'react';
import { Search, Plus, Download, Upload, SlidersHorizontal } from 'lucide-react';
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
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Side: Tabs */}
        {tabs.length > 0 && (
          <div className="flex flex-wrap gap-2 bg-gray-100/80 rounded-2xl p-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const isApprovalTab = tab.toLowerCase().includes('persetujuan');
              
              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`px-5 py-2.5 text-[11px] font-semibold transition-all duration-200 rounded-xl flex items-center gap-2
                  ${isActive 
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab}
                  {isApprovalTab && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                      0
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Right Side: Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || "Cari data..."} 
              className="w-full lg:w-64 bg-white pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium">
              <Upload size={16} />
              <span className="hidden sm:inline">Impor</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium">
              <Download size={16} />
              <span className="hidden sm:inline">Ekspor</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* Add Button */}
          {!hideAdd && (
            <button 
              onClick={onAddClick}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>{isService ? 'Buat Permintaan' : t('Add Data')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
