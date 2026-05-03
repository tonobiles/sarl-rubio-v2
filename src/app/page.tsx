"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Phone,
  ChevronRight,
  Users,
  Wrench,
  Settings,
  Hammer,
  Star,
  Quote,
  Award,
  Zap,
  Network
} from "lucide-react";

const services = [
  {
    title: "Plomberie",
    description: "Installation, rénovation et dépannage urgent de vos équipements sanitaires.",
    icon: Droplets,
    image: "/images/plomberie.png",
    href: "/plomberie",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Chauffage",
    description: "Solutions de chauffage performantes : pompes à chaleur, chaudières gaz et entretien.",
    icon: Thermometer,
    image: "/images/chauffage.png",
    href: "/chauffage",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Climatisation",
    description: "Installation de climatisations réversibles pour un confort optimal toute l'année.",
    icon: Wind,
    image: "/images/clim.png",
    href: "/climatisation",
    color: "from-teal-500/20 to-emerald-500/20"
  }
];

const highlights = [
  { label: "Savoir-faire artisanal", title: "Expertise", icon: Award },
  { label: "Intervention sous 24/48h", title: "Réactivité", icon: Clock },
  { label: "Professionnel RGE & Qualibat", title: "Certifications", icon: ShieldCheck },
  { label: "Basé à Entraigues (84)", title: "Proximité", icon: Users },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] lg:h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="SARL RUBIO Installation moderne"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Disponible dans le Vaucluse
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              L'EXCELLENCE <br />
              <span className="text-primary italic">ARTISANALE</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed mb-10">
              SARL RUBIO : Votre partenaire de confiance pour la plomberie, 
              le chauffage et la climatisation. Intervention rapide et expertise certifiée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="group px-8 py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Demander un devis
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:0490833215" 
                className="px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Phone size={20} className="text-primary" />
                04 90 88 24 77
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 md:p-8 rounded-[32px] text-center shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{item.title}</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-6">
                NOS SERVICES <br />
                <span className="text-primary italic">SUR MESURE</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                De l'installation à la maintenance, nous couvrons tous vos besoins en génie climatique et sanitaire avec une approche moderne et durable.
              </p>
            </div>
            <Link href="/realisations" className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">
              Voir nos projets <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90`} />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary mb-4">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-slate-300 font-medium text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {service.description}
                  </p>
                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase hover:text-primary transition-colors"
                  >
                    En savoir plus <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 px-6 md:px-12 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
              POURQUOI CHOISIR <br />
              <span className="text-primary italic">SARL RUBIO ?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Expertise RGE", desc: "Économies d'énergie garanties", icon: ShieldCheck },
                { title: "Rapidité", desc: "Intervention sous 24/48h", icon: Clock },
                { title: "Qualité Qualibat", desc: "Certification métier reconnue", icon: CheckCircle2 },
                { title: "Proximité", desc: "Basé à Entraigues (84)", icon: Users },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
             {[
               { img: "/images/realisations/Sans-titre1.jpg", alt: "Installation clim" },
               { img: "/images/realisations/Sans-titre3.jpg", alt: "Chauffage" },
               { img: "/images/realisations/Sans-titre10.jpg", alt: "VMC" },
               { img: "/images/realisations/Sans-titre12.jpg", alt: "Climatisation entrepôt" }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="relative aspect-square rounded-[32px] overflow-hidden shadow-lg border border-white/10"
               >
                 <Image
                   src={item.img}
                   alt={item.alt}
                   fill
                   className="object-cover hover:scale-110 transition-transform duration-500"
                 />
               </motion.div>
             ))}
          </div>
        </div>
      </section>
      {/* Offers Section */}
      <section className="py-24 px-6 md:px-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
              NOS <span className="text-primary italic">OFFRES</span>
            </h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Des solutions adaptées à chaque besoin : de l'urgence au projet de rénovation complète.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Dépannage", 
                desc: "Intervention de notre technicien sous 24h pour toutes vos urgences.", 
                icon: Wrench,
                badge: "Rapide"
              },
              { 
                title: "Maintenance", 
                desc: "Un entretien annuel de qualité assuré par un professionnel pour votre sécurité.", 
                icon: Settings,
                badge: "Sérénité"
              },
              { 
                title: "Installation", 
                desc: "Rénovation et travaux neufs sur devis. Un engagement de qualité durable.", 
                icon: Hammer,
                badge: "Sur Mesure"
              },
            ].map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  {offer.badge}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <offer.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{offer.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                  {offer.desc}
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest group/link"
                >
                  En savoir plus 
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                AVIS <span className="text-primary italic">CLIENTS</span>
              </h2>
              <div className="h-1.5 w-20 bg-primary rounded-full mb-6" />
            </div>
            <div className="flex items-center gap-2 text-primary">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} fill="currentColor" />)}
              <span className="ml-2 font-black text-slate-900 dark:text-white">4.9/5 sur Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Client Barbentane (13)", 
                text: "Entreprise à l’écoute du client ; toujours à la recherche du meilleur rapport qualité prix ; respect des engagements en terme de délai et de qualité de travail ; à recommander sans hésitation." 
              },
              { 
                name: "Client Châteurenard (13)", 
                text: "Sympa, prix corrects et très pro, je recommande vivement pour tous vos travaux." 
              },
              { 
                name: "Client Graveson (13)", 
                text: "Un artisan réactif, qui nous a fait un travail propre et soigné. Très satisfait de son intervention." 
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative"
              >
                <Quote className="absolute top-8 right-8 text-primary/10" size={40} />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed mb-8">
                  "{review.text}"
                </p>
                <p className="font-black text-slate-900 dark:text-white tracking-tight">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking Section (SEO Maillage) */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
           <div className="flex-1">
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Partenaire de Confiance</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase">
                BESOIN D'UN EXPERT EN <br />
                <span className="text-primary italic">ÉLECTRICITÉ GÉNÉRALE ?</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
                Pour toutes vos installations électriques, mises aux normes et réseaux, nous vous recommandons <span className="text-white font-bold">EGELEC 84</span>. 
                Basée à Entraigues, c'est l'entreprise de référence pour un travail soigné et réactif.
              </p>
              <a 
                href="https://egelec84.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest transition-all group"
              >
                Visiter EGELEC 84
                <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
              </a>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center justify-center p-8 group hover:border-primary/40 transition-all">
                 <Zap size={40} className="text-primary mb-4" />
                 <p className="font-black uppercase tracking-tight text-center">Électricité Générale</p>
              </div>
              <div className="aspect-square bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center justify-center p-8 mt-12 group hover:border-primary/40 transition-all">
                 <Network size={40} className="text-primary mb-4" />
                 <p className="font-black uppercase tracking-tight text-center">Câblage Réseau</p>
              </div>
           </div>
        </div>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-primary overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
            PRÊT À LANCER <br /> VOTRE PROJET ?
          </h2>
          <p className="text-white/80 text-xl font-medium mb-12 max-w-xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit ou une intervention d'urgence.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/contact" 
              className="px-10 py-5 rounded-2xl bg-white text-primary font-black text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Obtenir un devis gratuit
            </Link>
            <a 
              href="tel:0490833215" 
              className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
            >
              <Phone size={20} />
              04 90 88 24 77
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
