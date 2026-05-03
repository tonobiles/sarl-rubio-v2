"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Action pour sauvegarder un nouveau prospect (Lead)
export async function saveLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const subject = formData.get("subject") as string || "Demande de devis";

  try {
    // 1. Sauvegarde en Base de données
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        subject,
      }
    });

    // 2. Envoi de l'email de notification
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'SARL RUBIO <notifications@sarl-rubio.fr>',
        to: ['contact@sarl-rubio.fr'],
        subject: `🔔 Nouveau Lead : ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #FF9500;">Nouvelle demande de contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <hr />
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <br />
            <a href="https://sarl-rubio-v2.vercel.app/admin/dashboard/opportunities" style="background: #FF9500; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Voir dans le Dashboard</a>
          </div>
        `
      });
    }

    revalidatePath("/admin/dashboard/opportunities");
    return { success: true };
  } catch (error) {
    console.error("Failed to save lead:", error);
    return { success: false };
  }
}

import Parser from "rss-parser";

// Action pour la veille chirurgicale BOAMP (Version LIVE Officielle)
export async function getTenders() {
  const CPV_CODES = [
    "45331000", "45331100", "45332000", // Plomberie/CVC
    "39717200", "45331220",             // Clim
    "45310000"                          // Elec
  ];
  const DEPTS = ["84", "13", "30", "34"];
  
  try {
    // ✅ Utilisation des filtres chirurgicaux sur l'API LIVE
    const cpvQuery  = `cpv:(${CPV_CODES.join(" OR ")})`;
    const deptQuery = `lieu_execution.code:(${DEPTS.join(" OR ")})`;
    const query     = `${cpvQuery} AND ${deptQuery}`;
    
    const response = await fetch(
      "https://www.boamp.fr/api/search/1.0/recherche?" +
      new URLSearchParams({
        query: query,
        sort:  "dateparution:desc",
        size:  "24"
      }),
      { next: { revalidate: 3600 } } // Refresh toutes les heures
    );

    const data = await response.json();

    if (!data.item) return [];

    return data.item.map((item: any) => ({
      id: item.idweb,
      title: item.objet,
      description: item.resume_avis || "Consultez le détail sur le site officiel.",
      source: `BOAMP - ${item.type_avis.libelle}`,
      link: `https://www.boamp.fr/pages/avis/?q=idweb:%22${item.idweb}%22`,
      publishedAt: item.dateparution,
      category: item.cpv[0]?.libelle || "BÂTIMENT",
      deadline: item.datelimitereponse,
      location: item.departement[0]?.libelle || "Vaucluse/Sud"
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
