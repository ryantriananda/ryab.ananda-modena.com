import React from 'react';
import { AssetRecord } from '../types';
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, MoreHorizontal, Package } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const StationeryRequestTable: React.FC<Props> = ({ data, onView }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20';
      case 'Rejected':
        return 'bg-red-50 text-red-700 ring-1 ring-red-600/20';
      case 'Closed':
        return 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20';
      case 'On Progress':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      default:
        return 'bg-gray-100 text-gray-500 ring-1 ring-gray-400/20';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-center p-4 pl-6 w-14 text-xs font-semibold text-gray-500">#</th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Transaction ID
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Requester
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-4 pl-6 text-center text-sm text-gray-400">{index + 1}</td>
                <td className="p-4">
                  <span className="font-mono font-semibold text-gray-900 text-sm bg-gray-50 px-2 py-1 rounded-lg">
                    {item.transactionNumber}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.employee.name}</p>
                      <p className="text-xs text-gray-400">{item.employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Package size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.itemName}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.itemCode}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="font-bold text-gray-900 text-sm">{item.qty}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`font-semibold text-sm ${item.remainingStock < 10 ? 'text-red-600' : 'text-gray-500'}`}>
                    {item.remainingStock}
                  </span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{item.date}</td>
                <td className="p-4 text-center">
                  <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={9} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <MoreHorizontal size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Belum ada data</p>
                    <p className="text-xs text-gray-400">Data akan muncul di sini setelah ditambahkan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-semibold text-gray-700">1-{data.length}</span> dari <span className="font-semibold text-gray-700">{data.length}</span> data
        </p>
        
        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none">
            <option>10 / halaman</option>
            <option>25 / halaman</option>
            <option>50 / halaman</option>
          </select>

          <div className="flex items-center gap-1 ml-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 bg-blue-600 text-white rounded-lg text-sm font-semibold">1</button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
