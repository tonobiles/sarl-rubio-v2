"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogIn, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // simulation simple pour l'exemple
    // On mettra en place une vraie vérification via API
    if (password === "admin123") { // On changera ça par une variable d'env plus tard
       document.cookie = "admin_session=true; path=/; max-age=86400";
       router.push("/admin/dashboard");
    } else {
       setError("Mot de passe incorrect");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Administration <br />
            <span className="text-primary not-italic">SARL RUBIO</span>
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Mot de passe secret</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-sm font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? "Vérification..." : "Se connecter"}
              <LogIn size={20} />
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
          Accès restreint à SARL RUBIO uniquement
        </p>
      </motion.div>
    </div>
  );
}
