import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  School,
  Bell,
  Radio,
  Tv,
  Send,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Customers', icon: Users, path: '/customers', badge: 'Expiry Tracker' },
    { name: 'Push Content', icon: Radio, path: '/content-push', badge: 'Staff Special' },
    { name: 'Teachers & Staff', icon: UserRound, path: '/teachers' },
    { name: 'Academics', icon: BookOpen, path: '/academics' },
    { name: 'Attendance', icon: Calendar, path: '/attendance' },
    { name: 'Fees', icon: CreditCard, path: '/fees' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentRole = user?.role || 'Staff';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
          <div className="bg-primary p-2 rounded-xl shadow-md shadow-primary/20">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 leading-none block">SD EduStream</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Management Hub</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-tight ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Role Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Staff User'}</p>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{currentRole}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-slate-600 hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <button 
            className="md:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 md:flex-none">
            <h2 className="text-xl font-bold text-slate-900 hidden md:block">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Admin & Staff Console'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/content-push" 
              className="hidden sm:flex items-center space-x-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-amber-200 transition-all"
            >
              <Radio className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Broadcast Center</span>
            </Link>

            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.name || 'Staff Member'}</p>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{currentRole}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-md shadow-indigo-600/20">
                {user?.name?.charAt(0) || 'S'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary p-2 rounded-xl">
                      <School className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900">SD EduStream</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        location.pathname === item.path 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>

              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 text-slate-600 hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
