"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Users, ChevronLeft, Loader2, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPartners, deletePartner } from "@/app/actions/partners";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchPartners = async () => {
    setIsLoading(true);
    const data = await getPartners();
    setPartners(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce partenaire ?")) {
      setIsDeleting(id);
      const result = await deletePartner(id);
      if (result.success) {
        setPartners(partners.filter(p => p.id !== id));
      }
      setIsDeleting(null);
    }
  };

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ChevronLeft size={14} /> Retour
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                GÉRER LES <span className="text-primary italic">PARTENAIRES</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1">{partners.length} partenaires enregistrés</p>
            </div>
            
            <Link 
              href="/admin/dashboard/partners/new"
              className="px-8 py-4 rounded-2xl bg-primary text-white font-black flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus size={20} /> Ajouter un partenaire
            </Link>
          </div>
        </header>

        <div className="mb-8 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Rechercher un partenaire..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium shadow-sm"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="font-bold text-slate-400">Chargement...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence>
              {filteredPartners.map((partner) => (
                <motion.div
                  key={partner.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 relative group"
                >
                  <div className="w-full h-24 bg-white rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white text-sm tracking-tight mb-1 text-center">{partner.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{partner.type}</p>
                  
                  <button 
                    onClick={() => handleDelete(partner.id)}
                    disabled={isDeleting === partner.id}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    {isDeleting === partner.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
