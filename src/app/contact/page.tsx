"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import { saveLead } from "@/app/actions/opportunities";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
              Accueil <ChevronRight size={14} /> Contact
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
              PARLONS DE VOTRE <br />
              <span className="text-primary italic">PROJET</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium">
              Une urgence ou un projet de rénovation ? Notre équipe est à votre écoute 
              pour vous accompagner avec expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-4">
                <div className="glass p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Phone size={24} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Téléphone</p>
                  <a href="tel:0490833215" className="text-xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors">
                    04 90 88 24 77
                  </a>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <MapPin size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Adresse Siège</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">
                      125 Allée des Terres Blanches <br />
                      84320 Entraigues-sur-la-Sorgue
                    </p>
                  </div>
                  <div className="pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <Clock size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Horaires</p>
                    <p className="text-slate-900 dark:text-white font-bold">
                      Lun - Ven : 8h00 - 18h00 <br />
                      <span className="text-primary italic">Dépannage urgent 24/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Message Envoyé !</h3>
                  <p className="text-slate-500 font-medium mb-8">
                    Merci pour votre confiance. <br />
                    Toutes les demandes sont transmises à <br />
                    <span className="text-primary font-bold">contact@sarl-rubio.fr</span>
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form 
                  action={async (formData) => {
                    setIsLoading(true);
                    await saveLead(formData);
                    const result = await sendContactEmail(formData);
                    setIsLoading(false);
                    if (result.success) {
                      setIsSubmitted(true);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Nom complet</label>
                      <input 
                        name="name"
                        type="text" 
                        required
                        placeholder="Jean Dupont"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Téléphone</label>
                      <input 
                        name="phone"
                        type="tel" 
                        required
                        placeholder="06 00 00 00 00"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Service concerné</label>
                    <select name="service" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium appearance-none">
                      <option>Plomberie</option>
                      <option>Chauffage / PAC</option>
                      <option>Climatisation</option>
                      <option>Autre demande</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Votre message</label>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      placeholder="Décrivez votre projet ou votre problème..."
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={isLoading}
                    className="w-full py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
