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

// Action pour la veille chirurgicale BOAMP (Codes CPV & Départements)
export async function getTenders() {
  const CPV_CODES = [
    "45331000", "45331100", "45332000", // Plomberie/CVC
    "39717200", "45331220",             // Clim
    "45310000"                          // Elec
  ];
  const DEPTS = ["84", "13", "30", "34"];
  
  try {
    // Construction de la requête API BOAMP
    // ✅ Version corrigée et chirurgicale
    const cpvQuery  = `cpv:(${CPV_CODES.join(" OR ")})`;
    const deptQuery = `lieu_execution.code:(${DEPTS.join(" OR ")})`;
    const query     = `${cpvQuery} AND ${deptQuery}`;
    
    const response = await fetch(
      "https://www.boamp.fr/api/search/1.0/recherche?" +
      new URLSearchParams({
        query: query,
        sort:  "dateparution:desc",
        size:  "24"
      })
    );

    const data = await response.json();
    console.log("BOAMP Data received (items):", data.nb_avis);

    if (!data.item) return [];

    return data.item.map((item: any) => ({
      id: item.idweb,
      title: item.objet,
      description: item.resume_avis || "Consultez le détail sur le site officiel.",
      source: `BOAMP - ${item.type_avis.libelle}`,
      link: `https://www.boamp.fr/pages/avis/?q=idweb:%22${item.idweb}%22`,
      publishedAt: item.dateparution,
      category: item.cpv[0]?.libelle || "CHANTIER",
      deadline: item.datelimitereponse,
      location: item.departement[0]?.libelle || "Vaucluse"
    }));

  } catch (error) {
    console.error("BOAMP API Error:", error);
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
