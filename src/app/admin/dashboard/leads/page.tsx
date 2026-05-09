"use client";

import { useState, useEffect } from "react";
import { 
  Inbox, 
  Search, 
  Calendar, 
  Phone, 
  Mail, 
  AlertCircle,
  MoreVertical,
  Trash2,
  Eye,
  Archive,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const selectedLead = leads.find(l => l.id === openMenuId);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads(prev =>
          prev.map(lead =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
      }
    } catch (error) {
      console.error("Failed to update lead status");
    } finally {
      setOpenMenuId(null);
    }
  };

  const deleteLead = async (leadId: string) => {
    setDeletingId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== leadId));
      }
    } catch (error) {
      console.error("Failed to delete lead");
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEU":
        return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Nouveau</span>;
      case "LU":
        return <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Lu</span>;
      case "ARCHIVE":
        return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">Archivé</span>;
      default:
        return null;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                         (lead.email || "").toLowerCase().includes(search.toLowerCase()) ||
                         lead.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            DEMANDES <span className="text-primary italic">CLIENTS</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Gérez vos prospects et demandes de devis.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Inbox size={20} />
             </div>
             <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{leads.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Leads</p>
             </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email ou contenu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-4 focus:ring-primary/10 outline-none font-bold text-sm shadow-sm transition-all"
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 font-bold text-xs uppercase tracking-widest outline-none shadow-sm focus:ring-4 focus:ring-primary/10"
        >
          <option value="ALL">Tous les statuts</option>
          <option value="NEU">Nouveaux</option>
          <option value="LU">Lus</option>
          <option value="ARCHIVE">Archivés</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objet</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">Chargement des demandes...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">Aucune demande trouvée.</td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">{lead.name}</span>
                        <div className="flex items-center gap-3 mt-1 opacity-60">
                           <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                           {lead.phone && <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{lead.subject || "CONTACT"}</span>
                        <p className="text-xs text-slate-500 line-clamp-1 italic">"{lead.message}"</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Calendar size={12} />
                        {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button 
                         onClick={() => setOpenMenuId(lead.id)}
                         className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                       >
                          <MoreVertical size={16} />
                       </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip */}
      <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 flex items-center gap-4">
        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <AlertCircle size={20} />
        </div>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Astuce : Pensez à mettre à jour le statut des demandes après avoir rappelé vos clients pour un meilleur suivi commercial.
        </p>
      </div>

      {/* ===== MODALE ACTIONS ===== */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setOpenMenuId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(selectedLead.status)}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white truncate">
                    {selectedLead.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    {selectedLead.email && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail size={12} /> {selectedLead.email}
                      </span>
                    )}
                    {selectedLead.phone && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone size={12} /> {selectedLead.phone}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setOpenMenuId(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Message */}
              <div className="px-6 pb-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                    {selectedLead.subject || "Message"}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{selectedLead.message}"
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 space-y-2">
                {selectedLead.status !== "LU" && (
                  <button
                    onClick={() => updateLeadStatus(selectedLead.id, "LU")}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                      <Eye size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-green-700 dark:text-green-400">Marquer comme Lu</p>
                      <p className="text-[10px] text-green-600/60 dark:text-green-500/50 font-medium">La demande a été consultée</p>
                    </div>
                  </button>
                )}

                {selectedLead.status !== "ARCHIVE" && (
                  <button
                    onClick={() => updateLeadStatus(selectedLead.id, "ARCHIVE")}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-500 text-white flex items-center justify-center shadow-lg shadow-slate-500/20">
                      <Archive size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-700 dark:text-slate-300">Archiver</p>
                      <p className="text-[10px] text-slate-400 font-medium">Déplacer dans les archives</p>
                    </div>
                  </button>
                )}

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                <button
                  onClick={() => {
                    if (confirm(`Supprimer la demande de "${selectedLead.name}" ? Cette action est irréversible.`)) {
                      deleteLead(selectedLead.id);
                    }
                  }}
                  disabled={deletingId === selectedLead.id}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Trash2 size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-red-500">
                      {deletingId === selectedLead.id ? "Suppression..." : "Supprimer"}
                    </p>
                    <p className="text-[10px] text-red-400/60 font-medium">Action irréversible</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
