
import React from 'react';
import { ServiceRecord } from '../types';
import { Eye, Pencil, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, History } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceLogTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'selesai':
        return 'bg-[#E8FDF5] text-[#059669]';
      case 'draf':
      case 'draft':
        return 'bg-[#F3F4F6] text-[#374151]';
      default:
        return 'bg-[#FEF3C7] text-[#D97706]';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="p-5 pl-8 w-44">NO REQUEST</th>
              <th className="p-5 w-44">NO POLISI</th>
              <th className="p-5 w-56">TGL REQUEST</th>
              <th className="p-5">CHANNEL</th>
              <th className="p-5 w-40">CABANG</th>
              <th className="p-5 w-32">STATUS</th>
              <th className="p-5 w-40">STATUS APPROVAL</th>
              <th className="p-5 w-24 pr-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="p-5 pl-8">
                  <span className="font-bold text-black">{item.id}</span>
                </td>
                <td className="p-5">
                  <span className="font-black text-black uppercase">{item.noPolisi || '-'}</span>
                </td>
                <td className="p-5 text-gray-500 font-medium">
                  {item.tglRequest}
                </td>
                <td className="p-5 text-gray-500 font-medium uppercase">
                  {item.channel}
                </td>
                <td className="p-5 text-gray-500 font-medium">
                  {item.cabang}
                </td>
                <td className="p-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-5">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F3F4F6] text-gray-400 font-black text-[10px] uppercase">
                    {item.statusApproval === 'Approved' ? 'A' : (item.statusApproval || '-')}
                  </div>
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
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="p-20 text-center">
                  <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest italic">Data tidak ditemukan</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination sesuai gambar */}
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
