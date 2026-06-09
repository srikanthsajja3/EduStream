import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance(date);
  }, [date]);

  const fetchAttendance = async (selectedDate) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/attendance/${selectedDate}`);
      setAttendance(res.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance Tracking</h1>
          <p className="text-slate-500 text-sm">Monitor daily student presence</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
          <CalendarIcon className="w-5 h-5 text-primary ml-2" />
          <input 
            type="date" 
            className="bg-transparent border-none outline-none text-sm font-semibold pr-4 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Present</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {attendance.filter(a => a.status === 'Present').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-xl text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Absent</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {attendance.filter(a => a.status === 'Absent').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">On Leave</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {attendance.filter(a => a.status === 'Leave').length}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time Recorded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">Loading attendance data...</td>
                </tr>
              ) : attendance.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">No attendance records found for this date.</td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{record.student_name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.class_name} - {record.section_name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        record.status === 'Present' ? 'bg-green-100 text-green-700' : 
                        record.status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

export default Attendance;
