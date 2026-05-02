"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, ChevronLeft, Upload, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPartner } from "@/app/actions/partners";

export default function NewPartnerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createPartner(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard/partners");
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Partenaire Ajouté !</h2>
          <p className="text-slate-500 font-medium">Le nouveau logo est maintenant visible sur le site public.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <Link 
            href="/admin/dashboard/partners" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ChevronLeft size={14} /> Annuler
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            NOUVEAU <span className="text-primary italic">PARTENAIRE</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Nom du partenaire</label>
            <input 
              name="name"
              required
              placeholder="Ex: Richardson, Daikin, etc."
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Type</label>
              <select 
                name="type"
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
              >
                <option value="Distributeur">Distributeur</option>
                <option value="Marque">Marque / Fabricant</option>
                <option value="Collaborateur">Collaborateur</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Ordre d'affichage</label>
              <input 
                name="order"
                type="number"
                defaultValue="0"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">URL du Logo (Provisoire)</label>
            <input 
              name="logo"
              required
              placeholder="/images/partners/votre-logo.png"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            <p className="text-[10px] text-slate-400 font-bold ml-2 uppercase tracking-wide">
              * Utilisez un fond transparent (.png) de préférence.
            </p>
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
                  Enregistrer le partenaire
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
