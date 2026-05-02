import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dépannage Plomberie & Chauffage Urgent 24h/7j | Entraigues & Vaucluse",
  description: "Urgence plomberie ou panne de chauffage dans le Vaucluse ? Intervention rapide 24h/7j à Entraigues, Sorgues, Vedène et Avignon. Appelez le 04 90 88 24 77.",
  keywords: ["dépannage plomberie urgent", "urgence plombier 84", "panne chauffage entraigues", "recherche fuite urgente"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
