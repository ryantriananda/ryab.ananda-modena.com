import React from 'react';
import { VehicleRecord } from '../types';
import { Eye, Pencil, ChevronLeft, ChevronRight, Car } from 'lucide-react';

interface Props {
  data: VehicleRecord[];
  onEdit?: (item: VehicleRecord) => void;
  onView?: (item: VehicleRecord) => void;
}

export const VehicleTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">No Registrasi</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Nama Kendaraan</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">No Polisi</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Channel</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Cabang</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 text-gray-500 text-[13px]">{item.noRegistrasi}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Car size={16} />
                    </div>
                    <span className="font-semibold text-gray-900 text-[13px]">{item.nama}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-[13px]">{item.noPolisi}</td>
                <td className="px-6 py-4 text-gray-600 text-[13px]">{item.channel}</td>
                <td className="px-6 py-4 text-gray-600 text-[13px]">{item.cabang}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        item.status === 'Aktif' 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'}`}></span>
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
                    <Car size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">Tidak ada data kendaraan</p>
                    <p className="text-xs mt-1">Klik tombol "Tambah Data" untuk menambahkan kendaraan baru</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
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
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-[12px]">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium text-[12px] hover:border-blue-500 hover:text-blue-600 transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-medium text-[12px] hover:border-blue-500 hover:text-blue-600 transition-all">3</button>
            </div>

            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};