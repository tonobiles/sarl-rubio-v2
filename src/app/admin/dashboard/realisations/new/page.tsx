"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, Upload, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/actions/projects";

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createProject(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard/realisations");
      }, 2000);
    } else {
      alert("Erreur lors de la création");
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 p-12 rounded-[40px] text-center shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Chantier Ajouté !</h2>
          <p className="text-slate-500 font-medium">Votre nouvelle réalisation est maintenant visible sur le site public.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link 
            href="/admin/dashboard/realisations" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ChevronLeft size={14} /> Annuler
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            AJOUTER UN <span className="text-primary italic">CHANTIER</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Titre du projet</label>
              <input 
                name="title"
                required
                placeholder="Ex: Climatisation Cabinet Médical"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Catégorie</label>
              <select 
                name="category"
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
              >
                <option value="Plomberie">Plomberie</option>
                <option value="Chauffage">Chauffage</option>
                <option value="Climatisation">Climatisation</option>
                <option value="VMC">VMC</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Lieu (Ville)</label>
            <input 
              name="location"
              placeholder="Ex: Entraigues-sur-la-Sorgue"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Photos du chantier</label>
            <div className="relative">
              <div className="w-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] p-12 hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer relative overflow-hidden">
                <input 
                  type="file" 
                  name="images"
                  required
                  multiple
                  accept="image/*"
                  onChange={(e) => setSelectedCount(e.target.files?.length || 0)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="text-center group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-black text-slate-600 dark:text-slate-300">
                    {selectedCount > 0 ? `${selectedCount} photos sélectionnées` : "Cliquez pour choisir plusieurs photos"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {selectedCount > 0 ? "Cliquez pour modifier la sélection" : "Sélection multiple autorisée"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Mettre en ligne le chantier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
