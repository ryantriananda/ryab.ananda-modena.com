import React from 'react';
import { LogBookRecord } from '../types';
import { ArrowUpDown, Eye, Pencil, User, Users, Baby, MapPin, Calendar, MessageSquare, ChevronLeft, ChevronRight, MoreHorizontal, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LogBookRecord[];
  onEdit?: (item: LogBookRecord) => void;
  onView?: (item: LogBookRecord) => void;
}

export const LogBookTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Customer':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case 'Supplier':
        return 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20';
      default:
        return 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20';
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
                  Lokasi
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="text-left p-4">
                <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                  Nama Tamu
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
              <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengunjung</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catatan</th>
              <th className="text-right p-4 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((item, index) => {
                const isStillVisiting = !item.jamPulang;
                const totalVisitors = item.wanita + item.lakiLaki + item.anakAnak;
                return (
                  <tr 
                    key={item.id} 
                    onClick={() => onView?.(item)}
                    className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  >
                    <td className="p-4 pl-6 text-center">
                      {isStillVisiting ? (
                        <span className="relative flex h-3 w-3 mx-auto">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">{index + 1}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="font-semibold text-gray-900 text-sm">{item.lokasiModena}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${getCategoryStyle(item.kategoriTamu)}`}>
                        {item.kategoriTamu}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.namaTamu}</p>
                        {isStillVisiting && (
                          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                            <Clock size={10} /> Sedang berkunjung
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {item.tanggalKunjungan}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-center px-2">
                          <p className="text-xs text-gray-400">Masuk</p>
                          <p className="font-mono font-semibold text-gray-900 text-sm">{item.jamDatang}</p>
                        </div>
                        <span className="text-gray-300">→</span>
                        <div className="text-center px-2">
                          <p className="text-xs text-gray-400">Keluar</p>
                          <p className="font-mono font-semibold text-gray-500 text-sm">{item.jamPulang || '--:--'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1" title="Wanita">
                          <Users size={14} className="text-pink-500" />
                          <span className="text-sm font-semibold text-gray-700">{item.wanita}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Pria">
                          <User size={14} className="text-blue-500" />
                          <span className="text-sm font-semibold text-gray-700">{item.lakiLaki}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Anak">
                          <Baby size={14} className="text-orange-500" />
                          <span className="text-sm font-semibold text-gray-700">{item.anakAnak}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm max-w-[150px] truncate">
                        <MessageSquare size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{item.note || '-'}</span>
                      </div>
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
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <MoreHorizontal size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Belum ada data log book</p>
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
