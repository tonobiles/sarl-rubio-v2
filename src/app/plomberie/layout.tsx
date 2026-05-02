import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plombier Entraigues-sur-la-Sorgue | Dépannage & Installation SARL RUBIO",
  description: "Services de plomberie professionnelle à Entraigues, Avignon et Carpentras. Recherche de fuite, installation de sanitaires, rénovation de salle de bain. Devis gratuit sous 24h.",
  keywords: ["plombier entraigues", "plomberie avignon", "recherche fuite vaucluse", "rénovation salle de bain 84"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
