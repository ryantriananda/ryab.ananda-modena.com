
import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronLeft, ChevronRight, MoreHorizontal, Car, Truck, Bike, Bus } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
  title?: string;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete, title }) => {
  const isVehicleType = title?.toLowerCase().includes('kendaraan');

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('motor') || n.includes('bike')) return <Bike size={18} />;
    if (n.includes('truck') || n.includes('truk')) return <Truck size={18} />;
    if (n.includes('bus')) return <Bus size={18} />;
    return <Car size={18} />;
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 w-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">#</th>
              <th className="p-6 text-[10px] font-black text-black uppercase tracking-[0.15em] border-b border-gray-100">Item Description</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em] border-b border-gray-100">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                        <td className="p-6 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                        <td className="p-6">
                            <div className="flex items-center gap-4">
                                {isVehicleType && (
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-300">
                                        {getIcon(item.name)}
                                    </div>
                                )}
                                <span className="font-black text-black uppercase tracking-tight text-[13px] group-hover:translate-x-1 transition-transform duration-300">
                                    {item.name}
                                </span>
                            </div>
                        </td>
                        <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                                    title="Edit Item"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
                    <td colSpan={3} className="p-24 text-center">
                        <div className="flex flex-col items-center justify-center opacity-20">
                            <MoreHorizontal size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">No records found</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-8 py-6 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Total <span className="text-black ml-1">{data.length} Master Items</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
