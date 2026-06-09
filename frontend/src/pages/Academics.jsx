import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Book, Clock, Calendar } from 'lucide-react';

const Academics = () => {
  const [classes, setClasses] = useState([]);
  const [selectedSection, setSelectedSection] = useState(1); // Default to section 1
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      fetchTimetable(selectedSection);
    }
  }, [selectedSection]);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/api/classes');
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const fetchTimetable = async (sectionId) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/timetable/${sectionId}`);
      setTimetable(res.data);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group timetable by time slot and day
  const timeSlots = Array.from(new Set(timetable.map(t => t.time_slot_id))).sort();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Academic Schedule</h1>
          <p className="text-slate-500 text-sm">View and manage class timetables</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
          <Calendar className="w-5 h-5 text-primary ml-2" />
          <select 
            className="bg-transparent border-none outline-none text-sm font-semibold pr-4 py-1"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map(id => (
              <option key={id} value={id}>Class {id} - Section A1</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Weekly Timetable</h3>
          <div className="flex space-x-2">
             <div className="flex items-center space-x-2 text-xs text-slate-500">
                <div className="w-3 h-3 bg-primary/10 border border-primary/20 rounded"></div>
                <span>Lecture</span>
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32 border-r border-slate-100">Time Slot</th>
                {days.map(day => (
                  <th key={day} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-r border-slate-100 last:border-r-0">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center text-slate-400">Loading schedule...</td>
                </tr>
              ) : timetable.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center text-slate-400">No timetable entries found for this section.</td>
                </tr>
              ) : (
                // Simplistic grid logic for the prototype
                Array.from(new Set(timetable.map(t => t.start_time))).map((time) => (
                  <tr key={time} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4 border-r border-slate-100">
                      <div className="flex items-center space-x-2 text-primary">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-bold">{time.substring(0, 5)}</span>
                      </div>
                    </td>
                    {days.map(day => {
                      const entry = timetable.find(t => t.start_time === time && t.day_of_week === day);
                      return (
                        <td key={`${time}-${day}`} className="px-2 py-2 border-r border-slate-100 last:border-r-0">
                          {entry ? (
                            <div className="bg-primary/5 border border-primary/10 p-3 rounded-xl text-center">
                              <p className="text-sm font-bold text-primary">{entry.subject_name}</p>
                              <p className="text-[10px] text-slate-500 mt-1 font-medium">{entry.teacher_name}</p>
                            </div>
                          ) : (
                            <div className="h-full min-h-[60px] flex items-center justify-center">
                              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest italic">Free</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
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

export default Academics;
