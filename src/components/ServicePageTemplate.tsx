"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, Mail, ChevronRight } from "lucide-react";

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  prestations: { title: string; items: string[] }[];
  accentColor?: string;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  image,
  features,
  prestations,
  accentColor = "primary"
}: ServicePageTemplateProps) {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8"
            >
              Accueil <ChevronRight size={14} /> {title}
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? `text-${accentColor} italic` : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
              Expertise & Savoir-faire
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {prestations.map((group, i) => (
                <motion.div 
                  key={group.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg bg-${accentColor}/10 text-${accentColor} flex items-center justify-center text-sm`}>
                      {i + 1}
                    </span>
                    {group.title}
                  </h3>
                  <ul className="space-y-4">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-500 dark:text-slate-400 font-medium">
                        <CheckCircle2 size={18} className={`text-${accentColor} shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="lg:w-1/3 space-y-8">
            <div className="glass p-8 rounded-3xl sticky top-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Demander un devis</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">
                Vous avez un projet ou une urgence ? Nos experts vous répondent sous 24h avec un devis gratuit et personnalisé.
              </p>
              
              <div className="space-y-4 mb-8">
                <a 
                  href="tel:0490833215" 
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-${accentColor} text-white font-black justify-center shadow-lg shadow-${accentColor}/20 hover:scale-[1.02] transition-transform`}
                >
                  <Phone size={20} />
                  04 90 88 24 77
                </a>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 text-white font-black justify-center hover:bg-slate-800 transition-colors"
                >
                  <Mail size={20} />
                  Contact Email
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${accentColor}/5 flex items-center justify-center text-${accentColor}`}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Qualité</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Certification RGE / Qualibat</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
