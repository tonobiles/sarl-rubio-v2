import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chauffagiste Entraigues-sur-la-Sorgue | Pompe à Chaleur & Chauffage SARL RUBIO",
  description: "Expert en solutions de chauffage dans le Vaucluse. Installation et entretien de pompes à chaleur (PAC), chaudières et planchers chauffants. Artisan certifié RGE.",
  keywords: ["chauffagiste entraigues", "pompe à chaleur vaucluse", "installation chauffage 84", "artisan RGE vaucluse"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
