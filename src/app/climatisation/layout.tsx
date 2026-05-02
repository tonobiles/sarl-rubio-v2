import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation Climatisation Entraigues | Clim réversible Vaucluse SARL RUBIO",
  description: "Installation et entretien de climatisation réversible à Entraigues, Avignon et alentours. Optimisez votre confort thermique été comme hiver avec un expert certifié.",
  keywords: ["climatisation entraigues", "clim réversible vaucluse", "installateur clim avignon", "entretien climatisation 84"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
