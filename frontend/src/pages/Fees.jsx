import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { CreditCard, ArrowUpRight, ArrowDownRight, IndianRupee, Search, Receipt } from 'lucide-react';

const Fees = () => {
  const [summary, setSummary] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const [summaryRes, paymentsRes] = await Promise.all([
        api.get('/api/fees/summary'),
        api.get('/api/fees/payments')
      ]);
      setSummary(summaryRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      console.error('Error fetching fees:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total Expected', value: summary.total_expected || 0, icon: IndianRupee, color: 'blue' },
    { label: 'Total Collected', value: summary.total_collected || 0, icon: ArrowUpRight, color: 'green' },
    { label: 'Total Pending', value: summary.total_pending || 0, icon: ArrowDownRight, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fee Management</h1>
          <p className="text-slate-500 text-sm">Track collections, arrears, and payments</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <CreditCard className="w-5 h-5" />
          <span>Collect Fee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900">₹{Number(stat.value).toLocaleString()}</h3>
            <div className="mt-2 flex items-center text-xs text-slate-500">
               <span className="font-semibold text-green-600 mr-1">+4.5%</span> than last month
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search receipts..."
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Receipt No</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400">Loading payment history...</td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400">No recent payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{payment.student_name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{payment.mode_of_payment}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        payment.fee_type === 'Tuition' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {payment.fee_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      ₹{Number(payment.amount_paid).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                      #{payment.receipt_number}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={payment.receipt_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all inline-block"
                      >
                        <Receipt className="w-5 h-5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fees;
