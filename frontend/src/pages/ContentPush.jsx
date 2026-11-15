import React, { useState } from 'react';
import { 
  Radio, 
  Video, 
  BookOpen, 
  Send, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  Play, 
  Pause, 
  Volume2, 
  Tv, 
  Sparkles, 
  Layers, 
  Upload, 
  FileText, 
  Music, 
  Eye, 
  ShieldAlert,
  UserCheck,
  PlaySquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Helper to extract YouTube Video ID
const extractYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

// Initial Mock Content Feeds
const INITIAL_EDUCATION = [
  {
    id: 'edu-1',
    title: 'Introduction to Advanced Quantum Physics',
    category: 'Science & Physics',
    targetGrade: 'Grade 11 - 12',
    mediaUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Comprehensive overview of wave-particle duality and introductory quantum states.',
    status: 'Published',
    pushedBy: 'Staff Member (Ravi Kumar)',
    createdAt: '2026-07-24'
  },
  {
    id: 'edu-2',
    title: 'Full Stack Web Development Essentials',
    category: 'Computer Science',
    targetGrade: 'All Grades',
    mediaUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    description: 'Learn HTML, CSS, JavaScript and React framework fundamentals.',
    status: 'Published',
    pushedBy: 'Staff Member (Anita Roy)',
    createdAt: '2026-07-23'
  }
];

const INITIAL_YOUTUBE = [
  {
    id: 'yt-1',
    title: 'Live Educational Science Experiments & Space Explorations',
    url: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    youtubeId: '21X5lGlDOfg',
    category: 'Science Broadcast',
    description: 'Interactive space exploration live stream for students.',
    featured: true,
    status: 'Live Pushed',
    pushedBy: 'Staff Member (Ravi Kumar)'
  },
  {
    id: 'yt-2',
    title: 'Mathematics Problem Solving Techniques',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Mathematics',
    description: 'Quick tricks for solving algebra and calculus equations.',
    featured: false,
    status: 'Live Pushed',
    pushedBy: 'Staff Member (Anita Roy)'
  }
];

const INITIAL_RADIO = [
  {
    id: 'rad-1',
    name: 'SD EduStream Campus Radio 91.1 FM',
    frequency: '91.1 FM',
    genre: 'Educational Talks & News',
    streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60',
    status: 'Broadcasting Live',
    pushedBy: 'Staff Radio Operator'
  },
  {
    id: 'rad-2',
    name: 'World News & Cultural Beats Radio',
    frequency: '104.5 FM',
    genre: 'News & Classical Music',
    streamUrl: 'https://stream.zeno.fm/65bfg9y8dg8uv',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=60',
    status: 'Broadcasting Live',
    pushedBy: 'Staff Radio Operator'
  }
];

const ContentPush = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('education');

  // Datasets
  const [educationList, setEducationList] = useState(INITIAL_EDUCATION);
  const [youtubeList, setYoutubeList] = useState(INITIAL_YOUTUBE);
  const [radioList, setRadioList] = useState(INITIAL_RADIO);

  // Forms State
  const [eduForm, setEduForm] = useState({
    title: '',
    category: 'Science & Physics',
    targetGrade: 'All Grades',
    mediaUrl: '',
    description: ''
  });

  const [ytForm, setYtForm] = useState({
    title: '',
    url: '',
    category: 'Educational Stream',
    description: '',
    featured: false
  });

  const [radioForm, setRadioForm] = useState({
    name: '',
    frequency: '91.1 FM',
    genre: 'Educational & Campus News',
    streamUrl: '',
    logo: ''
  });

  // Audio Preview State for Radio
  const [playingRadioId, setPlayingRadioId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Push Education Content
  const handlePushEducation = (e) => {
    e.preventDefault();
    if (!eduForm.title || !eduForm.mediaUrl) return;

    const newItem = {
      id: `edu-${Date.now()}`,
      ...eduForm,
      status: 'Published',
      pushedBy: `${user?.name || 'Staff User'} (${user?.role || 'Staff'})`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEducationList([newItem, ...educationList]);
    setEduForm({ title: '', category: 'Science & Physics', targetGrade: 'All Grades', mediaUrl: '', description: '' });
    showToast('🚀 Education Content successfully pushed to all students!');
  };

  // Push YouTube Stream
  const handlePushYouTube = (e) => {
    e.preventDefault();
    if (!ytForm.title || !ytForm.url) return;

    const ytId = extractYouTubeId(ytForm.url);
    const newItem = {
      id: `yt-${Date.now()}`,
      ...ytForm,
      youtubeId: ytId,
      status: 'Live Pushed',
      pushedBy: `${user?.name || 'Staff User'} (${user?.role || 'Staff'})`
    };

    setYoutubeList([newItem, ...youtubeList]);
    setYtForm({ title: '', url: '', category: 'Educational Stream', description: '', featured: false });
    showToast('📺 YouTube Stream successfully broadcasted to PiShow!');
  };

  // Push FM Radio Station
  const handlePushRadio = (e) => {
    e.preventDefault();
    if (!radioForm.name || !radioForm.streamUrl) return;

    const newItem = {
      id: `rad-${Date.now()}`,
      ...radioForm,
      logo: radioForm.logo || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=60',
      status: 'Broadcasting Live',
      pushedBy: `${user?.name || 'Staff User'} (${user?.role || 'Staff'})`
    };

    setRadioList([newItem, ...radioList]);
    setRadioForm({ name: '', frequency: '91.1 FM', genre: 'Educational & Campus News', streamUrl: '', logo: '' });
    showToast('📻 FM Radio station successfully pushed live!');
  };

  const handleDeleteItem = (id, type) => {
    if (type === 'education') setEducationList(educationList.filter(item => item.id !== id));
    if (type === 'youtube') setYoutubeList(youtubeList.filter(item => item.id !== id));
    if (type === 'radio') setRadioList(radioList.filter(item => item.id !== id));
    showToast('Deleted content feed.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Radio className="w-96 h-96 -mr-20 -mt-20 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Staff Content Broadcast Console</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Push & Broadcast Center</h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Staff module to push live <span className="text-blue-300 font-semibold">Education modules</span>, <span className="text-red-300 font-semibold">YouTube feeds</span>, and <span className="text-amber-300 font-semibold">FM Radio Stations</span> directly to user apps & PiShow devices.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
          <div>
            <p className="text-xs text-indigo-200">Active Staff Operator</p>
            <p className="text-sm font-bold text-white">{user?.name || 'Staff User'} ({user?.role || 'Staff'})</p>
          </div>
        </div>
      </div>

      {/* Channel Navigation Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('education')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all flex-1 justify-center whitespace-nowrap ${
            activeTab === 'education'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Education Content</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">{educationList.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all flex-1 justify-center whitespace-nowrap ${
            activeTab === 'youtube'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>2. YouTube Content</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">{youtubeList.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('radio')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all flex-1 justify-center whitespace-nowrap ${
            activeTab === 'radio'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>3. FM Radio Channels</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">{radioList.length}</span>
        </button>
      </div>

      {/* TAB 1: EDUCATION CONTENT */}
      {activeTab === 'education' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Push Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2 text-blue-600 font-bold">
              <Upload className="w-5 h-5" />
              <h2 className="text-lg">Push Education Material</h2>
            </div>
            <p className="text-xs text-slate-500">Publish video lectures, study materials, or PDFs for students.</p>

            <form onSubmit={handlePushEducation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Title</label>
                <input 
                  type="text" 
                  required
                  value={eduForm.title}
                  onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })}
                  placeholder="e.g. Advanced Thermodynamics Lecture"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Subject Category</label>
                  <select 
                    value={eduForm.category}
                    onChange={(e) => setEduForm({ ...eduForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  >
                    <option value="Science & Physics">Science & Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Languages & Literature">Languages</option>
                    <option value="General Skill Training">General Skills</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Target Grade</label>
                  <select 
                    value={eduForm.targetGrade}
                    onChange={(e) => setEduForm({ ...eduForm, targetGrade: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  >
                    <option value="All Grades">All Grades</option>
                    <option value="Grade 1 - 5">Grade 1 - 5</option>
                    <option value="Grade 6 - 10">Grade 6 - 10</option>
                    <option value="Grade 11 - 12">Grade 11 - 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Media / Attachment URL</label>
                <input 
                  type="url" 
                  required
                  value={eduForm.mediaUrl}
                  onChange={(e) => setEduForm({ ...eduForm, mediaUrl: e.target.value })}
                  placeholder="https://example.com/lecture.mp4 or pdf"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Description</label>
                <textarea 
                  rows="3"
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  placeholder="Short description of educational topic..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Push Education Content Now</span>
              </button>
            </form>
          </div>

          {/* Active Education Feeds */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Currently Pushed Educational Feeds ({educationList.length})</h2>
            <div className="space-y-4">
              {educationList.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start justify-between gap-4 group hover:border-blue-200 transition-all">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                        {item.targetGrade}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.description}</p>
                    <p className="text-[11px] text-slate-400 italic">Pushed by: {item.pushedBy} on {item.createdAt}</p>
                  </div>

                  <div className="flex md:flex-col items-center justify-end space-x-2 md:space-x-0 md:space-y-2 w-full md:w-auto">
                    <a 
                      href={item.mediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1 text-xs font-bold px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all w-full justify-center"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Content</span>
                    </a>
                    <button 
                      onClick={() => handleDeleteItem(item.id, 'education')}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Unpush / Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: YOUTUBE CONTENT */}
      {activeTab === 'youtube' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Push YouTube Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2 text-red-600 font-bold">
              <Video className="w-5 h-5" />
              <h2 className="text-lg">Push YouTube Video / Stream</h2>
            </div>
            <p className="text-xs text-slate-500">Staff push YouTube videos to PiShow and student apps.</p>

            <form onSubmit={handlePushYouTube} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Video Title</label>
                <input 
                  type="text" 
                  required
                  value={ytForm.title}
                  onChange={(e) => setYtForm({ ...ytForm, title: e.target.value })}
                  placeholder="e.g. Science Experiment Live stream"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">YouTube URL or ID</label>
                <input 
                  type="text" 
                  required
                  value={ytForm.url}
                  onChange={(e) => setYtForm({ ...ytForm, url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* YouTube Embed Preview in Form */}
              {ytForm.url && (
                <div className="rounded-2xl overflow-hidden border border-red-200 bg-slate-900 aspect-video relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(ytForm.url)}`}
                    title="Preview"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Category</label>
                <input 
                  type="text" 
                  value={ytForm.category}
                  onChange={(e) => setYtForm({ ...ytForm, category: e.target.value })}
                  placeholder="e.g. Science Broadcast"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Description</label>
                <textarea 
                  rows="2"
                  value={ytForm.description}
                  onChange={(e) => setYtForm({ ...ytForm, description: e.target.value })}
                  placeholder="Short video description..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast YouTube Video</span>
              </button>
            </form>
          </div>

          {/* Active YouTube Feeds */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Broadcasted YouTube Channels ({youtubeList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {youtubeList.map(item => (
                <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                  <div className="aspect-video bg-slate-900 relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-red-50 text-red-700 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span>{item.status}</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Pushed by: {item.pushedBy}</span>
                      <button 
                        onClick={() => handleDeleteItem(item.id, 'youtube')}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove Broadcast"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FM RADIO CONTENT */}
      {activeTab === 'radio' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Push FM Radio Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2 text-amber-600 font-bold">
              <Radio className="w-5 h-5" />
              <h2 className="text-lg">Push Live FM Radio Station</h2>
            </div>
            <p className="text-xs text-slate-500">Staff push live audio stream & radio frequencies.</p>

            <form onSubmit={handlePushRadio} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Radio Station Name</label>
                <input 
                  type="text" 
                  required
                  value={radioForm.name}
                  onChange={(e) => setRadioForm({ ...radioForm, name: e.target.value })}
                  placeholder="e.g. EduStream Campus Radio"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Frequency</label>
                  <input 
                    type="text" 
                    value={radioForm.frequency}
                    onChange={(e) => setRadioForm({ ...radioForm, frequency: e.target.value })}
                    placeholder="91.1 FM"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Genre / Format</label>
                  <input 
                    type="text" 
                    value={radioForm.genre}
                    onChange={(e) => setRadioForm({ ...radioForm, genre: e.target.value })}
                    placeholder="News & Talks"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Stream Audio URL</label>
                <input 
                  type="url" 
                  required
                  value={radioForm.streamUrl}
                  onChange={(e) => setRadioForm({ ...radioForm, streamUrl: e.target.value })}
                  placeholder="https://stream.zeno.fm/... or mp3 stream"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Stream Preview Audio Player */}
              {radioForm.streamUrl && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <p className="text-xs font-bold text-amber-800 flex items-center space-x-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test Audio Stream Live</span>
                  </p>
                  <audio controls className="w-full h-8" src={radioForm.streamUrl}>
                    Your browser does not support audio element.
                  </audio>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Radio Station Live</span>
              </button>
            </form>
          </div>

          {/* Active Radio Stations */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Active Broadcasted Radio Stations ({radioList.length})</h2>
            <div className="space-y-4">
              {radioList.map(station => (
                <div key={station.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 group hover:border-amber-200 transition-all">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={station.logo} 
                      alt={station.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                          {station.frequency}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">{station.genre}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-0.5">{station.name}</h3>
                      <p className="text-xs text-emerald-600 font-semibold flex items-center space-x-1 mt-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span>{station.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <audio controls className="h-9 w-48 sm:w-56" src={station.streamUrl}></audio>
                    <button 
                      onClick={() => handleDeleteItem(station.id, 'radio')}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Remove Station"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPush;
