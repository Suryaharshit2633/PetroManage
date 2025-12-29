
import React from 'react';
import {
  User,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
  Calendar,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Settings,
  PencilLine
} from 'lucide-react';

// If you fetch profile data from API later, swap these with props/state.
const profileData = {
  name: 'Singh, Manohar',
  company: 'Cognizant',
  title: 'Programmer Analyst Trainee',
  department: 'Engineering',
  officeLocation: 'Pune, MH',
  manager: 'Vinayak, Patangankar Mantramurty',
  skipManager: 'Kumari, Pooja',
  email: 'manohar.singh@cognizant.com',
  phone: '+91-XXXXXXXXXX',
  skills: [
    { label: 'React', level: 4 },
    { label: 'TypeScript', level: 3 },
    { label: 'Node.js', level: 3 },
    { label: 'Tailwind CSS', level: 4 },
    { label: 'DevOps', level: 2 }
  ],
  stats: [
    { label: 'Projects', value: 12 },
    { label: 'Open Tasks', value: 7 },
    { label: 'Resolved', value: 134 },
    { label: 'On-Time %', value: '96%' }
  ],
  recentActivity: [
    {
      title: 'Deployed upstream monitoring module',
      desc: 'Optimized chart rendering & alert rules',
      date: 'Dec 22, 2025',
      icon: <BarChart3 size={18} className="text-amber-500" />
    },
    {
      title: 'Compliance checklist update',
      desc: 'Aligned with documentation ref 2.1 – 2.5',
      date: 'Dec 19, 2025',
      icon: <ClipboardList size={18} className="text-emerald-500" />
    },
    {
      title: 'Refactored asset lifecycle forms',
      desc: 'Improved validation and UX flow',
      date: 'Dec 17, 2025',
      icon: <CheckCircle2 size={18} className="text-sky-500" />
    }
  ]
};

export const Profile = () => {
  const p = profileData;

  return (
    <div className="space-y-12 pb-12">

      {/* HERO */}
      <section className="bg-[#09090b] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left: Identity */}
        <div className="p-8 md:p-16 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
            <Zap size={14} />
            <span>Profile v1.0</span>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <User size={28} className="text-zinc-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {p.name}
              </h1>
              <p className="text-zinc-400 mt-1">
                {p.title} • {p.company}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <Briefcase size={16} className="text-amber-500" />
              <span>{p.department}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin size={16} className="text-amber-500" />
              <span>{p.officeLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Mail size={16} className="text-amber-500" />
              <span>{p.email}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Phone size={16} className="text-amber-500" />
              <span>{p.phone}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition flex items-center gap-2">
              Edit Profile <PencilLine size={18} />
            </button>
            <button className="text-zinc-400 hover:text-white font-semibold underline underline-offset-4">
              View Activity
            </button>
          </div>
        </div>

        {/* Right: Status snapshot */}
        <div className="flex-1 bg-zinc-900 p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-500 uppercase">Profile Completeness</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full">
                {/* Example completeness bar */}
                <div className="h-full w-[88%] bg-amber-500 rounded-full" />
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">Completed: 88%</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck size={18} className="text-amber-500" />
                  <span className="text-xs font-bold uppercase">Compliance Ready</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  MFA enabled • Training up-to-date
                </p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Calendar size={18} className="text-amber-500" />
                  <span className="text-xs font-bold uppercase">Last Updated</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">Dec 27, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      {/* <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 uppercase">Overview</h2>
          <div className="h-[1px] flex-1 bg-gray-200 mx-6 hidden md:block" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Performance Snapshot
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {p.stats.map((s, i) => (
            <div
              key={i}
              className={`
                bg-slate-100
                border-l-4 border-amber-700
                rounded-xl p-6
                shadow-sm hover:shadow-md
                transition
              `}
            >
              <div className="mb-2 text-amber-600">
                <Settings size={18} />
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{s.value}</div>
              <div className="text-xs text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section> */}

    
      

      {/* ACTIVITY TIMELINE */}
      {/* <section className="bg-[#0b0b0e] rounded-3xl p-10 md:p-14 shadow-2xl border border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="inline-block mb-4 text-xs font-bold tracking-widest text-amber-500 uppercase">
              Managerial Chain
            </span>
            <h3 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Reporting &amp; <br />
              <span className="text-zinc-400">Governance</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Manager: {p.manager}
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Skip Manager: {p.skipManager}
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Location: {p.officeLocation}
              </li>
            </ul>
          </div>

    
          <div className="relative bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <div className="absolute top-6 left-0 bottom-6 w-1 bg-amber-500 rounded-full" />
            <span className="inline-block mb-4 text-xs font-bold tracking-widest text-amber-500 uppercase">
              Recent Activity
            </span>

            <div className="space-y-6">
              {p.recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{a.title}</h4>
                    <p className="text-zinc-400 text-xs mt-1">{a.desc}</p>
                    <p className="text-zinc-500 text-[11px] mt-1">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full md:w-auto bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition">
              See Full Timeline
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};
