import { Briefcase, MessageSquare, ExternalLink, Filter, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { getLeads, getTenders } from "@/app/actions/opportunities";

export default async function OpportunitiesPage() {
  const leads = await getLeads();
  const tenders = await getTenders();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="text-primary" size={36} />
            Centre d'Opportunités
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Gérez vos prospects et surveillez les appels d'offres du Vaucluse
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne Leads (Prospects) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="text-primary" size={24} />
              Nouveaux Prospects
            </h2>
            <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {leads.length} Demandes
            </span>
          </div>

          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Aucune demande pour le moment</p>
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900 dark:text-white">{lead.name}</h3>
                      <p className="text-primary font-bold text-sm">{lead.subject}</p>
                    </div>
                    <div className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {lead.status}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 italic">
                    "{lead.message}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    <button className="text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                      Voir le détail →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Colonne Appels d'Offres */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Briefcase className="text-primary" size={24} />
              Radar Appels d'Offres (84)
            </h2>
            <div className="flex gap-2">
               <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 Live Vaucluse
               </span>
            </div>
          </div>

          <div className="space-y-4">
            {tenders.map((tender) => (
              <div key={tender.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-[32px] p-6 border-2 border-transparent hover:border-primary/20 transition-all group">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{tender.title}</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tender.category}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4">{tender.source}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                      {tender.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12} /> Posté aujourd'hui
                      </span>
                      <a 
                        href={tender.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                      >
                        Voir l'annonce <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
