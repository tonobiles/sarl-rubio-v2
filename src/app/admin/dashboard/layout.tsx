import { LayoutDashboard, Camera, Users, TrendingUp, LogOut, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { label: "Vue d'ensemble", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Appels d'Offres", icon: TrendingUp, href: "/admin/dashboard/appels-offres" },
    { label: "Chantiers", icon: Camera, href: "/admin/dashboard/realisations" },
    { label: "Partenaires", icon: Users, href: "/admin/dashboard/partners" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col p-6 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 dark:text-white leading-none">ADMIN</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">SARL RUBIO</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-50 dark:border-slate-800 space-y-2">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 text-xs font-bold hover:text-slate-900 transition-colors"
          >
            <ExternalLink size={16} /> Voir le site
          </Link>
          <Link 
            href="/admin/login" 
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 text-xs font-bold hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
