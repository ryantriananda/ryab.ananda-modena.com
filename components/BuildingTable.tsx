
import React from 'react';
import { BuildingRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Building, MapPin, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: BuildingRecord[];
  onEdit?: (item: BuildingRecord) => void;
  onView?: (item: BuildingRecord) => void;
}

export const BuildingTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="p-5 pl-8 w-64 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  PROPERTI / ASSET NO
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  TIPE
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-44 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  KEPEMILIKAN
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-56 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  LOKASI / WILAYAH
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  ALAMAT LENGKAP
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-32 group cursor-pointer hover:bg-gray-50/50 transition-colors text-center">
                STATUS
              </th>
              <th className="p-5 w-24 pr-8 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="p-5 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-black border border-gray-100">
                        <Building size={16} />
                    </div>
                    <div>
                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-tighter mt-0.5">{item.assetNo}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-gray-500 font-black uppercase">
                    {item.type}
                </td>
                <td className="p-5">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        item.ownership === 'Own' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                        {item.ownership === 'Own' ? 'MILIK SENDIRI' : 'SEWA / RENTAL'}
                    </span>
                </td>
                <td className="p-5">
                    <div className="flex items-center gap-2 text-gray-600 font-bold uppercase">
                        <MapPin size={12} className="text-gray-300" />
                        {item.location}
                    </div>
                </td>
                <td className="p-5 text-gray-400 font-medium max-w-[250px] truncate">
                    {item.address}
                </td>
                <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        item.status === 'Open' ? 'bg-[#E8FDF5] text-[#059669]' : 'bg-gray-100 text-gray-400'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-5 pr-8 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                      className="p-1.5 text-gray-300 hover:text-black transition-all"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                      className="p-1.5 text-gray-300 hover:text-black transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination style consistent with Service Table */}
      <div className="px-8 py-5 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          SHOWING 1 - {data.length} OF <span className="text-black">{data.length}</span> ROW(S)
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            ROW PER PAGE
            <select className="bg-transparent border-0 text-[11px] font-black text-black focus:ring-0 cursor-pointer p-0">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronsLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronLeft size={16} />
            </button>
            
            <div className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[11px] font-black shadow-sm mx-2">
              1 / 1
            </div>

            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronRight size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
