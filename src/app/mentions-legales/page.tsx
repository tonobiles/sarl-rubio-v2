"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, FileText, Scale } from "lucide-react";
import Link from "next/link";

export default function MentionsLegales() {
  const sections = [
    {
      title: "1. Présentation du site",
      content: `En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site sarl-rubio.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :`,
      details: [
        "Propriétaire : SARL Rubio – 1593 Rte d'Avignon, 84320 Entraigues-sur-la-Sorgue",
        "Responsable publication : Sylvain DI VITO",
        "Hébergeur : O2SWITCH – Chemin des Pardiaux, 63000 Clermont-Ferrand",
        "Crédits : SARL Rubio"
      ]
    },
    {
      title: "2. Conditions générales d'utilisation",
      content: "L'utilisation du site sarl-rubio.fr implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, les utilisateurs du site sarl-rubio.fr sont donc invités à les consulter de manière régulière."
    },
    {
      title: "3. Description des services fournis",
      content: "Le site sarl-rubio.fr a pour objet de fournir une information concernant l'ensemble des activités de la société. SARL Rubio s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour."
    },
    {
      title: "4. Propriété intellectuelle et contrefaçons",
      content: "SARL Rubio est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable de : SARL Rubio."
    },
    {
      title: "5. Limitations de responsabilité",
      content: "SARL Rubio ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site sarl-rubio.fr, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées, soit de l’apparition d’un bug ou d’une incompatibilité."
    },
    {
      title: "6. Gestion des données personnelles",
      content: "En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995. À l'occasion de l'utilisation du site sarl-rubio.fr, peuvent êtres recueillies : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6"
            >
              Accueil <ChevronRight size={14} /> Mentions Légales
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
              MENTIONS <br />
              <span className="text-primary italic">LÉGALES</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Informations obligatoires concernant l'éditeur du site et les conditions d'utilisation.
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Scale size={16} />
                  </div>
                  {section.title}
                </h2>
                <div className="pl-11">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  {section.details && (
                    <ul className="space-y-2">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-500 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-400 font-medium italic">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
