import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  School, 
  CheckCircle, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight,
  MessageSquare,
  CreditCard,
  Calendar
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Academic Management',
      desc: 'Smart timetables, subject tracking, and automated exam reports.',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Fee Automation',
      desc: 'Online payments, automated receipts, and arrears management.',
      icon: CreditCard,
      color: 'green'
    },
    {
      title: 'Attendance System',
      desc: 'Real-time student and staff tracking with instant parent alerts.',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Visual insights into institutional performance and growth metrics.',
      icon: BarChart3,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight">EduStream</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#benefits" className="hover:text-primary transition-colors">Benefits</a>
            <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-indigo-50 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>The Next Generation School ERP</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8"
            >
              Transform Your School with <span className="text-primary">EduStream</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 mb-10 leading-relaxed"
            >
              Automate operations, engage parents, and empower teachers with our 
              comprehensive, cloud-based institution management software.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all flex items-center justify-center group shadow-xl shadow-primary/20">
                Log into Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">
                Explore Features
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-100 rounded-full blur-3xl" />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Modules</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to manage your institution from admission to graduation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 text-${feature.color}-600 flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '500+', label: 'Schools' },
            { val: '200k+', label: 'Students' },
            { val: '15k+', label: 'Teachers' },
            { val: '99.9%', label: 'Uptime' }
          ].map((stat, i) => (
            <div key={i}>
              <h4 className="text-4xl font-extrabold text-white mb-1">{stat.val}</h4>
              <p className="text-indigo-100 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Why Choose Our ERP for Your Institution?</h2>
              <div className="space-y-6">
                {[
                  { t: 'WhatsApp & SMS Integration', d: 'Automated alerts for attendance and fee reminders.', i: MessageSquare },
                  { t: 'Multi-Role Access', d: 'Dedicated portals for Admin, Staff, Students & Parents.', i: Users },
                  { t: 'Cloud-Based Security', d: '100% secure, automated backups and bank-grade encryption.', i: ShieldCheck },
                  { t: 'Mobile Responsive', d: 'Manage your school on the go from any device.', i: Smartphone }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-green-50 p-2 rounded-lg mt-1">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{benefit.t}</h4>
                      <p className="text-slate-500 text-sm">{benefit.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="/images/gallery-1.jpeg" 
                  alt="School feature 1" 
                  className="rounded-3xl object-cover aspect-square shadow-xl mt-8"
                />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="/images/gallery-2.jpeg" 
                  alt="School feature 2" 
                  className="rounded-3xl object-cover aspect-square shadow-xl"
                />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="/images/gallery-3.jpeg" 
                  alt="School feature 3" 
                  className="rounded-3xl object-cover aspect-square shadow-xl -mt-8"
                />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="/images/gallery-4.jpeg" 
                  alt="School feature 4" 
                  className="rounded-3xl object-cover aspect-square shadow-xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none rounded-[3rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <School className="w-8 h-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight">EduStream</span>
          </div>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Empowering educational institutions with modern technology.
          </p>
          <div className="text-sm text-slate-500 pt-8 border-t border-slate-800">
            © 2026 EduStream Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Quick fix for missing icon imports if needed
const BookOpen = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default Home;
