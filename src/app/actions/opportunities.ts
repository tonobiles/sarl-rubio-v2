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
  // Dans une version réelle, on ferait un fetch sur une API de marchés publics (ex: BOAMP ou France Marchés)
  // Ici on simule les résultats pour la démonstration du tableau de bord
  return [
    {
      id: "1",
      title: "Rénovation plomberie - École Primaire Entraigues",
      description: "Remplacement complet du réseau ECS et pose de sanitaires suspendus.",
      source: "Mairie d'Entraigues",
      link: "https://www.marches-publics.info/",
      publishedAt: new Date().toISOString(),
      category: "Plomberie"
    },
    {
      id: "2",
      title: "Installation Climatisation - Bureaux Zone du Pontet",
      description: "Installation d'un système VRV pour 600m2 de bureaux.",
      source: "Conseil Départemental 84",
      link: "https://www.boamp.fr/",
      publishedAt: new Date().toISOString(),
      category: "CVC"
    },
    {
      id: "3",
      title: "Entretien chaufferie gaz - Résidence Avignon",
      description: "Contrat de maintenance annuelle pour 48 logements.",
      source: "Grand Avignon Résidences",
      link: "https://www.marches-publics.gouv.fr/",
      publishedAt: new Date().toISOString(),
      category: "Chauffage"
    }
  ];
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
