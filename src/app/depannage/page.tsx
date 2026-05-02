"use client";

import { motion } from "framer-motion";
import { Phone, AlertTriangle, CheckCircle2, Wrench, Droplets, Thermometer, Wind, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DepannagePage() {
  const urgences = [
    { title: "Fuite d'eau", description: "Intervention rapide pour stopper et réparer toute fuite.", icon: Droplets },
    { title: "Panne Chauffage", description: "Dépannage de chaudières et pompes à chaleur toutes marques.", icon: Thermometer },
    { title: "Climatisation", description: "Diagnostic et recharge pour un confort retrouvé.", icon: Wind },
    { title: "Débouchage", description: "Intervention sur canalisations bouchées et sanitaires.", icon: Wrench },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
            >
              Accueil <ChevronRight size={14} /> Dépannage Urgent
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-widest mb-6 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Disponible 24h/7j pour urgences
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
              UNE URGENCE ? <br />
              <span className="text-primary italic">ON ARRIVE.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed mb-10">
              Une fuite d'eau, une panne de chauffage ou de climatisation ? 
              Nous intervenons rapidement à Entraigues et ses environs pour 
              rétablir votre confort.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="tel:0490882477" 
                className="flex items-center gap-4 px-10 py-6 rounded-[32px] bg-red-600 text-white font-black text-2xl shadow-2xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Phone size={28} />
                04 90 88 24 77
              </a>
              <Link 
                href="/contact" 
                className="flex items-center gap-4 px-10 py-6 rounded-[32px] bg-slate-900 text-white font-black text-xl hover:bg-slate-800 transition-colors shadow-xl"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {urgences.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Philosophy */}
      <section className="py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]"
            >
              <Image 
                src="/images/realisations/Sans-titre4.jpg" 
                alt="Dépannage professionnel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <p className="text-white font-black text-xl mb-2">Intervention Garantie</p>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Nous privilégions toujours la réparation pour vous faire économiser tout en garantissant la durabilité de votre installation.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight">
                LA RÉPARATION <br />
                <span className="text-primary italic">AVANT TOUT.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Contrairement à beaucoup d'entreprises qui poussent au remplacement systématique, 
                la SARL RUBIO s'engage à diagnostiquer précisément la panne pour réparer ce qui peut l'être.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Diagnostic précis et honnête",
                "Pièces détachées d'origine",
                "Tarifs transparents annoncés avant travaux",
                "Nettoyage de fin de chantier systématique"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-black tracking-tight">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
               <div className="flex items-center gap-6 p-8 rounded-[32px] bg-slate-900 text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Horaires Bureau</p>
                    <p className="text-lg font-black leading-tight">Lun - Ven : 8h00 - 18h00</p>
                    <p className="text-slate-400 text-xs font-medium mt-1">Dépannage urgent possible hors horaires</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or local focus section */}
      <section className="py-24 bg-primary px-6 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
         </div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
              INTERVENTION DANS TOUT <br />
              <span className="italic opacity-80">LE VAUCLUSE</span>
            </h2>
            <p className="text-white/80 font-medium mb-12 text-lg">
              Basés à Entraigues-sur-la-Sorgue, nous intervenons rapidement à Avignon, Vedène, Carpentras, Le Pontet, Sorgues et les communes alentours.
            </p>
            <a 
              href="tel:0490882477" 
              className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-primary font-black text-xl hover:scale-105 transition-transform shadow-2xl"
            >
              <Phone size={24} />
              Appeler un technicien
            </a>
         </div>
      </section>
    </div>
  );
}
