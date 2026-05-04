"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Building2, 
  Euro,
  AlertTriangle,
  Zap,
  Globe,
  Star,
  Archive,
  Inbox,
  Filter
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
  const [activeTab, setActiveTab] = useState<'new' | 'selection' | 'archive'>('new');
  const [sortBy, setSortBy] = useState('datePublication');
  const [sortDir, setSortDir] = useState('desc');
  
  // États de persistance locale
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  // Chargement de la persistance au démarrage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedFavs = localStorage.getItem('ao_favorites');
    const savedHidden = localStorage.getItem('ao_hidden');
    const savedRetention = localStorage.getItem('ao_retention_date');
    
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHidden) setHiddenIds(JSON.parse(savedHidden));
    
    // Logique de rétention de 90 jours
    const now = new Date();
    if (savedRetention) {
      const lastCleanup = new Date(savedRetention);
      const diffDays = (now.getTime() - lastCleanup.getTime()) / (1000 * 3600 * 24);
      if (diffDays > 90) {
        localStorage.removeItem('ao_favorites');
        localStorage.removeItem('ao_hidden');
        setFavorites([]);
        setHiddenIds([]);
        localStorage.setItem('ao_retention_date', now.toISOString());
      }
    } else {
      localStorage.setItem('ao_retention_date', now.toISOString());
    }
  }, []);

  // Sauvegarde auto des favoris
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ao_favorites', JSON.stringify(favorites));
    localStorage.setItem('ao_hidden', JSON.stringify(hiddenIds));
  }, [favorites, hiddenIds]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ao/boamp?limit=60');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecords(data.records || []);
      setLastUpdate(new Date());
    } catch (e) {
      setError("Erreur de synchronisation avec le flux BOAMP.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Actions
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const moveToArchive = (id: string) => {
    setHiddenIds(prev => [...prev, id]);
    setFavorites(prev => prev.filter(i => i !== id));
  };

  const restoreFromArchive = (id: string) => {
    setHiddenIds(prev => prev.filter(i => i !== id));
  };

  // Filtrage intelligent par onglet
  const filtered = useMemo(() => {
    return records
      .filter(r => {
        const isFav = favorites.includes(r.id);
        const isHidden = hiddenIds.includes(r.id);
        const daysUntil = getDaysUntil(r.dateLimite);
        const isExpired = daysUntil !== null && daysUntil < 0;

        if (activeTab === 'selection') return isFav && !isExpired;
        if (activeTab === 'archive') return isHidden || isExpired;
        return !isFav && !isHidden && !isExpired;
      })
      .filter(r => {
        if (!search) return true;
        const q = search.toLowerCase();
        return r.objet?.toLowerCase().includes(q) || r.acheteur?.toLowerCase().includes(q);
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
  }, [records, favorites, hiddenIds, activeTab, search, sortBy, sortDir]);

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Premium */}
      <div className="relative overflow-hidden p-8 md:p-12 rounded-[48px] bg-slate-900 text-white shadow-2xl shadow-slate-900/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Veille Stratégique
              </div>
              {lastUpdate && (
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Màj: {lastUpdate.toLocaleTimeString('fr-FR')}
                </div>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
              RADAR <span className="text-primary italic">AO</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-xl">
              Détection intelligente des marchés en Plomberie, Chauffage & Électricité.
            </p>
          </div>
          
          <button
            onClick={fetchAll}
            disabled={loading}
            className="group relative flex items-center gap-4 px-8 py-5 rounded-3xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 disabled:opacity-50 overflow-hidden"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} />
            {loading ? "Synchro..." : "Actualiser"}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-100 dark:bg-slate-900/50 rounded-[32px] w-fit">
        {[
          { id: 'new', label: 'Nouveaux', icon: Inbox, count: records.filter(r => !favorites.includes(r.id) && !hiddenIds.includes(r.id) && (getDaysUntil(r.dateLimite) ?? 0) >= 0).length },
          { id: 'selection', label: 'Ma Sélection', icon: Star, count: favorites.length },
          { id: 'archive', label: 'Archives', icon: Archive, count: hiddenIds.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={`px-2 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
        <input
          type="text"
          placeholder="Rechercher par ville, acheteur ou mots-clés..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-8 py-5 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm shadow-sm transition-all"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[40px] border border-white dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Métier</th>
                <th 
                  className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort('objet')}
                >
                  Marché {sortBy === 'objet' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1" size={12} /> : <ChevronDown className="inline ml-1" size={12} />)}
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Acheteur</th>
                <th 
                  className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors text-center"
                  onClick={() => toggleSort('dateLimite')}
                >
                  Échéance {sortBy === 'dateLimite' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1" size={12} /> : <ChevronDown className="inline ml-1" size={12} />)}
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <RefreshCw className="animate-spin text-primary mx-auto mb-4" size={40} />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Scanning flux...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center text-slate-400 font-bold italic text-sm">
                    Aucun appel d'offres dans cette catégorie.
                  </td>
                </tr>
              ) : (
                filtered.map((r, idx) => {
                  const cpvInfo = getCPVInfo(r.cpv);
                  const daysUntil = getDaysUntil(r.dateLimite);
                  const isUrgent = daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
                  const isExpired = daysUntil !== null && daysUntil < 0;
                  const isFav = favorites.includes(r.id);

                  return (
                    <tr key={r.id || idx} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                      <td className="px-8 py-8">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap shadow-sm ${cpvInfo.bg} ${cpvInfo.color}`}>
                          {cpvInfo.label}
                        </span>
                      </td>
                      <td className="px-8 py-8 max-w-md">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {r.objet}
                          </p>
                          {r.categories && (
                            <div className="flex flex-wrap gap-1.5">
                              {(Array.isArray(r.categories) ? r.categories : r.categories.split(';')).slice(0, 2).map((cat: string, i: number) => (
                                <span key={i} className="text-[8px] px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-500 rounded border border-slate-100 dark:border-slate-700 font-bold uppercase">
                                  {cat.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                              <MapPin size={12} className="text-primary/60" /> {r.departement}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex flex-col text-slate-600 dark:text-slate-400 font-bold text-xs">
                          <div className="flex items-center gap-2">
                            <Building2 size={14} className="shrink-0 text-slate-300" />
                            <span className="line-clamp-1">{r.acheteur}</span>
                          </div>
                          <span className="text-[9px] text-slate-400 font-medium mt-1">Publié le {new Date(r.datePublication).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <p className={`text-sm font-black ${isUrgent ? "text-red-500" : isExpired ? "text-slate-400" : "text-slate-900 dark:text-white"}`}>
                            {r.dateLimite ? new Date(r.dateLimite).toLocaleDateString('fr-FR') : "N/C"}
                          </p>
                          {daysUntil !== null && !isExpired && (
                            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isUrgent ? "bg-red-500 text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                              {daysUntil === 0 ? "Aujourd'hui" : `J-${daysUntil}`}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleFavorite(r.id)}
                            className={`p-3 rounded-2xl transition-all ${isFav ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500"}`}
                          >
                            <Star size={16} fill={isFav ? "currentColor" : "none"} />
                          </button>
                          
                          {activeTab === 'archive' ? (
                            <button onClick={() => restoreFromArchive(r.id)} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-green-500">
                              <RefreshCw size={16} />
                            </button>
                          ) : (
                            <button onClick={() => moveToArchive(r.id)} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500">
                              <Archive size={16} />
                            </button>
                          )}

                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-primary transition-all"
                          >
                            VOIR
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
