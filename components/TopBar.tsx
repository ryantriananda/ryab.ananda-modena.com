import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Search, Settings, LogOut, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  breadcrumbs?: string[];
  onMenuClick?: () => void;
}

export const TopBar: React.FC<Props> = ({ breadcrumbs = ['Home', 'Asset Monitoring'], onMenuClick }) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <span className={`${index === breadcrumbs.length - 1 ? 'text-gray-900 font-semibold' : 'text-gray-400'} whitespace-nowrap`}>
                {item}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="text-gray-300">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search - Desktop only */}
        <div className="hidden lg:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Cari..." 
            className="w-48 bg-gray-50 pl-9 pr-4 py-2 text-sm border border-gray-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-4 rounded object-cover" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-4 rounded object-cover" />
            )}
            <span className="text-xs font-semibold text-gray-600 uppercase hidden md:inline">{language}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${language === 'id' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-4 rounded" />
                    <span className="font-medium">Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-4 rounded" />
                    <span className="font-medium">English</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
        
        <div className="h-8 w-px bg-gray-100 mx-1 hidden md:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <img 
              src="https://picsum.photos/id/1005/100/100" 
              alt="Profile" 
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-100"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900 leading-tight">Admin User</p>
              <p className="text-[11px] text-gray-400">Administrator</p>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-400">admin@modena.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <User size={16} />
                    <span>Profil Saya</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Settings size={16} />
                    <span>Pengaturan</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
