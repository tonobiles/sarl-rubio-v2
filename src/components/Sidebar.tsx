"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Droplets, 
  Thermometer, 
  Wind, 
  Camera, 
  Users, 
  Phone, 
  Mail,
  Home,
  ChevronRight,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Plomberie", href: "/plomberie", icon: Droplets },
  { name: "Chauffage", href: "/chauffage", icon: Thermometer },
  { name: "Climatisation", href: "/climatisation", icon: Wind },
  { name: "Dépannage", href: "/depannage", icon: Wrench },
  { name: "Réalisations", href: "/realisations", icon: Camera },
  { name: "Nos Partenaires", href: "/equipe", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <header className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300",
        scrolled ? "glass shadow-md" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-white">
            <Image 
              src="/images/source/logo.jpg" 
              alt="Logo SARL RUBIO" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black text-primary tracking-tighter">
            SARL <span className="text-secondary dark:text-white">RUBIO</span>
          </span>
        </Link>
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-slate-900 z-[70] shadow-2xl p-8 flex flex-col"
          >
            <div className="mb-12">
               <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 bg-white mb-4">
                <Image 
                  src="/images/source/logo.jpg" 
                  alt="Logo SARL RUBIO" 
                  fill 
                  className="object-contain"
                />
              </div>
               <h2 className="text-2xl font-black text-primary tracking-tighter">
                SARL <span className="text-secondary dark:text-white">RUBIO</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-widest">Plomberie & Chauffage</p>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all",
                    pathname === item.href 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
              <a 
                href="tel:0490833215" 
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white font-bold text-center justify-center transition-transform active:scale-95"
              >
                <Phone size={18} className="text-primary" />
                04 90 88 24 77
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-8 flex-col z-50">
        <div className="mb-16">
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden border border-slate-100 bg-white mb-6 shadow-sm">
            <Image 
              src="/images/source/logo.jpg" 
              alt="Logo SARL RUBIO" 
              fill 
              className="object-contain p-2"
            />
          </div>
          <Link href="/" className="text-3xl font-black text-primary tracking-tighter block leading-none">
            SARL <br />
            <span className="text-secondary dark:text-white">RUBIO</span>
          </Link>
          <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-[0.2em] leading-tight">
            Artisan Plombier <br />Chauffagiste
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all",
                pathname === item.href 
                  ? "bg-primary/5 text-primary" 
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={cn(
                  "transition-colors",
                  pathname === item.href ? "text-primary" : "text-slate-300 group-hover:text-slate-500"
                )} />
                <span>{item.name}</span>
              </div>
              {pathname === item.href && (
                <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Besoin d'aide ?</p>
            <a 
              href="tel:0490833215" 
              className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-lg hover:text-primary transition-colors"
            >
              <Phone size={20} className="text-primary" />
              04 90 88 24 77
            </a>
          </div>
          
          <p className="text-[10px] text-slate-400 text-center font-medium">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors block mb-1 underline decoration-primary/20 underline-offset-4">
              Mentions Légales
            </Link>
            © {new Date().getFullYear()} SARL RUBIO <br />
            Tous droits réservés.
          </p>
        </div>
      </aside>
    </>
  );
}
