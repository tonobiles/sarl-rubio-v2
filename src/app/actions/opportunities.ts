"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Action pour sauvegarder un nouveau prospect (Lead)
export async function saveLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const subject = formData.get("subject") as string || "Demande de devis";

  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        subject,
      }
    });
    revalidatePath("/admin/dashboard/opportunities");
    return { success: true };
  } catch (error) {
    console.error("Failed to save lead:", error);
    return { success: false };
  }
}

import Parser from "rss-parser";

// Action pour récupérer les derniers appels d'offres réels via BOAMP
export async function getTenders() {
  const parser = new Parser();
  // On utilise des termes plus larges pour être sûr d'avoir des résultats
  const keywords = ["plomberie", "cvc", "chauffage", "sanitaire", "climatisation"];
  let allTenders: any[] = [];

  try {
    for (const keyword of keywords) {
      try {
        const feed = await parser.parseURL(`https://www.boamp.fr/recherche/rss/avis?motscles=${keyword}`);
        if (feed.items) {
          feed.items.forEach(item => {
            allTenders.push({
              id: item.guid || Math.random().toString(),
              title: item.title,
              description: item.contentSnippet || "Consultez le détail sur le site officiel.",
              source: "BOAMP Officiel",
              link: item.link,
              publishedAt: item.pubDate,
              category: keyword.toUpperCase()
            });
          });
        }
      } catch (e) {
        console.warn(`Could not fetch for keyword ${keyword}`);
      }
    }

    // Suppression des doublons par ID
    allTenders = Array.from(new Map(allTenders.map(t => [t.id, t])).values());

    if (allTenders.length === 0) {
      // Fallback si rien n'est trouvé aujourd'hui (pour ne pas avoir une page vide)
      return [
        {
          id: "fb-1",
          title: "Veille : Projets de Rénovation Vaucluse",
          description: "Pensez à surveiller les permis de construire en mairie d'Entraigues et d'Avignon.",
          source: "Conseil Stratégique",
          link: "https://www.vaucluse.fr/",
          publishedAt: new Date().toISOString(),
          category: "CONSEIL"
        },
        {
          id: "fb-2",
          title: "Marchés Publics : Grand Avignon",
          description: "Accédez à la plateforme de dématérialisation pour les petits marchés de maintenance.",
          source: "Plateforme Locale",
          link: "https://www.marches-publics.info/",
          publishedAt: new Date().toISOString(),
          category: "VEILLE"
        }
      ];
    }

    return allTenders
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 12);

  } catch (error) {
    console.error("Failed to fetch real tenders:", error);
    return [];
  }
}

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateLeadStatus(id: string, status: string) {
  await prisma.lead.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/dashboard/opportunities");
}
