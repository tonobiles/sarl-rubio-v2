"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Clock, 
  MapPin, 
  Building2, 
  Euro,
  AlertTriangle,
  Zap,
  Globe
} from 'lucide-react';

// Mapping CPV → label + couleur
const CPV_MAP: Record<string, { label: string; bg: string; color: string }> = {
  '45330': { label: 'Plomberie',     bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400' },
  '45331': { label: 'Chauffage/Clim',bg: 'bg-red-100 dark:bg-red-900/30', color: 'text-red-600 dark:text-red-400' },
  '45332': { label: 'Sanitaire',     bg: 'bg-purple-100 dark:bg-purple-900/30', color: 'text-purple-600 dark:text-purple-400' },
  '50720': { label: 'Entretien',     bg: 'bg-amber-100 dark:bg-amber-900/30', color: 'text-amber-600 dark:text-amber-400' },
  '42511': { label: 'PAC',           bg: 'bg-cyan-100 dark:bg-cyan-900/30', color: 'text-cyan-600 dark:text-cyan-400' },
};

function getCPVInfo(cpv: any) {
  if (!cpv) return { label: 'Autre', bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-600 dark:text-slate-400' };
  const prefix = Object.keys(CPV_MAP).find(k => cpv.toString().startsWith(k));
  return prefix ? CPV_MAP[prefix] : { label: 'Divers', bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-600 dark:text-slate-400' };
}

function getDaysUntil(dateStr: string) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function AppelsOffresPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [search, setSearch] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [sortBy, setSortBy] = useState('datePublication');
  const [sortDir, setSortDir] = useState('desc');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [boampRes, tedRes] = await Promise.allSettled([
        fetch('/api/ao/boamp?limit=40').then(r => r.json()),
        fetch('/api/ao/ted?limit=20').then(r => r.json()),
      ]);

      const boampData = boampRes.status === 'fulfilled' ? boampRes.value.records || [] : [];
      const tedData = tedRes.status === 'fulfilled' ? tedRes.value.records || [] : [];

      // Fusion et dédoublonnage (par ID si possible)
      const combined = [...boampData, ...tedData];
      setRecords(combined);
      setLastUpdate(new Date());
    } catch (e) {
      setError("Une erreur est survenue lors de la synchronisation avec les plateformes BOAMP et TED.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = records
    .filter(r => {
      if (filterSource !== 'all' && r.source !== filterSource) return false;
      if (search) {
        const q = search.toLowerCase();
        return r.objet?.toLowerCase().includes(q) || r.acheteur?.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      let va = a[sortBy] || '';
      let vb = b[sortBy] || '';
      if (sortBy === 'dateLimite' || sortBy === 'datePublication') {
        va = new Date(va || 0).getTime();
        vb = new Date(vb || 0).getTime();
      }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            APPELS <span className="text-primary italic">D'OFFRES</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Veille stratégique BOAMP & TED Europa</p>
          {lastUpdate && (
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
              Dernière mise à jour : {lastUpdate.toLocaleTimeString('fr-FR')}
            </p>
          )}
        </div>
        
        <button
          onClick={fetchAll}
          disabled={loading}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 font-black text-xs uppercase tracking-widest hover:border-primary/40 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Synchronisation..." : "Rafraîchir"}
        </button>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-[32px] bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{records.length}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AO Détectés</p>
          </div>
        </div>
        <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              {records.filter(r => getDaysUntil(r.dateLimite) !== null && (getDaysUntil(r.dateLimite) ?? 0) <= 7).length}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Urgences (&lt; 7j)</p>
          </div>
        </div>
        <div className="p-6 rounded-[32px] bg-green-500/5 border border-green-500/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              {records.filter(r => r.source === 'BOAMP').length}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BOAMP (France)</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un marché, un acheteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="flex-1 md:w-48 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold text-xs uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Toutes Sources</option>
            <option value="BOAMP">BOAMP</option>
            <option value="TED">TED Europa</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-3"
          >
            <AlertTriangle size={18} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th 
                  className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('objet')}
                >
                  Marché {sortBy === 'objet' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1" size={12} /> : <ChevronDown className="inline ml-1" size={12} />)}
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Acheteur</th>
                <th 
                  className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors text-center"
                  onClick={() => toggleSort('datePublication')}
                >
                  Publié le {sortBy === 'datePublication' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1" size={12} /> : <ChevronDown className="inline ml-1" size={12} />)}
                </th>
                <th 
                  className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors text-center"
                  onClick={() => toggleSort('dateLimite')}
                >
                  Date Limite {sortBy === 'dateLimite' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1" size={12} /> : <ChevronDown className="inline ml-1" size={12} />)}
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw className="animate-spin text-primary" size={40} />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Analyse des marchés en cours...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Aucun appel d'offres ne correspond à vos critères.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((r, idx) => {
                  const cpvInfo = getCPVInfo(r.cpv);
                  const daysUntil = getDaysUntil(r.dateLimite);
                  const isUrgent = daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
                  const isExpired = daysUntil !== null && daysUntil < 0;

                  return (
                    <motion.tr 
                      key={r.id || idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${isUrgent ? "bg-red-500/[0.02]" : ""}`}
                    >
                      <td className="px-6 py-6">
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${cpvInfo.bg} ${cpvInfo.color}`}>
                          {cpvInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-6 max-w-md">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {r.objet}
                          </p>
                          {r.categories && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {r.categories.split(';').slice(0, 3).map((cat: string, i: number) => (
                                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-medium border border-slate-200 dark:border-slate-700">
                                  {cat.trim()}
                                </span>
                              ))}
                              {r.categories.split(';').length > 3 && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded border border-slate-100">
                                  +{r.categories.split(';').length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <MapPin size={10} /> {r.departement}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${r.source === 'BOAMP' ? 'text-blue-500' : 'text-green-500'}`}>
                              {r.source}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-xs">
                          <Building2 size={14} className="shrink-0" />
                          <span className="line-clamp-1">{r.acheteur}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <p className="text-xs font-bold text-slate-500">
                          {r.datePublication ? new Date(r.datePublication).toLocaleDateString('fr-FR') : "N/C"}
                        </p>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex flex-col items-center">
                          <p className={`text-sm font-black ${isUrgent ? "text-red-500" : isExpired ? "text-slate-400" : "text-slate-900 dark:text-white"}`}>
                            {r.dateLimite ? new Date(r.dateLimite).toLocaleDateString('fr-FR') : "N/C"}
                          </p>
                          {daysUntil !== null && !isExpired && (
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${isUrgent ? "text-red-500 animate-pulse" : "text-slate-400"}`}>
                              {daysUntil === 0 ? "Aujourd'hui" : `J-${daysUntil}`}
                            </p>
                          )}
                          {isExpired && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiré</p>}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-transform active:scale-95"
                        >
                          Voir <ExternalLink size={12} />
                        </a>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Legend & Help */}
      <div className="flex flex-wrap items-center gap-6 px-6 py-4 rounded-[28px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-[9px] font-black text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" /> Urgence (&lt; 7j)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" /> BOAMP (France)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" /> TED (Europe)
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Euro size={12} /> Montants affichés si disponibles dans l'avis source.
        </div>
      </div>
    </div>
  );
}
