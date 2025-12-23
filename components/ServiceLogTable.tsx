
import React from 'react';
import { ServiceRecord } from '../types';
import { Eye, Pencil, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceLogTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'selesai':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draf':
      case 'draft':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">No Request</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">No Polisi</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Tgl Request</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Channel</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Cabang</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Approval</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900 text-[13px]">{item.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-900 text-[13px]">{item.noPolisi || '-'}</span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-[13px]">
                  {item.tglRequest}
                </td>
                <td className="px-6 py-4 text-gray-600 text-[13px]">
                  {item.channel}
                </td>
                <td className="px-6 py-4 text-gray-600 text-[13px]">
                  {item.cabang}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-bold
                    ${item.statusApproval === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.statusApproval === 'Approved' ? '✓' : '-'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Lihat Detail"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <div className="text-gray-400">
                    <p className="text-sm font-medium">Tidak ada data</p>
                    <p className="text-xs mt-1">Data yang Anda cari tidak ditemukan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-gray-500">
          Menampilkan <span className="font-semibold text-gray-700">1 - {data.length}</span> dari <span className="font-semibold text-gray-700">{data.length}</span> data
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] text-gray-500">
            <span>Baris per halaman:</span>
            <select className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-[12px] font-medium focus:outline-none focus:border-blue-500">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronsLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 mx-1">
              1 / 1
            </span>

            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronRight size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
