
import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Building, Shield } from 'lucide-react';
import { UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<UserRecord>) => void;
  initialData?: UserRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const UserModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<UserRecord>>({
    status: 'Active',
    role: 'Staff'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ status: 'Active', role: 'Staff' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", icon: Icon }: any) => (
    <div className="relative">
      <Label>{label}</Label>
      <div className="relative">
        <input 
          type={type} 
          disabled={isView || disabled}
          className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => setForm({...form, [field]: e.target.value})}
        />
        {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <User size={24} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Add New User' : mode === 'edit' ? 'Edit User Profile' : 'User Details'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-[0.25em]">Access Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 bg-[#FBFBFB]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <InputField label="Full Name" value={form.name} field="name" placeholder="Enter employee name..." icon={User} />
                </div>
                
                <InputField label="Email Address" value={form.email} field="email" type="email" placeholder="name@company.com" icon={Mail} />
                <InputField label="Phone Number" value={form.phone} field="phone" placeholder="0812..." icon={Phone} />
                
                <div>
                    <Label>Department</Label>
                    <div className="relative">
                        <select 
                            disabled={isView}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm cursor-pointer"
                            value={form.department || ''}
                            onChange={(e) => setForm({...form, department: e.target.value})}
                        >
                            <option value="">Select Department</option>
                            <option value="GA & Facility">GA & Facility</option>
                            <option value="Human Capital">Human Capital</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>

                <div>
                    <Label>Role Access</Label>
                    <div className="relative">
                        <select 
                            disabled={isView}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm cursor-pointer"
                            value={form.role || ''}
                            onChange={(e) => setForm({...form, role: e.target.value})}
                        >
                            <option value="Staff">Staff</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                        <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>

                <div>
                    <Label>Status Account</Label>
                    <div className="flex gap-4">
                        {['Active', 'Inactive'].map(status => (
                            <button
                                key={status}
                                disabled={isView}
                                onClick={() => setForm({...form, status: status as any})}
                                className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl border transition-all ${
                                    form.status === status
                                    ? 'bg-black text-white border-black shadow-lg'
                                    : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-10 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-3.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
            >
                <Save size={16} /> Save User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
