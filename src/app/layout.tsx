import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SARL RUBIO | Plombier Chauffagiste à Entraigues-sur-la-Sorgue (84)",
  description: "Artisan expert en plomberie, chauffage et climatisation dans le Vaucluse. Dépannage urgent 24h/7j, installation de pompes à chaleur et entretien. Devis gratuit.",
  keywords: ["plombier entraigues", "chauffagiste vaucluse", "climatisation avignon", "dépannage plomberie 84", "pompe à chaleur entraigues", "sarl rubio"],
  authors: [{ name: "SARL RUBIO" }],
  openGraph: {
    title: "SARL RUBIO | Expertise Plomberie & Chauffage",
    description: "Votre confort thermique entre les mains d'un expert dans le Vaucluse.",
    url: "https://sarl-rubio.fr",
    siteName: "SARL RUBIO",
    images: [
      {
        url: "/images/realisations/Sans-titre1.jpg",
        width: 1200,
        height: 630,
        alt: "SARL RUBIO Réalisation",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sarl-rubio.fr",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 lg:ml-72 min-h-screen overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
