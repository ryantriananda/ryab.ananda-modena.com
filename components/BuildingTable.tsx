import React from 'react';
import { BuildingRecord } from '../types';
import { ArrowUpDown, Eye, Pencil, Building, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface Props {
  data: BuildingRecord[];
  onEdit?: (item: BuildingRecord) => void;
  onView?: (item: BuildingRecord) => void;
}

export const BuildingTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left p-4 pl-6">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Nama / No Aset
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Tipe
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Kepemilikan
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Lokasi
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Alamat</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <Building size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.assetNo}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">{item.type}</td>
                <td className="p-4">
                  <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    item.ownership === 'Own' 
                      ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20' 
                      : 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20'
                  }`}>
                    {item.ownership === 'Own' ? 'Milik Sendiri' : 'Sewa'}
                  </span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{item.location}</td>
                <td className="p-4 text-gray-500 text-sm max-w-[200px] truncate">{item.address}</td>
                <td className="p-4 text-center">
                  <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    item.status === 'Open' 
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : item.status === 'Close'
                      ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                      : 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={() => onView?.(item)} 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit?.(item)} 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <MoreHorizontal size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Belum ada data gedung</p>
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
