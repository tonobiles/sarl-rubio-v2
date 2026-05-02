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

// Action pour récupérer les derniers appels d'offres (Simulation de flux RSS/API)
export async function getTenders() {
  // Dans une version réelle, on ferait un fetch sur une API de marchés publics
  // Ici on génère une liste plus longue avec des liens de recherche directs
  const categories = ["Plomberie", "CVC", "Chauffage", "VMC"];
  const sources = [
    { name: "Mairie d'Entraigues", link: "https://francemarches.com/recherche/84" },
    { name: "Conseil Départemental 84", link: "https://www.boamp.fr/recherche/resultat?motscles=plomberie" },
    { name: "Grand Avignon", link: "https://www.marches-publics.info/recherche-avancee.htm" },
    { name: "Bailleur Social Vaucluse", link: "https://www.marches-publics.gouv.fr/?page=entreprise.AccueilEntreprise" }
  ];

  return Array.from({ length: 8 }).map((_, i) => {
    const cat = categories[i % categories.length];
    const src = sources[i % sources.length];
    return {
      id: `tender-${i}`,
      title: `${cat} - Chantier ${["Rénovation", "Entretien", "Installation", "Urgence"][i % 4]} ${["EHPAD", "École", "Mairie", "Gymnase"][i % 4]}`,
      description: `Appel d'offre public pour des travaux de ${cat.toLowerCase()} dans le cadre de la modernisation des infrastructures du Vaucluse.`,
      source: src.name,
      link: `${src.link}`,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      category: cat
    };
  });
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
