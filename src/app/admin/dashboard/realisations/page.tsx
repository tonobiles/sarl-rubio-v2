"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Camera, ChevronLeft, Loader2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProjects, deleteProject } from "@/app/actions/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce chantier ?")) {
      setIsDeleting(id);
      const result = await deleteProject(id);
      if (result.success) {
        setProjects(projects.filter(p => p.id !== id));
      }
      setIsDeleting(null);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ChevronLeft size={14} /> Retour au tableau de bord
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                GÉRER LES <span className="text-primary italic">RÉALISATIONS</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1">{projects.length} chantiers en ligne</p>
            </div>
            
            <Link 
              href="/admin/dashboard/realisations/new"
              className="px-8 py-4 rounded-2xl bg-primary text-white font-black flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus size={20} /> Ajouter un chantier
            </Link>
          </div>
        </header>

        <div className="mb-8 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Rechercher un chantier (nom, catégorie...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium shadow-sm"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="font-bold text-slate-400">Chargement de vos réalisations...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <Camera size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-bold text-lg">Aucun chantier trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button 
                        onClick={() => handleDelete(project.id)}
                        disabled={isDeleting === project.id}
                        className="p-3 rounded-xl bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                       >
                         {isDeleting === project.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                       </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-1">{project.title}</h3>
                    <p className="text-slate-400 text-sm font-medium">{project.description || "Pas de lieu précisé"}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
