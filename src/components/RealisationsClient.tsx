"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image: string;
}

export default function RealisationsClient({ projects }: { projects: Project[] }) {
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
              Accueil <ChevronRight size={14} /> Réalisations
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
              NOS <span className="text-primary italic">RÉALISATIONS</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium">
              Découvrez un aperçu de nos derniers chantiers en plomberie, 
              chauffage et climatisation dans tout le Vaucluse.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none h-[400px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest mb-3 w-fit">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-1">{project.title}</h3>
                  <p className="text-slate-300 text-sm font-bold flex items-center gap-2">
                    <Camera size={14} className="text-primary" />
                    {project.description || "Vaucluse"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto glass p-12 rounded-[40px] text-center border border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Votre projet commence ici</h2>
          <p className="text-slate-500 font-medium mb-10 max-w-xl mx-auto">
            Vous souhaitez réaliser des travaux similaires chez vous ? 
            Contactez-nous pour une étude gratuite de votre projet.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </div>
  );
}
