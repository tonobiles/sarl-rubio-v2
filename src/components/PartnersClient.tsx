"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Award, Users, ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: string;
  order: number;
}

export default function PartnersClient({ partners }: { partners: Partner[] }) {
  const distributeurs = partners.filter(p => p.type === "Distributeur");
  const marques = partners.filter(p => p.type === "Marque");

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
            >
              Accueil <ChevronRight size={14} /> Nos Partenaires
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
              NOS <br />
              <span className="text-primary italic">PARTENAIRES</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium">
              Nous sélectionnons les meilleurs collaborateurs et fabricants pour vous garantir 
              des installations durables et performantes.
            </p>
          </motion.div>

          {/* Intro Team Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Une expertise de terrain</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Au-delà des marques, c'est avant tout une équipe de techniciens passionnés qui œuvre chaque jour dans le Vaucluse. 
                Formés aux dernières technologies, nos collaborateurs mettent leur savoir-faire au service de votre confort.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <ShieldCheck size={16} className="text-primary" />
                  Techniciens Certifiés
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <Award size={16} className="text-primary" />
                  Formation Continue
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <Briefcase size={16} className="text-primary" />
                  +15 ans d'expérience
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
               <Users size={80} className="text-primary opacity-20" />
               <p className="absolute text-primary font-black text-2xl tracking-tighter uppercase">Rigueur • Proximité • Qualité</p>
            </div>
          </div>

          {/* Section Distributeurs */}
          {distributeurs.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4 text-center lg:text-left">
                Nos partenaires <span className="text-primary italic">privilégiés</span>
              </h2>
              <p className="text-slate-500 mb-12 text-sm font-medium">Distributeurs & réseaux de confiance</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {distributeurs.map((partner, i) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all group flex flex-col items-center text-center"
                  >
                    <div className="w-full h-24 rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm relative overflow-hidden">
                      <Image
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 tracking-tight">{partner.name}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section Marques Fabricants */}
          {marques.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4 text-center lg:text-left">
                Nos <span className="text-primary italic">marques</span>
              </h2>
              <p className="text-slate-500 mb-10 text-sm font-medium">Fabricants sélectionnés pour leur qualité et fiabilité</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {marques.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-lg"
                  >
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">{m.name}</p>
                    <div className="relative w-full h-48">
                      <Image
                        src={m.logo}
                        alt={m.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="bg-primary py-20 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
            "La qualité de nos installations repose sur le choix rigoureux de nos partenaires et l'exigence technique de nos équipes."
          </blockquote>
        </div>
      </section>
    </div>
  );
}
