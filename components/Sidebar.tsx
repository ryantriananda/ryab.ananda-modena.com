import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Users, 
  Home, 
  BookOpen, 
  ChevronLeft,
  ChevronRight,
  Car,
  Database,
  Wrench,
  Send,
  DollarSign,
  ChevronDown,
  X,
  Building,
  Briefcase,
  Bell,
  Settings,
  UserCheck,
  Box,
  House
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  activeItem: string;
  onNavigate: (label: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export const Sidebar: React.FC<Props> = ({ 
  activeItem, 
  onNavigate, 
  isCollapsed, 
  onToggle, 
  isMobileOpen, 
  onCloseMobile 
}) => {
  const { t } = useLanguage();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Kendaraan', 'Gedung', 'ATK', 'ARK', 'Master Data']);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
        onToggle();
        if (!expandedMenus.includes(label)) {
             setExpandedMenus(prev => [...prev, label]);
        }
    } else {
        setExpandedMenus(prev => 
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    }
  };

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { 
        label: 'Kendaraan', 
        icon: <Car size={18} />,
        subItems: [
            { label: 'Daftar Aset', icon: <Database size={16} /> },
            { label: 'Kontrak Kendaraan', icon: <Briefcase size={16} /> },
            { label: 'Servis', icon: <Wrench size={16} /> },
            { label: 'Pajak & KIR', icon: <FileText size={16} /> },
            { label: 'Mutasi', icon: <Send size={16} /> },
            { label: 'Penjualan', icon: <DollarSign size={16} /> },
        ]
    },
    { 
        label: 'ATK', 
        icon: <Box size={18} />,
        subItems: [
            { label: 'Request ATK', icon: <Database size={16} /> },
            { label: 'Stationery Request Approval', icon: <UserCheck size={16} /> },
            { label: 'Master ATK', icon: <Settings size={16} /> },
        ]
    },
    { 
        label: 'ARK', 
        icon: <House size={18} />,
        subItems: [
            { label: 'Daftar ARK', icon: <Database size={16} /> },
            { label: 'Household Request Approval', icon: <UserCheck size={16} /> },
            { label: 'Master ARK', icon: <Settings size={16} /> },
        ]
    },
    { label: 'Log Book', icon: <BookOpen size={18} /> },
    { 
        label: 'Gedung', 
        icon: <Building size={18} />,
        subItems: [
             { label: 'Kontrak Gedung', icon: <FileText size={16} /> },
             { label: 'List Reminder Dokumen', icon: <Bell size={16} /> },
        ]
    },
    { label: 'Timesheet', icon: <Clock size={18} /> },
    { label: 'Vendor', icon: <Users size={18} /> },
    { 
      label: 'Master Data', 
      icon: <Home size={18} />,
      subItems: [
        { label: 'Jenis Pajak', icon: <Wrench size={16} /> },
        { label: 'Jenis Pembayaran', icon: <Wrench size={16} /> },
        { label: 'Jenis Servis', icon: <Wrench size={16} /> },
        { label: 'Status Mutasi', icon: <Wrench size={16} /> },
        { label: 'Status Penjualan', icon: <Wrench size={16} /> },
        { label: 'Status Request', icon: <Wrench size={16} /> },
        { label: 'Tipe Mutasi', icon: <Wrench size={16} /> },
        { label: 'Tipe Vendor', icon: <Wrench size={16} /> },
        { label: 'Peran', icon: <Wrench size={16} /> },
        { label: 'Master Vendor', icon: <Users size={16} /> },
      ]
    },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300 flex flex-col transition-all duration-300 shadow-2xl
    ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
    ${isCollapsed && !isMobileOpen ? 'lg:w-20' : 'lg:w-72'}
  `;

  return (
    <div className={sidebarClasses}>
      {/* Logo Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 min-w-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
            M
          </div>
          {(!isCollapsed || isMobileOpen) && (
              <div className="overflow-hidden whitespace-nowrap">
                  <h1 className="font-bold text-lg text-white leading-none tracking-tight">MODENA</h1>
                  <p className="text-[11px] text-slate-400 mt-0.5">Asset Management</p>
              </div>
          )}
        </div>
        {isMobileOpen && (
          <button onClick={onCloseMobile} className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X size={18} className="text-slate-400" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-1">
        {menuItems.map((item, index) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(item.label);
          const isParentActive = activeItem === item.label || (item.subItems && item.subItems.some(sub => sub.label === activeItem)); 

          if (hasSub) {
              return (
                  <div key={index} className="space-y-0.5">
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center ${(isCollapsed && !isMobileOpen) ? 'justify-center px-3' : 'justify-between px-4'} py-3 text-[13px] font-medium rounded-xl transition-all duration-200 
                        ${isParentActive 
                          ? 'bg-slate-700/60 text-white' 
                          : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'}`}
                      >
                         <div className={`flex items-center ${(isCollapsed && !isMobileOpen) ? 'gap-0' : 'gap-3'}`}>
                            <span className={isParentActive ? 'text-blue-400' : ''}>{item.icon}</span>
                            {(!isCollapsed || isMobileOpen) && <span>{t(item.label)}</span>}
                         </div>
                         {(!isCollapsed || isMobileOpen) && (
                           <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                         )}
                      </button>

                      {isExpanded && (!isCollapsed || isMobileOpen) && (
                          <div className="ml-4 pl-4 border-l border-slate-700/50 space-y-0.5 py-1">
                              {item.subItems!.map((sub, subIndex) => {
                                  const isSubActive = activeItem === sub.label;
                                  return (
                                    <button
                                        key={subIndex}
                                        onClick={() => onNavigate(sub.label)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium rounded-lg transition-all duration-200
                                            ${isSubActive
                                            ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400 -ml-[1px]' 
                                            : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'}`}
                                    >
                                        {t(sub.label)}
                                    </button>
                                  )
                              })}
                          </div>
                      )}
                  </div>
              );
          }

          return (
            <button
              key={index}
              onClick={() => onNavigate(item.label)}
              className={`w-full flex items-center ${(isCollapsed && !isMobileOpen) ? 'justify-center px-3' : 'gap-3 px-4'} py-3 text-[13px] font-medium rounded-xl transition-all duration-200
                ${isParentActive
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'}`}
            >
              <span className={isParentActive ? 'text-blue-400' : ''}>{item.icon}</span>
              {(!isCollapsed || isMobileOpen) && <span>{t(item.label)}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Toggle */}
      <div className="p-4 border-t border-slate-700/50 hidden lg:block">
        <button 
            onClick={onToggle}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 text-[12px] text-slate-400 hover:text-white hover:bg-slate-700/40 rounded-lg transition-all`}
        >
          <div className="p-1.5 bg-slate-700 rounded-lg">
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </div>
          {!isCollapsed && <span>{t('Minimize menu')}</span>}
        </button>
      </div>
    </div>
  );
};
