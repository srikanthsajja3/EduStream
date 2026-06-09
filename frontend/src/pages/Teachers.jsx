import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Search, UserPlus, Mail, Phone, MoreVertical } from 'lucide-react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await api.get('/api/teachers');
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject_specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff & Faculty</h1>
          <p className="text-slate-500 text-sm">Manage teaching and non-teaching staff</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <UserPlus className="w-5 h-5" />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialization..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400">Loading staff records...</div>
        ) : filteredTeachers.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400">No staff found matching your search.</div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative">
              <button className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
              
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400">
                  {teacher.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-all">{teacher.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{teacher.subject_specialization || 'General'}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-slate-600">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{teacher.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{teacher.phone || 'No phone provided'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {teacher.status}
                </span>
                <span className="text-xs text-slate-400">ID: {teacher.id.substring(0, 8)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Teachers;
