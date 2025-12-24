
// @google/genai Coding Guidelines: This file uses icons from lucide-react.
// Table style updated to match the latest provided image with specific headers and premium look.

import React from 'react';
import { ReminderRecord } from '../types';
import { ChevronsUpDown, Eye, Trash2, Bell, Clock, Building, MoreHorizontal } from 'lucide-react';

interface Props {
  data: ReminderRecord[];
  onView?: (item: ReminderRecord) => void;
  onDelete?: (id: string | number) => void;
  title?: string;
}

export const ReminderTable: React.FC<Props> = ({ data, onView, onDelete, title }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 pl-8 w-1/4 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ID & DOCUMENT NAME</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/5 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">BUILDING / ASSET NO</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">EXPIRY DATE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">REMAINING DAYS</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-32 text-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</span>
              </th>
              <th className="p-5 w-28 text-center pr-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr 
                        key={item.id} 
                        className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer"
                        onClick={() => onView?.(item)}
                    >
                        <td className="p-5 pl-8">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 transition-all group-hover:bg-black group-hover:text-white
                                    ${item.status === 'Urgent' ? 'bg-red-50 text-red-500' : item.status === 'Warning' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.documentName}</div>
                                    <div className="text-[9px] text-gray-400 font-mono font-bold tracking-tighter uppercase mt-0.5">{item.id}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-5">
                            <div className="flex items-center gap-2 text-gray-600 font-bold uppercase">
                                <Building size={12} className="text-gray-300" />
                                <div>
                                    <div className="text-black font-black text-[11px]">{item.buildingName}</div>
                                    <div className="text-[9px] text-gray-400 font-mono tracking-widest">{item.assetNo}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-5">
                            <span className="font-mono font-black text-black text-[12px]">{item.expiryDate}</span>
                        </td>
                        <td className="p-5 text-center">
                            <div className="inline-flex items-center gap-2 font-black text-[14px] text-black">
                                <Clock size={14} className="text-gray-300" />
                                {item.daysRemaining}
                                <span className="text-[9px] text-gray-300 uppercase font-black">Days</span>
                            </div>
                        </td>
                        <td className="p-5 text-center">
                            <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm
                                ${item.status === 'Urgent' 
                                ? 'bg-red-500 text-white border-red-600' 
                                : item.status === 'Warning'
                                ? 'bg-orange-500 text-white border-orange-600'
                                : 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-5 text-center pr-8">
                            <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all rounded-lg hover:bg-gray-50">
                                    <Eye size={16} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="p-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Bell size={40} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Showing 1 - 0 of 0 Row(s)</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} records</span>
            </div>
      </div>
    </div>
  );
};
