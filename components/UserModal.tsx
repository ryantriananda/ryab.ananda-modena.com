
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, User, Mail, Phone, Building, Shield, MapPin, Calendar, Camera, Lock, Activity, Key, CheckCircle2, History } from 'lucide-react';
import { UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<UserRecord>) => void;
  initialData?: UserRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const UserModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('PROFILE');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState<Partial<UserRecord>>({
    status: 'Active',
    role: 'Staff',
    avatar: 'https://via.placeholder.com/150',
    joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ 
            status: 'Active', 
            role: 'Staff', 
            employeeId: `EMP-${Math.floor(Math.random() * 10000)}`,
            joinDate: new Date().toISOString().split('T')[0],
            avatar: 'https://via.placeholder.com/150' 
        });
      }
      setActiveTab('PROFILE');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setForm(prev => ({ ...prev, avatar: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-1.5 h-6 bg-black rounded-full shadow-sm"></div>
      <div>
          <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">{title}</h3>
          {sub && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1.5 tracking-widest">{sub}</p>}
      </div>
    </div>
  );

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
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
          className={`w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 ${Icon ? 'pl-12' : ''} text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-200 shadow-sm`}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => setForm({...form, [field]: e.target.value})}
        />
        {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  const tabs = ['PROFILE', 'ACCESS & SECURITY', 'ACTIVITY LOG'];

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <User size={26} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Register New User' : mode === 'edit' ? 'Edit User Profile' : 'User Details'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.25em]">Access Management System</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
            
            {/* TAB: PROFILE */}
            {activeTab === 'PROFILE' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Left Column: Avatar & Status */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-black/10">
                                    <img src={form.avatar} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                {!isView && (
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-2 right-2 bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                    >
                                        <Camera size={18} />
                                    </button>
                                )}
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </div>
                            <h3 className="text-[16px] font-black text-black mt-6 uppercase tracking-tight">{form.name || 'New User'}</h3>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{form.role}</p>
                            
                            <div className={`mt-6 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                form.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                            }`}>
                                {form.status}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Data */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                            <SectionHeader title="PERSONAL INFORMATION" sub="Basic Employee Details" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Full Name" value={form.name} field="name" placeholder="John Doe" icon={User} />
                                <InputField label="Employee ID (NIK)" value={form.employeeId} field="employeeId" placeholder="EMP-XXXX" disabled={true} icon={Shield} />
                                <InputField label="Email Address" value={form.email} field="email" type="email" placeholder="email@modena.com" icon={Mail} />
                                <InputField label="Phone Number" value={form.phone} field="phone" placeholder="0812..." icon={Phone} />
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                            <SectionHeader title="JOB DETAILS" sub="Department & Placement" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Label>Department</Label>
                                    <div className="relative">
                                        <select 
                                            disabled={isView}
                                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm cursor-pointer"
                                            value={form.department || ''}
                                            onChange={(e) => setForm({...form, department: e.target.value})}
                                        >
                                            <option value="">Select Dept</option>
                                            <option value="GA & Facility">GA & Facility</option>
                                            <option value="Human Capital">Human Capital</option>
                                            <option value="Finance">Finance</option>
                                            <option value="IT">IT</option>
                                            <option value="Sales">Sales</option>
                                        </select>
                                        <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    </div>
                                </div>
                                
                                <div>
                                    <Label>Office Location</Label>
                                    <div className="relative">
                                        <select 
                                            disabled={isView}
                                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm cursor-pointer"
                                            value={form.location || ''}
                                            onChange={(e) => setForm({...form, location: e.target.value})}
                                        >
                                            <option value="">Select Location</option>
                                            <option value="Jakarta Head Office">Jakarta Head Office</option>
                                            <option value="Surabaya Branch">Surabaya Branch</option>
                                            <option value="Medan Branch">Medan Branch</option>
                                            <option value="Warehouse Cakung">Warehouse Cakung</option>
                                        </select>
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    </div>
                                </div>

                                <InputField label="Join Date" value={form.joinDate} field="joinDate" type="date" icon={Calendar} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ACCESS & SECURITY */}
            {activeTab === 'ACCESS & SECURITY' && (
                <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="ROLE CONFIGURATION" sub="System Permission Levels" />
                        <div className="space-y-6">
                            <Label>Assigned Role</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Admin', 'Manager', 'Staff', 'Viewer'].map((role) => (
                                    <button
                                        key={role}
                                        disabled={isView}
                                        onClick={() => setForm({...form, role})}
                                        className={`py-4 px-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group
                                            ${form.role === role 
                                            ? 'border-black bg-black text-white shadow-xl' 
                                            : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300 hover:text-black'}`}
                                    >
                                        <Shield size={20} className={form.role === role ? 'text-white' : 'text-gray-300 group-hover:text-black'} />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{role}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="ACCOUNT SECURITY" sub="Login & Status Settings" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label>Account Status</Label>
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
                            
                            {!isView && (
                                <div className="flex items-end">
                                    <button className="w-full py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl border-2 border-red-100 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Lock size={16} /> Reset Password
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ACTIVITY LOG */}
            {activeTab === 'ACTIVITY LOG' && (
                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <SectionHeader title="RECENT ACTIVITY" sub="User Actions & Audit Trail" />
                        
                        <div className="space-y-8 relative mt-8">
                            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100"></div>
                            
                            {[
                                { action: 'Logged In', date: 'Just now', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
                                { action: 'Updated Asset GA-001', date: '2 Hours Ago', icon: Save, color: 'text-blue-500', bg: 'bg-blue-100' },
                                { action: 'Password Changed', date: '1 Day Ago', icon: Key, color: 'text-orange-500', bg: 'bg-orange-100' },
                                { action: 'Account Created', date: form.joinDate || 'Unknown', icon: User, color: 'text-gray-500', bg: 'bg-gray-100' }
                            ].map((log, index) => (
                                <div key={index} className="relative pl-12">
                                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${log.bg}`}>
                                        <log.icon size={16} className={log.color} />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-black text-black uppercase tracking-tight">{log.action}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <History size={12} className="text-gray-300" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
            Cancel
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
            >
                <Save size={16} strokeWidth={2.5} /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
