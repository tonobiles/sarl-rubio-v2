import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations Plomberie & Chauffage | Chantiers SARL RUBIO Vaucluse",
  description: "Découvrez en images nos derniers chantiers de climatisation, chauffage et plomberie réalisés chez nos clients dans le Vaucluse (84). Expertise et finitions de qualité.",
  keywords: ["réalisations plomberie", "photos chantiers clim", "travaux chauffage vaucluse", "artisan plombier entraigues"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
