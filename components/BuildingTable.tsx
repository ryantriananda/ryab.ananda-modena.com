
import React from 'react';
import { BuildingRecord } from '../types';
import { Eye, Pencil, Building, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: BuildingRecord[];
  onEdit?: (item: BuildingRecord) => void;
  onView?: (item: BuildingRecord) => void;
}

export const BuildingTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Properti / Asset No</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Tipe</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Kepemilikan</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Lokasi</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Alamat</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 text-center">Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Building size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-[13px]">{item.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">{item.assetNo}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-[13px] font-medium">
                    {item.type}
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        item.ownership === 'Own' 
                        ? 'bg-blue-50 text-blue-600 border-blue-200' 
                        : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                        {item.ownership === 'Own' ? 'Milik Sendiri' : 'Sewa'}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 text-[13px]">
                        <MapPin size={14} className="text-gray-400" />
                        {item.location}
                    </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-[13px] max-w-[200px] truncate">
                    {item.address}
                </td>
                <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        item.status === 'Open' 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                        {item.status}
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
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="text-gray-400">
                    <Building size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">Tidak ada data gedung</p>
                    <p className="text-xs mt-1">Klik tombol "Tambah Data" untuk menambahkan gedung baru</p>
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
              <ChevronLeft size={16} />
            </button>
            
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 mx-1">
              1 / 1
            </span>

            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
