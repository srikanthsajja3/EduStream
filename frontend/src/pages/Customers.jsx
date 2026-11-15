import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Tv, 
  PlayCircle, 
  Calendar, 
  Edit3, 
  Trash2, 
  Clock, 
  ShieldCheck,
  Smartphone,
  UserCheck,
  Crown,
  Shield,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Mock initial customer records with IPTV and PiShow expiry dates & operator mappings
const INITIAL_CUSTOMERS = [
  {
    id: 'cust-101',
    code: 'CUST-8021',
    name: 'Srikanth Chowdary',
    phone: '+91 98765 43210',
    email: 'srikanth@example.com',
    managed_by: 'Operator (Ravi Kumar)',
    operator_id: 'op-1',
    devices: '2 Devices (STB + Mobile)',
    plan: 'Premium Combo',
    iptv_expiry_date: '2026-10-15',
    pishow_expiry_date: '2026-09-30',
    status: 'Active'
  },
  {
    id: 'cust-102',
    code: 'CUST-8022',
    name: 'Ananya Sharma',
    phone: '+91 98123 45678',
    email: 'ananya@example.com',
    managed_by: 'Operator (Anita Roy)',
    operator_id: 'op-2',
    devices: '1 Device (Android TV)',
    plan: 'IPTV Standard',
    iptv_expiry_date: '2026-08-01',
    pishow_expiry_date: '2026-07-20', // Expired
    status: 'Active'
  },
  {
    id: 'cust-103',
    code: 'CUST-8023',
    name: 'Rajesh Kumar',
    phone: '+91 97654 32109',
    email: 'rajesh.k@example.com',
    managed_by: 'Operator (Ravi Kumar)',
    operator_id: 'op-1',
    devices: '3 Devices (Multi-Room)',
    plan: 'PiShow Ultra',
    iptv_expiry_date: '2026-07-28', // Expiring soon
    pishow_expiry_date: '2026-12-31',
    status: 'Active'
  },
  {
    id: 'cust-104',
    code: 'CUST-8024',
    name: 'Priya Verma',
    phone: '+91 96543 21098',
    email: 'priya.v@example.com',
    managed_by: 'Operator (Suresh M)',
    operator_id: 'op-3',
    devices: '1 Device (Firestick)',
    plan: 'Basic Pack',
    iptv_expiry_date: '2026-06-15', // Expired
    pishow_expiry_date: '2026-06-15', // Expired
    status: 'Inactive'
  },
  {
    id: 'cust-105',
    code: 'CUST-8025',
    name: 'Vikram Reddy',
    phone: '+91 95432 10987',
    email: 'vikram.r@example.com',
    managed_by: 'Operator (Anita Roy)',
    operator_id: 'op-2',
    devices: '4 Devices (Enterprise)',
    plan: 'Enterprise IPTV + PiShow',
    iptv_expiry_date: '2027-01-10',
    pishow_expiry_date: '2027-01-10',
    status: 'Active'
  }
];

const Customers = () => {
  const { user } = useAuth();
  
  // Screen Mode: 'super_admin' | 'admin' | 'operator'
  const [screenRole, setScreenRole] = useState('super_admin');
  
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    phone: '',
    email: '',
    managed_by: 'Operator (Ravi Kumar)',
    devices: '2 Devices (STB + Mobile)',
    plan: 'Premium Combo',
    iptv_expiry_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
    pishow_expiry_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
    status: 'Active'
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/customers');
      if (res.data && res.data.length > 0) {
        setCustomers(res.data);
      } else {
        setCustomers(INITIAL_CUSTOMERS);
      }
    } catch (err) {
      console.log('Using local customer dataset:', err.message);
      setCustomers(INITIAL_CUSTOMERS);
    } finally {
      setLoading(false);
    }
  };

  const getExpiryStatus = (dateString) => {
    if (!dateString) return { label: 'Not Set', color: 'bg-slate-100 text-slate-600 border-slate-200' };
    const expiry = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Expired (${Math.abs(diffDays)}d ago)`, status: 'expired', color: 'bg-red-50 text-red-700 border-red-200' };
    } else if (diffDays <= 7) {
      return { label: `Expiring in ${diffDays}d`, status: 'warning', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    } else {
      return { label: `Active (${diffDays}d left)`, status: 'active', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    const threeMonths = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
    const nextCode = `CUST-${Math.floor(8000 + Math.random() * 1000)}`;
    setFormData({
      code: nextCode,
      name: '',
      phone: '',
      email: '',
      managed_by: 'Operator (Ravi Kumar)',
      devices: '2 Devices (STB + Mobile)',
      plan: 'Premium Combo',
      iptv_expiry_date: threeMonths,
      pishow_expiry_date: threeMonths,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      code: customer.code || '',
      name: customer.name || '',
      phone: customer.phone || '',
      email: customer.email || '',
      managed_by: customer.managed_by || 'Operator',
      devices: customer.devices || '1 Device',
      plan: customer.plan || 'Standard',
      iptv_expiry_date: customer.iptv_expiry_date || '',
      pishow_expiry_date: customer.pishow_expiry_date || '',
      status: customer.status || 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? { ...c, ...formData } : c));
    } else {
      const newCust = {
        id: `cust-${Date.now()}`,
        ...formData
      };
      setCustomers(prev => [newCust, ...prev]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer record?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleQuickExtend = (customerId, type, days) => {
    setCustomers(prev => prev.map(c => {
      if (c.id !== customerId) return c;
      const field = type === 'iptv' ? 'iptv_expiry_date' : 'pishow_expiry_date';
      const currentDate = c[field] ? new Date(c[field]) : new Date();
      const baseDate = currentDate < new Date() ? new Date() : currentDate;
      baseDate.setDate(baseDate.getDate() + days);
      const updatedDate = baseDate.toISOString().split('T')[0];
      return {
        ...c,
        [field]: updatedDate,
        status: 'Active'
      };
    }));
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.phone.includes(searchTerm) ||
                          c.managed_by?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterStatus === 'IPTV Expired') {
      return getExpiryStatus(c.iptv_expiry_date).status === 'expired';
    }
    if (filterStatus === 'PiShow Expired') {
      return getExpiryStatus(c.pishow_expiry_date).status === 'expired';
    }
    if (filterStatus === 'Active Both') {
      return getExpiryStatus(c.iptv_expiry_date).status !== 'expired' && 
             getExpiryStatus(c.pishow_expiry_date).status !== 'expired';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Role Screen Selector Tabs (Super Admin / Admin / Operator) */}
      <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto gap-2">
        <button
          onClick={() => setScreenRole('super_admin')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-1 justify-center ${
            screenRole === 'super_admin'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-900" />
          <span>Super Admin Screen</span>
        </button>

        <button
          onClick={() => setScreenRole('admin')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-1 justify-center ${
            screenRole === 'admin'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-extrabold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Admin Screen</span>
        </button>

        <button
          onClick={() => setScreenRole('operator')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex-1 justify-center ${
            screenRole === 'operator'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-extrabold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Operators Screen</span>
        </button>
      </div>

      {/* Dynamic Header Banner based on Selected Role Screen */}
      <div className={`p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
        screenRole === 'super_admin' 
          ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/30' 
          : screenRole === 'admin'
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900'
          : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/30'
      }`}>
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1">
            {screenRole === 'super_admin' && <Crown className="w-4 h-4 text-amber-400" />}
            {screenRole === 'admin' && <Shield className="w-4 h-4 text-indigo-400" />}
            {screenRole === 'operator' && <Headphones className="w-4 h-4 text-emerald-400" />}
            <span className={screenRole === 'super_admin' ? 'text-amber-400' : screenRole === 'admin' ? 'text-indigo-400' : 'text-emerald-400'}>
              {screenRole === 'super_admin' ? 'Super Admin Portal' : screenRole === 'admin' ? 'Admin Management Screen' : 'Operator Console Screen'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Customer Management & Expiry Dates</h1>
          <p className="text-slate-300 text-sm mt-1">
            Viewing customer table with <span className="text-indigo-300 font-semibold">IPTV Expiry Date</span> and <span className="text-purple-300 font-semibold">PiShow Expiry Date</span>.
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className={`flex items-center justify-center space-x-2 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 ${
            screenRole === 'super_admin' ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold' : screenRole === 'admin' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Customers ({screenRole})</p>
            <h3 className="text-2xl font-bold text-slate-900">{customers.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">IPTV Active Expiry</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {customers.filter(c => getExpiryStatus(c.iptv_expiry_date).status !== 'expired').length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PiShow Active Expiry</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {customers.filter(c => getExpiryStatus(c.pishow_expiry_date).status !== 'expired').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Code, Name, Phone or Operator..."
            className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">Filter: All Customers</option>
            <option value="Active Both">Active (IPTV & PiShow)</option>
            <option value="IPTV Expired">IPTV Expired</option>
            <option value="PiShow Expired">PiShow Expired</option>
          </select>
        </div>
      </div>

      {/* Customer Table with exact columns: Code | Name | Phone | Managed By | Devices | Plan | IPTV Expiry Date | PiShow Expiry Date | Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <span>Customer Directory Table</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">{filteredCustomers.length} Records</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Viewing as: <strong className="capitalize text-slate-700">{screenRole.replace('_', ' ')}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Managed By</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Devices</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 text-indigo-600">
                    <Tv className="w-3.5 h-3.5" />
                    <span>IPTV Expiry Date</span>
                  </div>
                </th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 text-purple-600">
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>PiShow Expiry Date</span>
                  </div>
                </th>
                <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-slate-400">Loading customer records...</td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-slate-400">No customers found matching criteria.</td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const iptvStatus = getExpiryStatus(customer.iptv_expiry_date);
                  const pishowStatus = getExpiryStatus(customer.pishow_expiry_date);

                  return (
                    <tr key={customer.id} className="hover:bg-slate-50/80 transition-all group">
                      {/* Code */}
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                          {customer.code || customer.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-bold text-xs">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                            {customer.email && <p className="text-[11px] text-slate-400">{customer.email}</p>}
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                        {customer.phone || 'N/A'}
                      </td>

                      {/* Managed By */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <UserCheck className="w-3 h-3 text-slate-500" />
                          <span>{customer.managed_by || 'Operator'}</span>
                        </span>
                      </td>

                      {/* Devices */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-slate-600">
                          <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{customer.devices || '1 Device'}</span>
                        </span>
                      </td>

                      {/* Plan */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                          {customer.plan}
                        </span>
                      </td>

                      {/* IPTV Expiry Date */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{customer.iptv_expiry_date || 'Not Set'}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${iptvStatus.color}`}>
                            {iptvStatus.label}
                          </span>
                          <div className="flex items-center space-x-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleQuickExtend(customer.id, 'iptv', 30)}
                              className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded"
                            >
                              +30d
                            </button>
                            <button 
                              onClick={() => handleQuickExtend(customer.id, 'iptv', 90)}
                              className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded"
                            >
                              +90d
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* PiShow Expiry Date */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                            <Calendar className="w-3.5 h-3.5 text-purple-500" />
                            <span>{customer.pishow_expiry_date || 'Not Set'}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${pishowStatus.color}`}>
                            {pishowStatus.label}
                          </span>
                          <div className="flex items-center space-x-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleQuickExtend(customer.id, 'pishow', 30)}
                              className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded"
                            >
                              +30d
                            </button>
                            <button 
                              onClick={() => handleQuickExtend(customer.id, 'pishow', 90)}
                              className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded"
                            >
                              +90d
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button 
                            onClick={() => handleOpenEditModal(customer)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Edit Customer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full z-10 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {editingCustomer ? 'Edit Customer Record' : 'Add New Customer'}
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Configure Code, Name, Phone, Managed By, Devices, Plan, and IPTV & PiShow expiry dates.
              </p>

              <form onSubmit={handleSaveCustomer} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Customer Code</label>
                    <input 
                      type="text" 
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono"
                      placeholder="CUST-8021"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="Srikanth Chowdary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Managed By (Operator)</label>
                    <input 
                      type="text"
                      value={formData.managed_by}
                      onChange={(e) => setFormData({ ...formData, managed_by: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="Operator (Ravi Kumar)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Devices</label>
                    <input 
                      type="text"
                      value={formData.devices}
                      onChange={(e) => setFormData({ ...formData, devices: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="2 Devices (STB + Mobile)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Subscription Plan</label>
                    <select 
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700"
                    >
                      <option value="Premium Combo">Premium Combo</option>
                      <option value="IPTV Standard">IPTV Standard</option>
                      <option value="PiShow Ultra">PiShow Ultra</option>
                      <option value="Enterprise Pack">Enterprise Pack</option>
                    </select>
                  </div>
                </div>

                {/* Expiry Dates Configurations */}
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>Both Expiry Dates Configuration</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-indigo-900 mb-1 flex items-center space-x-1">
                        <Tv className="w-3.5 h-3.5 text-indigo-600" />
                        <span>IPTV Expiry Date</span>
                      </label>
                      <input 
                        type="date"
                        required
                        value={formData.iptv_expiry_date}
                        onChange={(e) => setFormData({ ...formData, iptv_expiry_date: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-900 mb-1 flex items-center space-x-1">
                        <PlayCircle className="w-3.5 h-3.5 text-purple-600" />
                        <span>PiShow Expiry Date</span>
                      </label>
                      <input 
                        type="date"
                        required
                        value={formData.pishow_expiry_date}
                        onChange={(e) => setFormData({ ...formData, pishow_expiry_date: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all"
                  >
                    {editingCustomer ? 'Update Customer' : 'Save Customer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customers;
