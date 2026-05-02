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
  const keywords = ["plomberie", "chauffage", "climatisation", "CVC"];
  const allTenders: any[] = [];

  try {
    // On boucle sur quelques mots clés pour avoir un flux riche
    for (const keyword of keywords) {
      const feed = await parser.parseURL(`https://www.boamp.fr/recherche/rss/avis?motscles=${keyword}`);
      
      feed.items.forEach(item => {
        allTenders.push({
          id: item.guid || Math.random().toString(),
          title: item.title,
          description: item.contentSnippet || item.content,
          source: "BOAMP.fr (Officiel)",
          link: item.link,
          publishedAt: item.pubDate,
          category: keyword.toUpperCase()
        });
      });
    }

    // On trie par date et on limite à 10 résultats uniques
    return allTenders
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 12);

  } catch (error) {
    console.error("Failed to fetch real tenders:", error);
    // Fallback sur des exemples si le flux est temporairement inaccessible
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
