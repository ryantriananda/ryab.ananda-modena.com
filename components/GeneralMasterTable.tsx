import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronLeft, ChevronRight, MoreHorizontal, Database } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-center p-4 pl-6 w-20 text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Item</th>
              <th className="text-right p-4 pr-6 w-32 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 pl-6 text-center text-sm text-gray-400">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Database size={16} className="text-gray-400" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onEdit(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-16 text-center">
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
          Menampilkan <span className="font-semibold text-gray-700">{data.length > 0 ? 1 : 0}-{data.length}</span> dari <span className="font-semibold text-gray-700">{data.length}</span> data
        </p>
        
        <div className="flex items-center gap-1">
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
  );
};
