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

// Action pour la veille chirurgicale BOAMP via API DILA (OpenDataSoft)
export async function getTenders() {
  const DEPTS = ["84", "13", "30", "34"];
  const MOTS_OBJET = [
    "climatisation", "chauffage", "plomberie",
    "CVC", "ventilation", "électricité", "thermique"
  ];
  const DESCRIPTEURS = [
    "Chauffage", "Climatisation", "Plomberie",
    "Electricité", "Ventilation", "CVC"
  ];

  // Filtre département sur code_departement_prestation
  const deptFilter = DEPTS
    .map(d => `code_departement_prestation = "${d}"`)
    .join(" OR ");

  // Filtre métier : objet OU descripteur_libelle
  const objetFilter = MOTS_OBJET
    .map(m => `objet like "${m}"`)
    .join(" OR ");

  const descFilter = DESCRIPTEURS
    .map(d => `descripteur_libelle like "${d}"`)
    .join(" OR ");

  // On récupère la date du jour au format ISO pour le filtre
  const today = new Date().toISOString().split('T')[0];

  // Uniquement les appels d'offres en cours (pas les attributions)
  // Parus après le 01/01/2024 pour éviter les archives
  const where = `(${deptFilter}) AND (${objetFilter} OR ${descFilter}) AND nature = "APPEL_OFFRE" AND (datelimitereponse >= "${today}" OR datelimitereponse is null) AND dateparution >= "2024-01-01"`;

  try {
    const response = await fetch(
      "https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records?" +
      new URLSearchParams({
        where:    where,
        order_by: "dateparution DESC",
        limit:    "24",
        select:   "idweb,objet,nomacheteur,dateparution,datelimitereponse,code_departement_prestation,descripteur_libelle,url_avis"
      }),
      { next: { revalidate: 0 } } // Force le rafraîchissement (pas de cache)
    );

    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((item: any) => ({
      id: item.idweb,
      title: item.objet,
      description: item.nomacheteur || "Consultez le détail sur le site officiel.",
      source: `BOAMP - ${item.descripteur_libelle || "Marché Public"}`,
      link: item.url_avis || `https://www.boamp.fr/pages/avis/?q=idweb:%22${item.idweb}%22`,
      publishedAt: item.dateparution,
      category: String(item.descripteur_libelle || "BÂTIMENT"),
      deadline: item.datelimitereponse,
      location: `${item.code_departement_prestation} - Vaucluse/Sud`
    }));

  } catch (error) {
    console.error("DILA API Error:", error);
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
