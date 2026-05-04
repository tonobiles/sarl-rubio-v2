"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Mail, Bell, ExternalLink, ChevronRight, Key } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const sections = [
    {
      title: "Identifiants d'accès",
      icon: Lock,
      description: "La sécurité de votre espace est gérée via des variables d'environnement sur Vercel.",
      details: [
        { label: "Mot de passe actuel", value: "Défini sur Vercel (ADMIN_PASSWORD)", status: "Sécurisé" },
        { label: "Session", value: "24 heures", status: "Auto-déconnexion" }
      ],
      action: {
        label: "Changer le mot de passe sur Vercel",
        href: "https://vercel.com",
        icon: ExternalLink
      }
    },
    {
      title: "Notifications par email",
      icon: Mail,
      description: "Configuration de la réception des demandes de contact des clients.",
      details: [
        { label: "Email de réception", value: "contact@sarl-rubio.fr", status: "Actif" },
        { label: "Service d'envoi", value: "Resend API", status: "Connecté" }
      ],
      action: {
        label: "Gérer sur Resend.com",
        href: "https://resend.com",
        icon: ExternalLink
      }
    }
  ];

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
          PROFIL & <span className="text-primary italic">SÉCURITÉ</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">Gérez vos accès et vos préférences de notification</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <section.icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{section.title}</h2>
                    <p className="text-sm text-slate-500 font-medium">{section.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {section.details.map((detail) => (
                  <div key={detail.label} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{detail.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 dark:text-white">{detail.value}</p>
                      <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest border border-green-500/20">
                        {detail.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={section.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm hover:scale-105 transition-all group shadow-xl shadow-slate-900/10"
              >
                {section.action.label}
                <section.action.icon size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Key size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Besoin de modifier une clé API ?</h3>
          <p className="text-sm text-slate-500 font-medium">
            Toutes les clés (Prisma, Resend, Vercel Blob) sont centralisées dans vos paramètres Vercel pour une sécurité maximale.
          </p>
        </div>
        <Link 
          href="/admin/dashboard"
          className="text-primary font-black uppercase tracking-widest text-xs hover:underline flex items-center gap-2"
        >
          Retour au tableau de bord <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
