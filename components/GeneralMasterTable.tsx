import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronLeft, ChevronRight, Database } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 w-20 text-center text-[12px] font-semibold text-gray-500">No</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-gray-500">Nama Item</th>
              <th className="px-6 py-4 w-32 text-center text-[12px] font-semibold text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 text-center text-gray-400 text-[13px] font-medium">{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900 text-[13px]">{item.name}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    title="Edit Item"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Hapus Item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3} className="px-6 py-16 text-center">
                        <div className="text-gray-400">
                            <Database size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">Tidak ada data</p>
                            <p className="text-xs mt-1">Klik tombol "Tambah Data" untuk menambahkan item baru</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-gray-500">
          Menampilkan <span className="font-semibold text-gray-700">{data.length > 0 ? 1 : 0} - {data.length}</span> dari <span className="font-semibold text-gray-700">{data.length}</span> data
        </p>
        
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-[12px]">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
