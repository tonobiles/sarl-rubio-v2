"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Camera, 
  Users, 
  Star, 
  LogOut, 
  Settings,
  ChevronRight,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const stats = [
    { label: "Réalisations", count: 12, icon: Camera, color: "text-blue-500" },
    { label: "Partenaires", count: 6, icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            TABLEAU DE <span className="text-primary italic">BORD</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Bienvenue dans votre espace de gestion SARL RUBIO</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.count}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Settings size={20} className="text-primary" />
            Actions Rapides
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Radar AO Publics", icon: TrendingUp, href: "/admin/dashboard/appels-offres", color: "bg-blue-500/10 text-blue-500" },
              { title: "Ajouter un Chantier", icon: Camera, href: "/admin/dashboard/realisations/new", color: "bg-primary/10 text-primary" },
              { title: "Nouveau Partenaire", icon: Users, href: "/admin/dashboard/partners/new", color: "bg-primary/10 text-primary" },
              { title: "Profil & Sécurité", icon: Settings, href: "/admin/dashboard/settings", color: "bg-primary/10 text-primary" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.color || "bg-primary/10 text-primary"}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-between">
                  {item.title}
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter mb-4 leading-tight">
              VOTRE SITE EST <br />
              <span className="italic opacity-80">SOUS CONTRÔLE.</span>
            </h2>
            <p className="text-white/80 font-medium mb-8 max-w-sm">
              Toutes vos données sont synchronisées en temps réel avec votre base de données Cloud.
            </p>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Base de données active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
